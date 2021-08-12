import { IS_ON_APP_URL } from './misc'

const TOP_15_TOKEN_List = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/top15.tokenlist.json'
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'
const AVA_DEFI_LIST = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json'
const STABLECOIN_AVA_LIST = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/stablecoin.tokenlist.json'
const AVA_BRIDGED_LIST = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json'
export const OPTIMISM_LIST = 'https://static.optimism.io/optimism.tokenlist.json'
const ROLL_LIST = 'https://app.tryroll.com/tokens.json'
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json'
const WRAPPED_LIST = 'wrapped.tokensoft.eth'

// only load blocked list if on app url
export const UNSUPPORTED_LIST_URLS: string[] = IS_ON_APP_URL ? [BA_LIST] : []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  TOP_15_TOKEN_List,
  AVA_DEFI_LIST,
  STABLECOIN_AVA_LIST,
  AVA_BRIDGED_LIST,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as wel
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [AVA_BRIDGED_LIST]
