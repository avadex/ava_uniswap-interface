import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', false)
export const MULTICALL_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x143430fD8449952f0f0E030dc78e84962ED40107', false),
  [SupportedChainId.FUJI]: '0x7a94E80Aa49449272f11cbBd2F3883c2e13d0E0F',
  [SupportedChainId.AVA]: '0x143430fD8449952f0f0E030dc78e84962ED40107',
}
export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)
export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D')

/**
 * The older V0 governance account
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
)
/**
 * The latest governor alpha that is currently admin of timelock
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
}

export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(V3_FACTORY_ADDRESS, true),
  [SupportedChainId.FUJI]: '0xF0e8A2197Bf142f509f0c78B88E62C7036c0AB80',
  [SupportedChainId.AVA]: '0xE06B9a3C0A4314E00B33d9090a190ddC00a4DD01',
}
export const QUOTER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0xCa2E15056971a9F0B4f39c1662fd791E08E5Bd02', true),
  [SupportedChainId.FUJI]: '0x27cfa516190c8ba6CC39E3Cfa54F6E7A7A85Bccd',
  [SupportedChainId.AVA]: '0xCa2E15056971a9F0B4f39c1662fd791E08E5Bd02',
}
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x7848FDcf6A02D0De10cF54E82971df634380D2a5', true),
  [SupportedChainId.FUJI]: '0xc33615ba069b5AebdFf3814c3BD7A029fce3f3aD',
  [SupportedChainId.AVA]: '0x7848FDcf6A02D0De10cF54E82971df634380D2a5',
}
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
export const SWAP_ROUTER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x787Bd59120fb81f8BE4AD34280a621877516fe37', true),
  [SupportedChainId.FUJI]: '0xA4DCf4082A2270e95BB60Db0C5Ff4BBB63e29178',
  [SupportedChainId.AVA]: '0x787Bd59120fb81f8BE4AD34280a621877516fe37',
}
export const V3_MIGRATOR_ADDRESSES: AddressMap = constructSameAddressMap(
  '0xA5644E29708357803b5A882D272c41cC0dF92B34',
  true
)
