import { Trans } from '@lingui/macro'
import { FeeAmount } from '@uniswap/v3-sdk'
import { ALL_SUPPORTED_CHAIN_IDS, SupportedChainId } from 'constants/chains'
import { ReactNode } from 'react'

export const FEE_AMOUNT_DETAIL: Record<
  FeeAmount,
  { label: string; description: ReactNode; supportedChains: SupportedChainId[] }
> = {
  [FeeAmount.LOWEST]: {
    label: '0.01',
    description: <Trans>Chill LP</Trans>,
    supportedChains: [SupportedChainId.AVALANCHE],
  },
  [FeeAmount.LOW]: {
    label: '0.05',
    description: <Trans>Cool LP</Trans>,
    supportedChains: ALL_SUPPORTED_CHAIN_IDS,
  },
  [FeeAmount.MEDIUM]: {
    label: '0.3',
    description: <Trans>OG LP</Trans>,
    supportedChains: ALL_SUPPORTED_CHAIN_IDS,
  },
  [FeeAmount.HIGH]: {
    label: '1',
    description: <Trans>Degfi LP</Trans>,
    supportedChains: ALL_SUPPORTED_CHAIN_IDS,
  },
}
