import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'

import { UNI_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'

export const USDC_MAINNET = new Token(
  SupportedChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
)
export const USDC_AVALANCHE = new Token(
  SupportedChainId.AVALANCHE,
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  6,
  'USDC',
  'USD//C'
)
export const USDC_ROPSTEN = new Token(
  SupportedChainId.ROPSTEN,
  '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  6,
  'USDC',
  'USD//C'
)
export const USDC_RINKEBY = new Token(
  SupportedChainId.RINKEBY,
  '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
  6,
  'tUSDC',
  'test USD//C'
)
export const USDC_GOERLI = new Token(
  SupportedChainId.GOERLI,
  '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  6,
  'USDC',
  'USD//C'
)
export const USDC_KOVAN = new Token(
  SupportedChainId.KOVAN,
  '0x31eeb2d0f9b6fd8642914ab10f4dd473677d80df',
  6,
  'USDC',
  'USD//C'
)
export const USDC_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  6,
  'USDC',
  'USD//C'
)
export const USDC_OPTIMISTIC_KOVAN = new Token(
  SupportedChainId.OPTIMISTIC_KOVAN,
  '0x3b8e53b3ab8e01fb57d0c9e893bc4d655aa67d84',
  6,
  'USDC',
  'USD//C'
)
export const USDC_ARBITRUM_RINKEBY = new Token(
  SupportedChainId.ARBITRUM_RINKEBY,
  '0x09b98f8b2395d076514037ff7d39a091a536206c',
  6,
  'USDC',
  'USD//C'
)
export const USDC_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  6,
  'USDC',
  'USD//C'
)
export const USDC_POLYGON_MUMBAI = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  '0xe11a86849d99f524cac3e7a0ec1241828e332c62',
  6,
  'USDC',
  'USD//C'
)

export const AMPL = new Token(
  SupportedChainId.MAINNET,
  '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
  9,
  'AMPL',
  'Ampleforth'
)
export const DAI = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const DAI_E = new Token(
  SupportedChainId.AVALANCHE,
  '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
  18,
  'DAI_E',
  'Dai stable coin'
)
export const DAI_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai stable coin'
)
export const USDC: { [chainId in SupportedChainId]: Token } = {
  [SupportedChainId.MAINNET]: USDC_MAINNET,
  [SupportedChainId.AVALANCHE]: USDC_AVALANCHE,
  [SupportedChainId.OPTIMISM]: USDC_OPTIMISM,
  [SupportedChainId.ARBITRUM_RINKEBY]: USDC_ARBITRUM_RINKEBY,
  [SupportedChainId.OPTIMISTIC_KOVAN]: USDC_OPTIMISTIC_KOVAN,
  [SupportedChainId.POLYGON]: USDC_POLYGON,
  [SupportedChainId.POLYGON_MUMBAI]: USDC_POLYGON_MUMBAI,
  [SupportedChainId.GOERLI]: USDC_GOERLI,
  [SupportedChainId.RINKEBY]: USDC_RINKEBY,
  [SupportedChainId.KOVAN]: USDC_KOVAN,
  [SupportedChainId.ROPSTEN]: USDC_ROPSTEN,
}
export const USDT_E = new Token(
  SupportedChainId.AVALANCHE,
  '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
  6,
  'USDT_E',
  'USD//T'
)
export const USDC_E = new Token(
  SupportedChainId.AVALANCHE,
  '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
  6,
  'USDC_E',
  'USD//C'
)
export const USDT_AVALANCHE = new Token(
  SupportedChainId.AVALANCHE,
  '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
  6,
  'USDT',
  'USD//T'
)
export const UNI_E = new Token(
  SupportedChainId.AVALANCHE,
  '0x8eBAf22B6F053dFFeaf46f4Dd9eFA95D89ba8580',
  8,
  'UNI_E',
  'Uniswap'
)
export const WETH_E = new Token(
  SupportedChainId.AVALANCHE,
  '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  18,
  'WETH_E',
  'Wrapped ETH'
)
export const DAI_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const USDT_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  6,
  'USDT',
  'Tether USD'
)
export const WBTC_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const USDT = new Token(
  SupportedChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD'
)
export const USDT_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  6,
  'USDT',
  'Tether USD'
)
export const WBTC = new Token(
  SupportedChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const WBTC_E = new Token(
  SupportedChainId.AVALANCHE,
  '0x50b7545627a5162f82a992c33b87adc75187b218',
  8,
  'WBTC_E',
  'Wrapped BTC'
)
export const WBTC_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const FEI = new Token(
  SupportedChainId.MAINNET,
  '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
  18,
  'FEI',
  'Fei USD'
)
export const TRIBE = new Token(
  SupportedChainId.MAINNET,
  '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
  18,
  'TRIBE',
  'Tribe'
)
export const FRAX = new Token(
  SupportedChainId.MAINNET,
  '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  18,
  'FRAX',
  'Frax'
)
export const FXS = new Token(
  SupportedChainId.MAINNET,
  '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
  18,
  'FXS',
  'Frax Share'
)
export const renBTC = new Token(
  SupportedChainId.MAINNET,
  '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
  8,
  'renBTC',
  'renBTC'
)
export const ETH2X_FLI = new Token(
  SupportedChainId.MAINNET,
  '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
  18,
  'ETH2x-FLI',
  'ETH 2x Flexible Leverage Index'
)
export const sETH2 = new Token(
  SupportedChainId.MAINNET,
  '0xFe2e637202056d30016725477c5da089Ab0A043A',
  18,
  'sETH2',
  'StakeWise Staked ETH2'
)
export const rETH2 = new Token(
  SupportedChainId.MAINNET,
  '0x20BC832ca081b91433ff6c17f85701B6e92486c5',
  18,
  'rETH2',
  'StakeWise Reward ETH2'
)
export const SWISE = new Token(
  SupportedChainId.MAINNET,
  '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2',
  18,
  'SWISE',
  'StakeWise'
)
export const WETH_POLYGON_MUMBAI = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  '0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa',
  18,
  'WETH',
  'Wrapped Ether'
)

