import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { SupportedChainId } from 'constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBlockNumber, { useFastForwardBlockNumber } from 'lib/hooks/useBlockNumber'
import ms from 'ms.macro'
import { useCallback, useEffect } from 'react'
import { retry, RetryableError, RetryOptions } from 'utils/retry'

interface Transaction {
  addedTime: number
  receipt?: unknown
  lastCheckedBlockNumber?: number
}

export function shouldCheck(lastBlockNumber: number, tx: Transaction): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / ms`1m`
  if (minutesPending > 60) {
    // every 10 blocks if pending longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending longer than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}

const RETRY_OPTIONS_BY_CHAIN_ID: { [chainId: number]: RetryOptions } = {
  //[SupportedChainId.AVALANCHE]: { n: 10, minWait: 25, maxWait: 100 },
  [SupportedChainId.ARBITRUM_RINKEBY]: { n: 10, minWait: 250, maxWait: 1000 },
  [SupportedChainId.OPTIMISTIC_KOVAN]: { n: 10, minWait: 250, maxWait: 1000 },
  [SupportedChainId.OPTIMISM]: { n: 10, minWait: 250, maxWait: 1000 },
}
const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 1, minWait: 0, maxWait: 0 }

interface UpdaterProps {
  pendingTransactions: { [hash: string]: Transaction }
  onCheck: (tx: { chainId: number; hash: string; blockNumber: number }) => void
  onReceipt: (tx: { chainId: number; hash: string; receipt: TransactionReceipt }) => void
}

export default function Updater({ pendingTransactions, onCheck, onReceipt }: UpdaterProps): null {
  const { chainId, library } = useActiveWeb3React()

  const lastBlockNumber = useBlockNumber()
  const fastForwardBlockNumber = useFastForwardBlockNumber()

  const getReceipt = useCallback(
    (hash: string) => {
      if (!library || !chainId) throw new Error('No library or chainId')
      const retryOptions = RETRY_OPTIONS_BY_CHAIN_ID[chainId] ?? DEFAULT_RETRY_OPTIONS
      return retry(
        () =>
          library.getTransactionReceipt(hash).then((receipt) => {
            if (receipt === null) {
              console.debug(`Retrying tranasaction receipt for ${hash}`)
              throw new RetryableError()
            }
            return receipt
          }),
        retryOptions
      )
    },
    [chainId, library]
  )

  useEffect(() => {
    if (!chainId || !library || !lastBlockNumber) return

    const cancels = Object.keys(pendingTransactions)
      .filter((hash) => shouldCheck(lastBlockNumber, pendingTransactions[hash]))
      .map((hash) => {
        const { promise, cancel } = getReceipt(hash)
        promise
          .then((receipt) => {
            if (receipt) {
              onReceipt({ chainId, hash, receipt })
            } else {
              onCheck({ chainId, hash, blockNumber: lastBlockNumber })
            }
          })
          .catch((error) => {
            if (!error.isCancelledError) {
              console.warn(`Failed to get transaction receipt for ${hash}`, error)
            }
          })
        return cancel
      })

    return () => {
      cancels.forEach((cancel) => cancel())
    }
  }, [chainId, library, lastBlockNumber, getReceipt, fastForwardBlockNumber, onReceipt, onCheck, pendingTransactions])

  return null
}
