import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'

import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0xeD822906FA020614840D6676401283098f6100E5', [
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.OPTIMISM,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
    SupportedChainId.AVALANCHE,
  ]),
  [SupportedChainId.ARBITRUM_RINKEBY]: '0xa501c031958F579dB7676fF1CE78AD305794d579',
}
export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)

export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106', [
  SupportedChainId.AVALANCHE,
])

export const V3_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.AVALANCHE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
])
export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap('0x6A4911Ce762ebDB560188Eef8F7b764fF965768a', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.AVALANCHE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
])

/**
 * The oldest V0 governance address
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
)
/**
 * The older V1 governance address
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
}
/**
 * The latest governor bravo that is currently admin of timelock
 */
export const GOVERNANCE_BRAVO_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
}

export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V3_FACTORY_ADDRESS, [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.AVALANCHE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.POLYGON,
])
export const QUOTER_ADDRESSES: AddressMap = constructSameAddressMap('0x5B85D1BAFDEE35754C5ee68842ACa06E2216d7AF', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.AVALANCHE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.POLYGON,
])
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x7848FDcf6A02D0De10cF54E82971df634380D2a5',
  [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.AVALANCHE,
    SupportedChainId.ARBITRUM_RINKEBY,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]
)
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}

export const V3_MIGRATOR_ADDRESSES: AddressMap = constructSameAddressMap('0x80E70C7A3ecfDba88f3e1Fe572cFa5c081213762', [
  SupportedChainId.AVALANCHE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.POLYGON,
])

export const TICK_LENS_ADDRESSES: AddressMap = {
  [SupportedChainId.AVALANCHE]: '0x813CB4bC45f9BD01f6f6ea8a361daD1860085425',
  [SupportedChainId.ARBITRUM_RINKEBY]: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573',
}