export const WETH_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  18,
  'WETH',
  'Wrapped Ether'
)
export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, UNI_ADDRESS[4], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.ROPSTEN]: new Token(SupportedChainId.ROPSTEN, UNI_ADDRESS[3], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.GOERLI]: new Token(SupportedChainId.GOERLI, UNI_ADDRESS[5], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.KOVAN]: new Token(SupportedChainId.KOVAN, UNI_ADDRESS[42], 18, 'UNI', 'Uniswap'),
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
  [SupportedChainId.AVALANCHE]: new Token(
    SupportedChainId.AVALANCHE,
    '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    18,
    'WAVAX',
    'Wrapped Avax'
  ),
  [SupportedChainId.OPTIMISM]: new Token(
    SupportedChainId.OPTIMISM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.OPTIMISTIC_KOVAN]: new Token(
    SupportedChainId.OPTIMISTIC_KOVAN,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.ARBITRUM_RINKEBY]: new Token(
    SupportedChainId.ARBITRUM_RINKEBY,
    '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.POLYGON]: new Token(
    SupportedChainId.POLYGON,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [SupportedChainId.POLYGON_MUMBAI]: new Token(
    SupportedChainId.POLYGON_MUMBAI,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
}

function isMatic(chainId: number): chainId is SupportedChainId.AVALANCHE | SupportedChainId.POLYGON_MUMBAI {
  return chainId === SupportedChainId.POLYGON_MUMBAI || chainId === SupportedChainId.AVALANCHE
}

class MaticNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isMatic(this.chainId)) throw new Error('Not matic')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isMatic(chainId)) throw new Error('Not matic')
    super(chainId, 18, 'AVAX', 'AVAX')
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {}
export function nativeOnChain(chainId: number): NativeCurrency {
  return (
    cachedNativeCurrency[chainId] ??
    (cachedNativeCurrency[chainId] = isMatic(chainId)
      ? new MaticNativeCurrency(chainId)
      : ExtendedEther.onChain(chainId))
  )
}

export const TOKEN_SHORTHANDS: { [shorthand: string]: { [chainId in SupportedChainId]?: string } } = {
  USDC: {
    [SupportedChainId.MAINNET]: USDC_MAINNET.address,
    [SupportedChainId.AVALANCHE]: USDC_AVALANCHE.address,
    [SupportedChainId.OPTIMISM]: USDC_OPTIMISM.address,
    [SupportedChainId.ARBITRUM_RINKEBY]: USDC_ARBITRUM_RINKEBY.address,
    [SupportedChainId.OPTIMISTIC_KOVAN]: USDC_OPTIMISTIC_KOVAN.address,
    [SupportedChainId.POLYGON]: USDC_POLYGON.address,
    [SupportedChainId.POLYGON_MUMBAI]: USDC_POLYGON_MUMBAI.address,
    [SupportedChainId.GOERLI]: USDC_GOERLI.address,
    [SupportedChainId.RINKEBY]: USDC_RINKEBY.address,
    [SupportedChainId.KOVAN]: USDC_KOVAN.address,
    [SupportedChainId.ROPSTEN]: USDC_ROPSTEN.address,
  },
}
