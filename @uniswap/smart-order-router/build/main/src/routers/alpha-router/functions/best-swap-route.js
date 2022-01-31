"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestSwapRouteBy = exports.getBestSwapRoute = void 0;
const sdk_core_1 = require("@uniswap/sdk-core");
const ethers_1 = require("ethers");
const jsbi_1 = __importDefault(require("jsbi"));
const lodash_1 = __importDefault(require("lodash"));
const mnemonist_1 = require("mnemonist");
const amounts_1 = require("../../../util/amounts");
const log_1 = require("../../../util/log");
const metric_1 = require("../../../util/metric");
const routes_1 = require("../../../util/routes");
const gas_models_1 = require("../gas-models");
function getBestSwapRoute(amount, percents, routesWithValidQuotes, routeType, chainId, routingConfig) {
    const now = Date.now();
    // Build a map of percentage of the input to list of valid quotes.
    // Quotes can be null for a variety of reasons (not enough liquidity etc), so we drop them here too.
    const percentToQuotes = {};
    for (const routeWithValidQuote of routesWithValidQuotes) {
        if (!percentToQuotes[routeWithValidQuote.percent]) {
            percentToQuotes[routeWithValidQuote.percent] = [];
        }
        percentToQuotes[routeWithValidQuote.percent].push(routeWithValidQuote);
    }
    metric_1.metric.putMetric('BuildRouteWithValidQuoteObjects', Date.now() - now, metric_1.MetricLoggerUnit.Milliseconds);
    // Given all the valid quotes for each percentage find the optimal route.
    const swapRoute = getBestSwapRouteBy(routeType, percentToQuotes, percents, chainId, (rq) => rq.quoteAdjustedForGas, routingConfig);
    // It is possible we were unable to find any valid route given the quotes.
    if (!swapRoute) {
        return null;
    }
    // Due to potential loss of precision when taking percentages of the input it is possible that the sum of the amounts of each
    // route of our optimal quote may not add up exactly to exactIn or exactOut.
    //
    // We check this here, and if there is a mismatch
    // add the missing amount to a random route. The missing amount size should be neglible so the quote should still be highly accurate.
    const { routes: routeAmounts } = swapRoute;
    const totalAmount = lodash_1.default.reduce(routeAmounts, (total, routeAmount) => total.add(routeAmount.amount), amounts_1.CurrencyAmount.fromRawAmount(routeAmounts[0].amount.currency, 0));
    const missingAmount = amount.subtract(totalAmount);
    if (missingAmount.greaterThan(0)) {
        log_1.log.info({
            missingAmount: missingAmount.quotient.toString(),
        }, `Optimal route's amounts did not equal exactIn/exactOut total. Adding missing amount to last route in array.`);
        routeAmounts[routeAmounts.length - 1].amount =
            routeAmounts[routeAmounts.length - 1].amount.add(missingAmount);
    }
    log_1.log.info({
        routes: routes_1.routeAmountsToString(routeAmounts),
        numSplits: routeAmounts.length,
        amount: amount.toExact(),
        quote: swapRoute.quote.toExact(),
        quoteGasAdjusted: swapRoute.quoteGasAdjusted.toFixed(Math.min(swapRoute.quoteGasAdjusted.currency.decimals, 2)),
        estimatedGasUSD: swapRoute.estimatedGasUsedUSD.toFixed(Math.min(swapRoute.estimatedGasUsedUSD.currency.decimals, 2)),
        estimatedGasToken: swapRoute.estimatedGasUsedQuoteToken.toFixed(Math.min(swapRoute.estimatedGasUsedQuoteToken.currency.decimals, 2)),
    }, `Found best swap route. ${routeAmounts.length} split.`);
    return swapRoute;
}
exports.getBestSwapRoute = getBestSwapRoute;
function getBestSwapRouteBy(routeType, percentToQuotes, percents, chainId, by, routingConfig) {
    // Build a map of percentage to sorted list of quotes, with the biggest quote being first in the list.
    const percentToSortedQuotes = lodash_1.default.mapValues(percentToQuotes, (routeQuotes) => {
        return routeQuotes.sort((routeQuoteA, routeQuoteB) => {
            if (routeType == sdk_core_1.TradeType.EXACT_INPUT) {
                return by(routeQuoteA).greaterThan(by(routeQuoteB)) ? -1 : 1;
            }
            else {
                return by(routeQuoteA).lessThan(by(routeQuoteB)) ? -1 : 1;
            }
        });
    });
    log_1.log.info({
        percentToTop5SortedQuotes: lodash_1.default.mapValues(percentToSortedQuotes, (ps) => lodash_1.default.map(ps.slice(0, 5), (p) => ({
            protocol: p.protocol,
            route: routes_1.routeToString(p.route),
            percent: p.percent,
            quote: p.quoteAdjustedForGas.toFixed(Math.min(p.quoteToken.decimals, 2)),
        }))),
    }, 'Top 5 Quotes for each percentage');
    const quoteCompFn = routeType == sdk_core_1.TradeType.EXACT_INPUT
        ? (a, b) => a.greaterThan(b)
        : (a, b) => a.lessThan(b);
    const sumFn = (currencyAmounts) => {
        let sum = currencyAmounts[0];
        for (let i = 1; i < currencyAmounts.length; i++) {
            sum = sum.add(currencyAmounts[i]);
        }
        return sum;
    };
    let bestQuote;
    let bestSwap;
    // Min-heap for tracking the 5 best swaps given some number of splits.
    const bestSwapsPerSplit = new mnemonist_1.FixedReverseHeap(Array, (a, b) => {
        return quoteCompFn(a.quote, b.quote) ? -1 : 1;
    }, 5);
    const { minSplits, maxSplits, forceCrossProtocol } = routingConfig;
    if (!percentToSortedQuotes[100] || minSplits > 1 || forceCrossProtocol) {
        log_1.log.info({
            percentToSortedQuotes: lodash_1.default.mapValues(percentToSortedQuotes, (p) => p.length),
        }, 'Did not find a valid route without any splits. Continuing search anyway.');
    }
    else {
        bestQuote = by(percentToSortedQuotes[100][0]);
        bestSwap = [percentToSortedQuotes[100][0]];
        for (const routeWithQuote of percentToSortedQuotes[100].slice(0, 5)) {
            bestSwapsPerSplit.push({
                quote: by(routeWithQuote),
                routes: [routeWithQuote],
            });
        }
    }
    // We do a BFS. Each additional node in a path represents us adding an additional split to the route.
    const queue = new mnemonist_1.Queue();
    // First we seed BFS queue with the best quotes for each percentage.
    // i.e. [best quote when sending 10% of amount, best quote when sending 20% of amount, ...]
    // We will explore the various combinations from each node.
    for (let i = percents.length; i >= 0; i--) {
        const percent = percents[i];
        if (!percentToSortedQuotes[percent]) {
            continue;
        }
        queue.enqueue({
            curRoutes: [percentToSortedQuotes[percent][0]],
            percentIndex: i,
            remainingPercent: 100 - percent,
            special: false,
        });
        if (!percentToSortedQuotes[percent] ||
            !percentToSortedQuotes[percent][1]) {
            continue;
        }
        queue.enqueue({
            curRoutes: [percentToSortedQuotes[percent][1]],
            percentIndex: i,
            remainingPercent: 100 - percent,
            special: true,
        });
    }
    let splits = 1;
    let startedSplit = Date.now();
    while (queue.size > 0) {
        metric_1.metric.putMetric(`Split${splits}Done`, Date.now() - startedSplit, metric_1.MetricLoggerUnit.Milliseconds);
        startedSplit = Date.now();
        log_1.log.info({
            top5: lodash_1.default.map(Array.from(bestSwapsPerSplit.consume()), (q) => `${q.quote.toExact()} (${lodash_1.default(q.routes)
                .map((r) => r.toString())
                .join(', ')})`),
            onQueue: queue.size,
        }, `Top 5 with ${splits} splits`);
        bestSwapsPerSplit.clear();
        // Size of the queue at this point is the number of potential routes we are investigating for the given number of splits.
        let layer = queue.size;
        splits++;
        // If we didn't improve our quote by adding another split, very unlikely to improve it by splitting more after that.
        if (splits >= 3 && bestSwap && bestSwap.length < splits - 1) {
            break;
        }
        if (splits > maxSplits) {
            log_1.log.info('Max splits reached. Stopping search.');
            metric_1.metric.putMetric(`MaxSplitsHitReached`, 1, metric_1.MetricLoggerUnit.Count);
            break;
        }
        while (layer > 0) {
            layer--;
            const { remainingPercent, curRoutes, percentIndex, special } = queue.dequeue();
            // For all other percentages, add a new potential route.
            // E.g. if our current aggregated route if missing 50%, we will create new nodes and add to the queue for:
            // 50% + new 10% route, 50% + new 20% route, etc.
            for (let i = percentIndex; i >= 0; i--) {
                const percentA = percents[i];
                if (percentA > remainingPercent) {
                    continue;
                }
                // At some point the amount * percentage is so small that the quoter is unable to get
                // a quote. In this case there could be no quotes for that percentage.
                if (!percentToSortedQuotes[percentA]) {
                    continue;
                }
                const candidateRoutesA = percentToSortedQuotes[percentA];
                // Find the best route in the complimentary percentage that doesn't re-use a pool already
                // used in the current route. Re-using pools is not allowed as each swap through a pool changes its liquidity,
                // so it would make the quotes inaccurate.
                const routeWithQuoteA = findFirstRouteNotUsingUsedPools(curRoutes, candidateRoutesA, forceCrossProtocol);
                if (!routeWithQuoteA) {
                    continue;
                }
                const remainingPercentNew = remainingPercent - percentA;
                const curRoutesNew = [...curRoutes, routeWithQuoteA];
                // If we've found a route combination that uses all 100%, and it has at least minSplits, update our best route.
                if (remainingPercentNew == 0 && splits >= minSplits) {
                    const quotesNew = lodash_1.default.map(curRoutesNew, (r) => by(r));
                    const quoteNew = sumFn(quotesNew);
                    bestSwapsPerSplit.push({
                        quote: quoteNew,
                        routes: curRoutesNew,
                    });
                    if (!bestQuote || quoteCompFn(quoteNew, bestQuote)) {
                        bestQuote = quoteNew;
                        bestSwap = curRoutesNew;
                        // Temporary experiment.
                        if (special) {
                            metric_1.metric.putMetric(`BestSwapNotPickingBestForPercent`, 1, metric_1.MetricLoggerUnit.Count);
                        }
                    }
                }
                else {
                    queue.enqueue({
                        curRoutes: curRoutesNew,
                        remainingPercent: remainingPercentNew,
                        percentIndex: i,
                        special,
                    });
                }
            }
        }
    }
    if (!bestSwap) {
        log_1.log.info(`Could not find a valid swap`);
        return undefined;
    }
    const postSplitNow = Date.now();
    const quoteGasAdjusted = sumFn(lodash_1.default.map(bestSwap, (routeWithValidQuote) => routeWithValidQuote.quoteAdjustedForGas));
    const estimatedGasUsed = lodash_1.default(bestSwap)
        .map((routeWithValidQuote) => routeWithValidQuote.gasEstimate)
        .reduce((sum, routeWithValidQuote) => sum.add(routeWithValidQuote), ethers_1.BigNumber.from(0));
    // Each route can use a different stablecoin to account its gas costs.
    // They should all be pegged, and this is just an estimate, so we do a merge
    // to an arbitrary stable.
    if (!gas_models_1.usdGasTokensByChain[chainId] || !gas_models_1.usdGasTokensByChain[chainId][0]) {
        throw new Error(`Could not find a USD token for computing gas costs on ${chainId}`);
    }
    const usdToken = gas_models_1.usdGasTokensByChain[chainId][0];
    const usdTokenDecimals = usdToken.decimals;
    // For each gas estimate, normalize decimals to that of the chosen usd token.
    const estimatedGasUsedUSDs = lodash_1.default(bestSwap)
        .map((routeWithValidQuote) => {
        const decimalsDiff = usdTokenDecimals - routeWithValidQuote.gasCostInUSD.currency.decimals;
        if (decimalsDiff == 0) {
            return amounts_1.CurrencyAmount.fromRawAmount(usdToken, routeWithValidQuote.gasCostInUSD.quotient);
        }
        return amounts_1.CurrencyAmount.fromRawAmount(usdToken, jsbi_1.default.multiply(routeWithValidQuote.gasCostInUSD.quotient, jsbi_1.default.exponentiate(jsbi_1.default.BigInt(10), jsbi_1.default.BigInt(decimalsDiff))));
    })
        .value();
    const estimatedGasUsedUSD = sumFn(estimatedGasUsedUSDs);
    log_1.log.info({
        estimatedGasUsedUSD: estimatedGasUsedUSD.toExact(),
        normalizedUsdToken: usdToken,
        routeUSDGasEstimates: lodash_1.default.map(bestSwap, (b) => `${b.percent}% ${routes_1.routeToString(b.route)} ${b.gasCostInUSD.toExact()}`),
    }, 'USD gas estimates of best route');
    const estimatedGasUsedQuoteToken = sumFn(lodash_1.default.map(bestSwap, (routeWithValidQuote) => routeWithValidQuote.gasCostInToken));
    const quote = sumFn(lodash_1.default.map(bestSwap, (routeWithValidQuote) => routeWithValidQuote.quote));
    const routeWithQuotes = bestSwap.sort((routeAmountA, routeAmountB) => routeAmountB.amount.greaterThan(routeAmountA.amount) ? 1 : -1);
    metric_1.metric.putMetric('PostSplitDone', Date.now() - postSplitNow, metric_1.MetricLoggerUnit.Milliseconds);
    return {
        quote,
        quoteGasAdjusted,
        estimatedGasUsed,
        estimatedGasUsedUSD,
        estimatedGasUsedQuoteToken,
        routes: routeWithQuotes,
    };
}
exports.getBestSwapRouteBy = getBestSwapRouteBy;
// We do not allow pools to be re-used across split routes, as swapping through a pool changes the pools state.
// Given a list of used routes, this function finds the first route in the list of candidate routes that does not re-use an already used pool.
const findFirstRouteNotUsingUsedPools = (usedRoutes, candidateRouteQuotes, forceCrossProtocol) => {
    const poolAddressSet = new Set();
    const usedPoolAddresses = lodash_1.default(usedRoutes)
        .flatMap((r) => r.poolAddresses)
        .value();
    for (let poolAddress of usedPoolAddresses) {
        poolAddressSet.add(poolAddress);
    }
    const protocolsSet = new Set();
    const usedProtocols = lodash_1.default(usedRoutes)
        .flatMap((r) => r.protocol)
        .uniq()
        .value();
    for (let protocol of usedProtocols) {
        protocolsSet.add(protocol);
    }
    for (const routeQuote of candidateRouteQuotes) {
        const { poolAddresses, protocol } = routeQuote;
        if (poolAddresses.some((poolAddress) => poolAddressSet.has(poolAddress))) {
            continue;
        }
        // This code is just for debugging. Allows us to force a cross-protocol split route by skipping
        // consideration of routes that come from the same protocol as a used route.
        const needToForce = forceCrossProtocol && protocolsSet.size == 1;
        if (needToForce && protocolsSet.has(protocol)) {
            continue;
        }
        return routeQuote;
    }
    return null;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVzdC1zd2FwLXJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3JvdXRlcnMvYWxwaGEtcm91dGVyL2Z1bmN0aW9ucy9iZXN0LXN3YXAtcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQThDO0FBQzlDLG1DQUFtQztBQUNuQyxnREFBd0I7QUFDeEIsb0RBQXVCO0FBQ3ZCLHlDQUFvRDtBQUVwRCxtREFBdUQ7QUFDdkQsMkNBQXdDO0FBQ3hDLGlEQUFnRTtBQUNoRSxpREFBMkU7QUFFM0UsOENBQW9EO0FBR3BELFNBQWdCLGdCQUFnQixDQUM5QixNQUFzQixFQUN0QixRQUFrQixFQUNsQixxQkFBNEMsRUFDNUMsU0FBb0IsRUFDcEIsT0FBZ0IsRUFDaEIsYUFBZ0M7SUFTaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRXZCLGtFQUFrRTtJQUNsRSxvR0FBb0c7SUFDcEcsTUFBTSxlQUFlLEdBQWlELEVBQUUsQ0FBQztJQUN6RSxLQUFLLE1BQU0sbUJBQW1CLElBQUkscUJBQXFCLEVBQUU7UUFDdkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRCxlQUFlLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ25EO1FBQ0QsZUFBZSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ3pFO0lBRUQsZUFBTSxDQUFDLFNBQVMsQ0FDZCxpQ0FBaUMsRUFDakMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsRUFDaEIseUJBQWdCLENBQUMsWUFBWSxDQUM5QixDQUFDO0lBRUYseUVBQXlFO0lBQ3pFLE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUNsQyxTQUFTLEVBQ1QsZUFBZSxFQUNmLFFBQVEsRUFD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