import { Ether, NativeCurrency, Token } from '@uniswap/sdk-core';
export declare enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,
    OPTIMISM = 10,
    OPTIMISTIC_KOVAN = 69,
    ARBITRUM_RINKEBY = 421611,
    AVALANCHE = 43114,
    POLYGON_MUMBAI = 80001
}
export declare const ID_TO_CHAIN_ID: (id: number) => ChainId;
export declare enum ChainName {
    MAINNET = "mainnet",
    ROPSTEN = "ropsten",
    RINKEBY = "rinkeby",
    GÖRLI = "goerli",
    KOVAN = "kovan",
    OPTIMISM = "optimism-mainnet",
    OPTIMISTIC_KOVAN = "optimism-kovan",
    ARBITRUM_RINKEBY = "arbitrum-rinkeby",
    AVALANCHE = "avalanche",
    POLYGON_MUMBAI = "polygon-mumbai"
}
export declare enum NativeCurrencyName {
    ETHER = "ETH",
    AVAX = "AVAX"
}
export declare const NATIVE_CURRENCY: {
    [chainId: number]: NativeCurrencyName;
};
export declare const ID_TO_NETWORK_NAME: (id: number) => ChainName;
export declare const CHAIN_IDS_LIST: string[];
export declare const ID_TO_PROVIDER: (id: ChainId) => string;
export declare const WRAPPED_NATIVE_CURRENCY: {
    [chainId in ChainId]: Token;
};
export declare class ExtendedEther extends Ether {
    get wrapped(): Token;
    private static _cachedExtendedEther;
    static onChain(chainId: number): ExtendedEther;
}
export declare function nativeOnChain(chainId: number): NativeCurrency;
