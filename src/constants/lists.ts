const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'
export const STABLECOIN_AVA_LIST =
  'https://raw.githubusercontent.com/pangolindex/tokenlists/main/stablecoin.tokenlist.json'
export const AVA_JOE_LIST = 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/joe.tokenlist.json'
export const AVALANCHE_DEFI_LIST = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json'

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

// this is the default list of lists that are exposed to users
// lower index == higher priority for token import
const DEFAULT_LIST_OF_LISTS_TO_DISPLAY: string[] = [AVA_JOE_LIST, STABLECOIN_AVA_LIST]

export const DEFAULT_LIST_OF_LISTS: string[] = [
  ...DEFAULT_LIST_OF_LISTS_TO_DISPLAY,
  ...UNSUPPORTED_LIST_URLS, // need to load dynamic unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [STABLECOIN_AVA_LIST]
