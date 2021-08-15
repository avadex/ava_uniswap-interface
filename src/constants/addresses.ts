import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
export const MULTICALL2_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x143430fD8449952f0f0E030dc78e84962ED40107'),
  [SupportedChainId.AVA]: '0x143430fD8449952f0f0E030dc78e84962ED40107',
  [SupportedChainId.ARBITRUM_RINKEBY]: '0x334f67349c1cB3A8fF1268c3eC43FF1D3De246C6',
}
export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)
export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106')

// most current governance contract address should always be the 0 index
// only support governance on mainnet
export const GOVERNANCE_ADDRESSES: AddressMap[] = [
  {
    [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
  },
  {
    [SupportedChainId.MAINNET]: '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F',
  },
]
export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V3_FACTORY_ADDRESS, [
  SupportedChainId.AVA,
  SupportedChainId.ARBITRUM_RINKEBY,
])
export const QUOTER_ADDRESSES: AddressMap = constructSameAddressMap('0xCa2E15056971a9F0B4f39c1662fd791E08E5Bd02', [
  SupportedChainId.AVA,
  SupportedChainId.ARBITRUM_RINKEBY,
])
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x7848FDcf6A02D0De10cF54E82971df634380D2a5',
  [SupportedChainId.AVA, SupportedChainId.AVA]
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
export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap('0x787Bd59120fb81f8BE4AD34280a621877516fe37', [
  SupportedChainId.AVA,
  SupportedChainId.ARBITRUM_RINKEBY,
])
export const V3_MIGRATOR_ADDRESSES: AddressMap = constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34', [
  SupportedChainId.ARBITRUM_RINKEBY,
])
