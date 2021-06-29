// used to mark unsupported tokens, these are hosted lists of unsupported tokens

const TOP_15_TOKEN_List = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/top15.tokenlist.json'
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'
const AVA_DEFI_LIST = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json'
const STABLECOIN_AVA_LIST = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/stablecoin.tokenlist.json'
const AVA_BRIDGED_LIST = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json'
export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

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
