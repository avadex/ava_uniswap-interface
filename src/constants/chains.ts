import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
import optimismLogoUrl from 'assets/svg/optimism_logo.svg'
import avaLogoUrl from 'assets/svg/ava_logo.svg'

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  AVA = 43114,
  ARBITRUM_RINKEBY = 421611,
  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.AVA,

  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
]

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.AVA,
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

export const L2_CHAIN_IDS = [
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]

interface L1ChainInfo {
  readonly docs: string
  readonly explorer: string
  readonly infoLink: string
  readonly label: string
  readonly bridge: string
  readonly logoUrl: string
}
export interface L2ChainInfo extends L1ChainInfo {
  readonly bridge: string
  readonly logoUrl: string
}

type ChainInfo = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} &
  { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.AVA]: {
    bridge: 'https://bridge.avax.network/',
    docs: 'https://avax.network/',
    explorer: 'https://explorer.avax.network/',
    infoLink: 'https://info.wavax.org/#/',
    label: 'Avalanche',
    logoUrl: avaLogoUrl,
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    bridge: 'https://bridge.avax.network/',
    docs: 'https://avax.network/',
    explorer: 'https://explorer.avax.network/',
    infoLink: 'https://info.wavax.org/#/',
    label: 'notsupported',
    logoUrl: avaLogoUrl,
  },
  [SupportedChainId.MAINNET]: {
    bridge: 'https://bridge.avax.network/',
    docs: 'https://avax.network/',
    explorer: 'https://explorer.avax.network/',
    infoLink: 'https://info.wavax.org/#/',
    label: 'notsupported',
    logoUrl: avaLogoUrl,
  },
  [SupportedChainId.RINKEBY]: {
    bridge: 'https://bridge.avax.network/',
    docs: 'https://avax.network/',
    explorer: 'https://explorer.avax.network/',
    infoLink: 'https://info.wavax.org/#/',
    label: 'notsupported',
    logoUrl: avaLogoUrl,
  },
  [SupportedChainId.ROPSTEN]: {
    bridge: 'https://bridge.avax.network/',
    docs: 'https://avax.network/',
    explorer: 'https://explorer.avax.network/',
    infoLink: 'https://info.wavax.org/#/',
    label: 'notsupported',
    logoUrl: avaLogoUrl,
  },
  [SupportedChainId.KOVAN]: {
    bridge: 'https://bridge.avax.network/',
    docs: 'https://avax.network/',
    explorer: 'https://explorer.avax.network/',
    infoLink: 'https://info.wavax.org/#/',
    label: 'notsupported',
    logoUrl: avaLogoUrl,
  },
  [SupportedChainId.GOERLI]: {
    bridge: 'https://bridge.avax.network/',
    docs: 'https://avax.network/',
    explorer: 'https://explorer.avax.network/',
    infoLink: 'https://info.wavax.org/#/',
    label: 'notsupported',
    logoUrl: avaLogoUrl,
  },
  [SupportedChainId.OPTIMISM]: {
    bridge: 'https://gateway.optimism.io/',
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'notsupported',
    logoUrl: optimismLogoUrl,
  },
  [SupportedChainId.OPTIMISTIC_KOVAN]: {
    bridge: 'https://gateway.optimism.io/',
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism',
    label: 'notsupported',
    logoUrl: optimismLogoUrl,
  },
}
