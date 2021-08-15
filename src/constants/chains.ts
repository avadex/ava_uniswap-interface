export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  AVA = 43114,
  ARBITRUM_RINKEBY = 421611,
}

export const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.RINKEBY]: 'Rinkeby',
  [SupportedChainId.ROPSTEN]: 'Ropsten',
  [SupportedChainId.GOERLI]: 'Görli',
  [SupportedChainId.KOVAN]: 'Kovan',
  [SupportedChainId.AVA]: 'Avalanche',
  [SupportedChainId.ARBITRUM_RINKEBY]: 'Arbitrum Testnet',
}
