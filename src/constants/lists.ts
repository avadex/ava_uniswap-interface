// used to mark unsupported tokens, these are hosted lists of unsupported tokens

const AVA_DEFI = 'https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json'
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  AVA_DEFI,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [AVA_DEFI]
