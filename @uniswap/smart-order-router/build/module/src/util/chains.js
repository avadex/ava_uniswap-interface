import { Ether, NativeCurrency, Token } from '@uniswap/sdk-core';
export var ChainId;
(function (ChainId) {
    ChainId[ChainId["MAINNET"] = 1] = "MAINNET";
    ChainId[ChainId["ROPSTEN"] = 3] = "ROPSTEN";
    ChainId[ChainId["RINKEBY"] = 4] = "RINKEBY";
    ChainId[ChainId["G\u00D6RLI"] = 5] = "G\u00D6RLI";
    ChainId[ChainId["KOVAN"] = 42] = "KOVAN";
    ChainId[ChainId["OPTIMISM"] = 10] = "OPTIMISM";
    ChainId[ChainId["OPTIMISTIC_KOVAN"] = 69] = "OPTIMISTIC_KOVAN";
    ChainId[ChainId["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
    ChainId[ChainId["ARBITRUM_RINKEBY"] = 421611] = "ARBITRUM_RINKEBY";
    ChainId[ChainId["AVALANCHE"] = 43114] = "AVALANCHE";
    ChainId[ChainId["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
})(ChainId || (ChainId = {}));
export const ID_TO_CHAIN_ID = (id) => {
    switch (id) {
        case 1:
            return ChainId.MAINNET;
        case 3:
            return ChainId.ROPSTEN;
        case 4:
            return ChainId.RINKEBY;
        case 5:
            return ChainId.GÖRLI;
        case 42:
            return ChainId.KOVAN;
        case 10:
            return ChainId.OPTIMISM;
        case 69:
            return ChainId.OPTIMISTIC_KOVAN;
        case 42161:
            return ChainId.ARBITRUM_ONE;
        case 421611:
            return ChainId.ARBITRUM_RINKEBY;
        case 43114:
            return ChainId.AVALANCHE;
        case 80001:
            return ChainId.POLYGON_MUMBAI;
        default:
            throw new Error(`Unknown chain id: ${id}`);
    }
};
export var ChainName;
(function (ChainName) {
    // ChainNames match infura network strings
    ChainName["MAINNET"] = "mainnet";
    ChainName["ROPSTEN"] = "ropsten";
    ChainName["RINKEBY"] = "rinkeby";
    ChainName["G\u00D6RLI"] = "goerli";
    ChainName["KOVAN"] = "kovan";
    ChainName["OPTIMISM"] = "optimism-mainnet";
    ChainName["OPTIMISTIC_KOVAN"] = "optimism-kovan";
    ChainName["ARBITRUM_ONE"] = "arbitrum-mainnet";
    ChainName["ARBITRUM_RINKEBY"] = "arbitrum-rinkeby";
    ChainName["AVALANCHE"] = "AVALANCHE";
    ChainName["POLYGON_MUMBAI"] = "polygon-mumbai";
})(ChainName || (ChainName = {}));
export var NativeCurrencyName;
(function (NativeCurrencyName) {
    // Strings match input for CLI
    NativeCurrencyName["ETHER"] = "ETH";
    NativeCurrencyName["AVAX"] = "AVAX";
})(NativeCurrencyName || (NativeCurrencyName = {}));
export const NATIVE_CURRENCY = {
    [ChainId.MAINNET]: NativeCurrencyName.ETHER,
    [ChainId.ROPSTEN]: NativeCurrencyName.ETHER,
    [ChainId.RINKEBY]: NativeCurrencyName.ETHER,
    [ChainId.GÖRLI]: NativeCurrencyName.ETHER,
    [ChainId.KOVAN]: NativeCurrencyName.ETHER,
    [ChainId.OPTIMISM]: NativeCurrencyName.ETHER,
    [ChainId.OPTIMISTIC_KOVAN]: NativeCurrencyName.ETHER,
    [ChainId.ARBITRUM_ONE]: NativeCurrencyName.ETHER,
    [ChainId.ARBITRUM_RINKEBY]: NativeCurrencyName.ETHER,
    [ChainId.AVALANCHE]: NativeCurrencyName.AVAX,
    [ChainId.POLYGON_MUMBAI]: NativeCurrencyName.MATIC,
};
export const ID_TO_NETWORK_NAME = (id) => {
    switch (id) {
        case 1:
            return ChainName.MAINNET;
        case 3:
            return ChainName.ROPSTEN;
        case 4:
            return ChainName.RINKEBY;
        case 5:
            return ChainName.GÖRLI;
        case 42:
            return ChainName.KOVAN;
        case 10:
            return ChainName.OPTIMISM;
        case 69:
            return ChainName.OPTIMISTIC_KOVAN;
        case 42161:
            return ChainName.ARBITRUM_ONE;
        case 421611:
            return ChainName.ARBITRUM_RINKEBY;
        case 43114:
            return ChainName.AVALANCHE;
        case 80001:
            return ChainName.POLYGON_MUMBAI;
        default:
            throw new Error(`Unknown chain id: ${id}`);
    }
};
export const CHAIN_IDS_LIST = Object.values(ChainId).map((c) => c.toString());
export const ID_TO_PROVIDER = (id) => {
    switch (id) {
        case ChainId.MAINNET:
            return process.env.JSON_RPC_PROVIDER;
        case ChainId.ROPSTEN:
            return process.env.JSON_RPC_PROVIDER_ROPSTEN;
        case ChainId.RINKEBY:
            return process.env.JSON_RPC_PROVIDER_RINKEBY;
        case ChainId.GÖRLI:
            return process.env.JSON_RPC_PROVIDER_GÖRLI;
        case ChainId.KOVAN:
            return process.env.JSON_RPC_PROVIDER_KOVAN;
        case ChainId.OPTIMISM:
            return process.env.JSON_RPC_PROVIDER_OPTIMISM;
        case ChainId.OPTIMISTIC_KOVAN:
            return process.env.JSON_RPC_PROVIDER_OPTIMISTIC_KOVAN;
        case ChainId.ARBITRUM_ONE:
            return process.env.JSON_RPC_PROVIDER_ARBITRUM_ONE;
        case ChainId.ARBITRUM_RINKEBY:
            return process.env.JSON_RPC_PROVIDER_ARBITRUM_RINKEBY;
        case ChainId.AVALANCHE:
            return process.env.JSON_RPC_PROVIDER_AVALANCHE;
        case ChainId.POLYGON_MUMBAI:
            return process.env.JSON_RPC_PROVIDER_POLYGON_MUMBAI;
        default:
            throw new Error(`Chain id: ${id} not supported`);
    }
};
export const WRAPPED_NATIVE_CURRENCY = {
    [ChainId.MAINNET]: new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.ROPSTEN]: new Token(3, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.RINKEBY]: new Token(4, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.GÖRLI]: new Token(5, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.KOVAN]: new Token(42, '0xd0A1E359811322d97991E03f863a0C30C2cF029C', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.OPTIMISM]: new Token(ChainId.OPTIMISM, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.OPTIMISTIC_KOVAN]: new Token(ChainId.OPTIMISTIC_KOVAN, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.ARBITRUM_ONE]: new Token(ChainId.ARBITRUM_ONE, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.ARBITRUM_RINKEBY]: new Token(ChainId.ARBITRUM_RINKEBY, '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, 'WAVAX', 'Wrapped AVAX'),
    [ChainId.POLYGON_MUMBAI]: new Token(ChainId.POLYGON_MUMBAI, '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', 18, 'WMATIC', 'Wrapped MATIC'),
};
function isMatic(chainId) {
    return chainId === ChainId.POLYGON_MUMBAI || chainId === ChainId.AVALANCHE;
}
class MaticNativeCurrency extends NativeCurrency {
    equals(other) {
        return other.isNative && other.chainId === this.chainId;
    }
    get wrapped() {
        if (!isMatic(this.chainId))
            throw new Error('Not matic');
        const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
        if (nativeCurrency) {
            return nativeCurrency;
        }
        throw new Error(`Does not support this chain ${this.chainId}`);
    }
    constructor(chainId) {
        if (!isMatic(chainId))
            throw new Error('Not matic');
        super(chainId, 18, 'AVAX', 'AVAX');
    }
}
export class ExtendedEther extends Ether {
    get wrapped() {
        if (this.chainId in WRAPPED_NATIVE_CURRENCY)
            return WRAPPED_NATIVE_CURRENCY[this.chainId];
        throw new Error('Unsupported chain ID');
    }
    static onChain(chainId) {
        var _a;
        return ((_a = this._cachedExtendedEther[chainId]) !== null && _a !== void 0 ? _a : (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId)));
    }
}
ExtendedEther._cachedExtendedEther = {};
const cachedNativeCurrency = {};
export function nativeOnChain(chainId) {
    var _a;
    return ((_a = cachedNativeCurrency[chainId]) !== null && _a !== void 0 ? _a : (cachedNativeCurrency[chainId] = isMatic(chainId)
        ? new MaticNativeCurrency(chainId)
        : ExtendedEther.onChain(chainId)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWwvY2hhaW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBWSxLQUFLLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNFLE1BQU0sQ0FBTixJQUFZLE9BWVg7QUFaRCxXQUFZLE9BQU87SUFDakIsMkNBQVcsQ0FBQTtJQUNYLDJDQUFXLENBQUE7SUFDWCwyQ0FBVyxDQUFBO0lBQ1gsaURBQVMsQ0FBQTtJQUNULHdDQUFVLENBQUE7SUFDViw4Q0FBYSxDQUFBO0lBQ2IsOERBQXFCLENBQUE7SUFDckIseURBQW9CLENBQUE7SUFDcEIsa0VBQXlCLENBQUE7SUFDekIsNkNBQWEsQ0FBQTtJQUNiLDZEQUFzQixDQUFBO0FBQ3hCLENBQUMsRUFaVyxPQUFPLEtBQVAsT0FBTyxRQVlsQjtBQUVELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFDLEVBQVUsRUFBVyxFQUFFO0lBQ3BELFFBQVEsRUFBRSxFQUFFO1FBQ1YsS0FBSyxDQUFDO1lBQ0osT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3pCLEtBQUssQ0FBQztZQUNKLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUN6QixLQUFLLENBQUM7WUFDSixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDekIsS0FBSyxDQUFDO1lBQ0osT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLEtBQUssRUFBRTtZQUNMLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQztRQUN2QixLQUFLLEVBQUU7WUFDTCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDMUIsS0FBSyxFQUFFO1lBQ0wsT0FBTyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDbEMsS0FBSyxLQUFLO1lBQ1IsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzlCLEtBQUssTUFBTTtZQUNU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
