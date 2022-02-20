/// <reference types="./types/bunyan-debug-stream" />
import { Command, flags } from '@oclif/command';
import DEFAULT_TOKEN_LIST from '@uniswap/default-token-list';
import { default as bunyan } from 'bunyan';
import bunyanDebugStream from 'bunyan-debug-stream';
import { ethers } from 'ethers';
import NodeCache from 'node-cache';
import { AlphaRouter, CachingGasStationProvider, CachingTokenListProvider, CachingTokenProviderWithFallback, ChainId, CHAIN_IDS_LIST, EIP1559GasPriceProvider, ID_TO_CHAIN_ID, ID_TO_PROVIDER, LegacyRouter, MetricLogger, NodeJSCache, routeAmountsToString, setGlobalLogger, setGlobalMetric, TokenProvider, UniswapMulticallProvider, V3PoolProvider, V3QuoteProvider, } from '../src';
import { LegacyGasPriceProvider } from '../src/providers/legacy-gas-price-provider';
import { OnChainGasPriceProvider } from '../src/providers/on-chain-gas-price-provider';
export class BaseCommand extends Command {
    constructor() {
        super(...arguments);
        this._log = null;
        this._router = null;
        this._swapToRatioRouter = null;
        this._tokenProvider = null;
        this._poolProvider = null;
        this._blockNumber = null;
        this._multicall2Provider = null;
    }
    get logger() {
        return this._log
            ? this._log
            : bunyan.createLogger({
                name: 'Default Logger',
            });
    }
    get router() {
        if (this._router) {
            return this._router;
        }
        else {
            throw 'router not initialized';
        }
    }
    get swapToRatioRouter() {
        if (this._swapToRatioRouter) {
            return this._swapToRatioRouter;
        }
        else {
            throw 'swapToRatioRouter not initialized';
        }
    }
    get tokenProvider() {
        if (this._tokenProvider) {
            return this._tokenProvider;
        }
        else {
            throw 'tokenProvider not initialized';
        }
    }
    get poolProvider() {
        if (this._poolProvider) {
            return this._poolProvider;
        }
        else {
            throw 'poolProvider not initialized';
        }
    }
    get blockNumber() {
        if (this._blockNumber) {
            return this._blockNumber;
        }
        else {
            throw 'blockNumber not initialized';
        }
    }
    get multicall2Provider() {
        if (this._multicall2Provider) {
            return this._multicall2Provider;
        }
        else {
            throw 'multicall2 not initialized';
        }
    }
    async init() {
        const query = this.parse();
        const { chainId: chainIdNumb, router: routerStr, debug, debugJSON, tokenListURI, } = query.flags;
        // initialize logger
        const logLevel = debug || debugJSON ? bunyan.DEBUG : bunyan.INFO;
        this._log = bunyan.createLogger({
            name: 'Uniswap Smart Order Router',
            serializers: bunyan.stdSerializers,
            level: logLevel,
            streams: debugJSON
                ? undefined
                : [
                    {
                        level: logLevel,
                        type: 'stream',
                        stream: bunyanDebugStream({
                            basepath: __dirname,
                            forceColor: false,
                            showDate: false,
                            showPid: false,
                            showLoggerName: false,
                            showLevel: !!debug,
                        }),
                    },
                ],
        });
        if (debug || debugJSON) {
            setGlobalLogger(this.logger);
        }
        const metricLogger = new MetricLogger();
        setGlobalMetric(metricLogger);
        const chainId = ID_TO_CHAIN_ID(chainIdNumb);
        const chainProvider = ID_TO_PROVIDER(chainId);
        const provider = new ethers.providers.JsonRpcProvider(chainProvider, chainId);
        this._blockNumber = await provider.getBlockNumber();
        const tokenCache = new NodeJSCache(new NodeCache({ stdTTL: 3600, useClones: false }));
        let tokenListProvider;
        if (tokenListURI) {
            tokenListProvider = await CachingTokenListProvider.fromTokenListURI(chainId, tokenListURI, tokenCache);
        }
        else {
            tokenListProvider = await CachingTokenListProvider.fromTokenList(chainId, DEFAULT_TOKEN_LIST, tokenCache);
        }
        const multicall2Provider = new UniswapMulticallProvider(chainId, provider);
        this._multicall2Provider = multicall2Provider;
        this._poolProvider = new V3PoolProvider(chainId, multicall2Provider);
        // initialize tokenProvider
        const tokenProviderOnChain = new TokenProvider(chainId, multicall2Provider);
        this._tokenProvider = new CachingTokenProviderWithFallback(chainId, tokenCache, tokenListProvider, tokenProviderOnChain);
        if (routerStr == 'legacy') {
            this._router = new LegacyRouter({
                chainId,
                multicall2Provider,
                poolProvider: new V3PoolProvider(chainId, multicall2Provider),
                quoteProvider: new V3QuoteProvider(chainId, provider, multicall2Provider),
                tokenProvider: this.tokenProvider,
            });
        }
        else {
            const gasPriceCache = new NodeJSCache(new NodeCache({ stdTTL: 15, useClones: true }));
            // const useDefaultQuoteProvider =
            //   chainId != ChainId.ARBITRUM_ONE && chainId != ChainId.ARBITRUM_RINKEBY;
            const router = new AlphaRouter({
                provider,
                chainId,
                multicall2Provider: multicall2Provider,
                gasPriceProvider: new CachingGasStationProvider(chainId, new OnChainGasPriceProvider(chainId, new EIP1559GasPriceProvider(provider), new LegacyGasPriceProvider(provider)), gasPriceCache),
            });
            this._swapToRatioRouter = router;
            this._router = router;
        }
    }
    logSwapResults(routeAmounts, quote, quoteGasAdjusted, estimatedGasUsedQuoteToken, estimatedGasUsedUSD, methodParameters, blockNumber, estimatedGasUsed, gasPriceWei) {
        this.logger.info(`Best Route:`);
        this.logger.info(`${routeAmountsToString(routeAmounts)}`);
        this.logger.info(`\tRaw Quote Exact In:`);
        this.logger.info(`\t\t${quote.toFixed(Math.min(quote.currency.decimals, 2))}`);
        this.logger.info(`\tGas Adjusted Quote In:`);
        this.logger.info(`\t\t${quoteGasAdjusted.toFixed(Math.min(quoteGasAdjusted.currency.decimals, 2))}`);
        this.logger.info(``);
        this.logger.info(`Gas Used Quote Token: ${estimatedGasUsedQuoteToken.toFixed(Math.min(estimatedGasUsedQuoteToken.currency.decimals, 6))}`);
        this.logger.info(`Gas Used USD: ${estimatedGasUsedUSD.toFixed(Math.min(estimatedGasUsedUSD.currency.decimals, 6))}`);
        this.logger.info(`Calldata: ${methodParameters === null || methodParameters === void 0 ? void 0 : methodParameters.calldata}`);
        this.logger.info(`Value: ${methodParameters === null || methodParameters === void 0 ? void 0 : methodParameters.value}`);
        this.logger.info({
            blockNumber: blockNumber.toString(),
            estimatedGasUsed: estimatedGasUsed.toString(),
            gasPriceWei: gasPriceWei.toString(),
        });
    }
}
BaseCommand.flags = {
    topN: flags.integer({
        required: false,
        default: 3,
    }),
    topNTokenInOut: flags.integer({
        required: false,
        default: 2,
    }),
    topNSecondHop: flags.integer({
        required: false,
        default: 0,
    }),
    topNWithEachBaseToken: flags.integer({
        required: false,
        default: 2,
    }),
    topNWithBaseToken: flags.integer({
        required: false,
        default: 6,
    }),
    topNWithBaseTokenInSet: flags.boolean({
        required: false,
        default: false,
    }),
    topNDirectSwaps: flags.integer({
        required: false,
        default: 2,
    }),
    maxSwapsPerPath: flags.integer({
        required: false,
        default: 3,
    }),
    minSplits: flags.integer({
        required: false,
        default: 1,
    }),
    maxSplits: flags.integer({
        required: false,
        default: 3,
    }),
    distributionPercent: flags.integer({
        required: false,
        default: 5,
    }),
    chainId: flags.integer({
        char: 'c',
        required: false,
        default: ChainId.AVALANCHE,
        options: CHAIN_IDS_LIST,
    }),
    tokenListURI: flags.string({
        required: false,
    }),
    router: flags.string({
        char: 's',
        required: false,
        default: 'alpha',
    }),
    debug: flags.boolean(),
    debugJSON: flags.boolean(),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY2xpL2Jhc2UtY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxREFBcUQ7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLGtCQUFrQixNQUFNLDZCQUE2QixDQUFDO0FBRzdELE9BQU8sRUFBRSxPQUFPLElBQUksTUFBTSxFQUFxQixNQUFNLFFBQVEsQ0FBQztBQUM5RCxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBYSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDM0MsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFDTCxXQUFXLEVBQ1gseUJBQXlCLEVBQ3pCLHdCQUF3QixFQUN4QixnQ0FBZ0MsRUFDaEMsT0FBTyxFQUNQLGNBQWMsRUFDZCx1QkFBdUIsRUFFdkIsY0FBYyxFQUNkLGNBQWMsRUFLZCxZQUFZLEVBQ1osWUFBWSxFQUNaLFdBQVcsRUFDWCxvQkFBb0IsRUFFcEIsZUFBZSxFQUNmLGVBQWUsRUFDZixhQUFhLEVBQ2Isd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZCxlQUFlLEdBQ2hCLE1BQU0sUUFBUSxDQUFDO0FBQ2hCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRXZGLE1BQU0sT0FBZ0IsV0FBWSxTQUFRLE9BQU87SUFBakQ7O1FBZ0VVLFNBQUksR0FBa0IsSUFBSSxDQUFDO1FBQzNCLFlBQU8sR0FBd0IsSUFBSSxDQUFDO1FBQ3BDLHVCQUFrQixHQUFrQyxJQUFJLENBQUM7UUFDekQsbUJBQWMsR0FBMEIsSUFBSSxDQUFDO1FBQzdDLGtCQUFhLEdBQTJCLElBQUksQ0FBQztRQUM3QyxpQkFBWSxH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
