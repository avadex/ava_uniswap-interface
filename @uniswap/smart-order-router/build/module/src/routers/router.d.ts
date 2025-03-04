import { CondensedAddLiquidityOptions, Trade } from '@uniswap/router-sdk';
import { Currency, Fraction, Percent, Token, TradeType } from '@uniswap/sdk-core';
import { Route as V2RouteRaw } from '@uniswap/v2-sdk';
import { MethodParameters, Pool, Position, Route as V3RouteRaw } from '@uniswap/v3-sdk';
import { BigNumber } from 'ethers';
import { CurrencyAmount } from '../util/amounts';
import { RouteWithValidQuote } from './alpha-router';
export declare class V3Route extends V3RouteRaw<Token, Token> {
}
export declare class V2Route extends V2RouteRaw<Token, Token> {
}
export declare type SwapRoute = {
    /**
     * The quote for the swap.
     * For EXACT_IN swaps this will be an amount of token out.
     * For EXACT_OUT this will be an amount of token in.
     */
    quote: CurrencyAmount;
    /**
     * The quote adjusted for the estimated gas used by the swap.
     * This is computed by estimating the amount of gas used by the swap, converting
     * this estimate to be in terms of the quote token, and subtracting that from the quote.
     * i.e. quoteGasAdjusted = quote - estimatedGasUsedQuoteToken
     */
    quoteGasAdjusted: CurrencyAmount;
    /**
     * The estimate of the gas used by the swap.
     */
    estimatedGasUsed: BigNumber;
    /**
     * The estimate of the gas used by the swap in terms of the quote token.
     */
    estimatedGasUsedQuoteToken: CurrencyAmount;
    /**
     * The estimate of the gas used by the swap in USD.
     */
    estimatedGasUsedUSD: CurrencyAmount;
    /**
     * The gas price used when computing quoteGasAdjusted, estimatedGasUsedQuoteToken, etc.
     */
    gasPriceWei: BigNumber;
    /**
     * The Trade object representing the swap.
     */
    trade: Trade<Currency, Currency, TradeType>;
    /**
     * The routes of the swap.
     */
    route: RouteWithValidQuote[];
    /**
     * The block number used when computing the swap.
     */
    blockNumber: BigNumber;
    /**
     * The calldata to execute the swap. Only returned if swapConfig was provided when calling the router.
     */
    methodParameters?: MethodParameters;
};
export declare type SwapToRatioRoute = SwapRoute & {
    optimalRatio: Fraction;
    postSwapTargetPool: Pool;
};
export declare enum SwapToRatioStatus {
    SUCCESS = 1,
    NO_ROUTE_FOUND = 2,
    NO_SWAP_NEEDED = 3
}
export declare type SwapToRatioSuccess = {
    status: SwapToRatioStatus.SUCCESS;
    result: SwapToRatioRoute;
};
export declare type SwapToRatioFail = {
    status: SwapToRatioStatus.NO_ROUTE_FOUND;
    error: string;
};
export declare type SwapToRatioNoSwapNeeded = {
    status: SwapToRatioStatus.NO_SWAP_NEEDED;
};
export declare type SwapToRatioResponse = SwapToRatioSuccess | SwapToRatioFail | SwapToRatioNoSwapNeeded;
export declare type SwapOptions = {
    recipient: string;
    slippageTolerance: Percent;
    deadline: number;
    inputTokenPermit?: {
        v: 0 | 1 | 27 | 28;
        r: string;
        s: string;
    } & ({
        amount: string;
        deadline: string;
    } | {
        nonce: string;
        expiry: string;
    });
};
export declare type SwapAndAddConfig = {
    maxIterations: number;
    ratioErrorTolerance: Fraction;
};
export declare type SwapAndAddOptions = {
    swapOptions: SwapOptions;
    addLiquidityOptions: CondensedAddLiquidityOptions;
};
export declare type SwapAndAddParameters = {
    initialBalanceTokenIn: CurrencyAmount;
    initialBalanceTokenOut: CurrencyAmount;
    preLiquidityPosition: Position;
};
/**
 * Provides functionality for finding optimal swap routes on the Uniswap protocol.
 *
 * @export
 * @abstract
 * @class IRouter
 */
export declare abstract class IRouter<RoutingConfig> {
    /**
     * Finds the optimal way to swap tokens, and returns the route as well as a quote for the swap.
     * Considers split routes, multi-hop swaps, and gas costs.
     *
     * @abstract
     * @param amount The amount specified by the user. For EXACT_IN swaps, this is the input token amount. For EXACT_OUT swaps, this is the output token.
     * @param quoteCurrency The currency of the token we are returning a quote for. For EXACT_IN swaps, this is the output token. For EXACT_OUT, this is the input token.
     * @param tradeType The type of the trade, either exact in or exact out.
     * @param [swapOptions] Optional config for executing the swap. If provided, calldata for executing the swap will also be returned.
     * @param [partialRoutingConfig] Optional config for finding the optimal route.
     * @returns The swap route.
     */
    abstract route(amount: CurrencyAmount, quoteCurrency: Currency, swapType: TradeType, swapOptions?: SwapOptions, partialRoutingConfig?: Partial<RoutingConfig>): Promise<SwapRoute | null>;
}
export declare abstract class ISwapToRatio<RoutingConfig, SwapAndAddConfig> {
    abstract routeToRatio(token0Balance: CurrencyAmount, token1Balance: CurrencyAmount, position: Position, swapAndAddConfig: SwapAndAddConfig, swapAndAddOptions?: SwapAndAddOptions, routingConfig?: RoutingConfig): Promise<SwapToRatioResponse>;
}
