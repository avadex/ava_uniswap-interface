import { Trans } from '@lingui/macro'
import { L1_CHAIN_IDS, SupportedChainId, SupportedL1ChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useState } from 'react'
import { ArrowDownCircle, X } from 'react-feather'
import { useArbitrumAlphaAlert, useDarkModeManager } from 'state/user/hooks'
import { useETHBalances } from 'state/wallet/hooks'
import styled, { css } from 'styled-components/macro'
import { ExternalLink, MEDIA_WIDTHS } from 'theme'
import { CHAIN_INFO } from '../../constants/chains'
import { ReadMoreLink } from './styles'

const L2Icon = styled.img`
  width: 40px;
  height: 40px;
  justify-self: center;
`
const CloseIcon = styled(X)`
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
`
const ContentWrapper = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 4px;
  grid-template-columns: 40px 4fr;
  grid-template-rows: auto auto;
  margin: 20px 16px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 42px 4fr;
    grid-gap: 8px;
  }
`
export const ArbitrumWrapperBackgroundDarkMode = css`
  background: radial-gradient(948% 292% at 42% 0%, #113824 0%, rgb(132 111 127 / 20%) 100%),
    radial-gradient(98% 96% at 2% 0%, rgb (41 31 31 / 43%) 0%, rgba(235, 0, 255, 0.345) 96%);
`
export const ArbitrumWrapperBackgroundLightMode = css`
  background: radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.2) 0%, #27ae60 100%),
    radial-gradient(98% 96% at 2% 0%, #000000 0%, #435835 96%);
`
export const OptimismWrapperBackgroundDarkMode = css`
  background: radial-gradient(948% 292% at 42% 0%, rgb(97 48 86 / 20%) 0%, #266942 100%),
    radial-gradient(98% 96% at 2% 0%, #000000 0%, #435835 96%);
`
export const OptimismWrapperBackgroundLightMode = css`
  background: radial-gradient(92% 105% at 50% 7%, #87d457 0%, #cacaca 100%),
    radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.5);
`
const RootWrapper = styled.div<{ chainId: SupportedChainId; darkMode: boolean; logoUrl: string }>`
  ${({ chainId, darkMode }) =>
    [SupportedChainId.AVA, SupportedChainId.OPTIMISTIC_KOVAN].includes(chainId)
      ? darkMode
        ? OptimismWrapperBackgroundDarkMode
        : OptimismWrapperBackgroundLightMode
      : darkMode
      ? ArbitrumWrapperBackgroundDarkMode
      : ArbitrumWrapperBackgroundLightMode};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-height: 174px;
  overflow: hidden;
  position: relative;
  width: 100%;

  :before {
    background-image: url(${({ logoUrl }) => logoUrl});
    background-repeat: no-repeat;
    background-size: 300px;
    content: '';
    height: 300px;
    opacity: 0.1;
    position: absolute;
    transform: rotate(25deg) translate(-90px, -40px);
    width: 300px;
    z-index: -1;
  }
`
const Header = styled.h2`
  font-weight: 600;
  font-size: 20px;
  margin: 0;
  padding-right: 30px;
`
const Body = styled.p`
  font-size: 12px;
  grid-column: 1 / 3;
  line-height: 143%;
  margin: 0;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-column: 2 / 3;
  }
`
const LinkOutCircle = styled(ArrowDownCircle)`
  transform: rotate(230deg);
  width: 20px;
  height: 20px;
`
const LinkOutToBridge = styled(ExternalLink)`
  align-items: center;
  background-color: black;
  border-radius: 16px;
  color: white;
  display: flex;
  font-size: 16px;
  height: 44px;
  justify-content: space-between;
  margin: 0 20px 20px 20px;
  padding: 12px 16px;
  text-decoration: none;
  width: auto;
  :hover,
  :focus,
  :active {
    background-color: black;
  }
`
export function NetworkAlert() {
  const { account, chainId } = useActiveWeb3React()
  const [darkMode] = useDarkModeManager()
  const [arbitrumAlphaAcknowledged, setArbitrumAlphaAcknowledged] = useArbitrumAlphaAlert()
  const [locallyDismissed, setLocallyDimissed] = useState(false)
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const dismiss = useCallback(() => {
    if (userEthBalance?.greaterThan(0)) {
      setArbitrumAlphaAcknowledged(true)
    } else {
      setLocallyDimissed(true)
    }
  }, [setArbitrumAlphaAcknowledged, userEthBalance])
  if (!chainId || !L1_CHAIN_IDS.includes(chainId) || arbitrumAlphaAcknowledged || locallyDismissed) {
    return null
  }
  const info = CHAIN_INFO[chainId as SupportedL1ChainId]
  const depositUrl = [SupportedChainId.AVA, SupportedChainId.OPTIMISTIC_KOVAN].includes(chainId)
    ? `${info.bridge}?chainId=1`
    : info.bridge

  return (
    <RootWrapper chainId={chainId} darkMode={darkMode} logoUrl={info.logoUrl}>
      <CloseIcon onClick={dismiss} />
      <ContentWrapper>
        <L2Icon src={info.logoUrl} />
        <Header>
          <Trans>V3 on {info.label}</Trans>
        </Header>
        <Body>
          <Trans>
            This is an test release of the V3 code on the Avalanche live network. You can bridge Ethereum assets to this
            EVM called C-CHAIN.
          </Trans>{' '}
          <ReadMoreLink href="https://docs.avax.network/learn/avalanche-bridge-faq">
            <Trans>Read more</Trans>
          </ReadMoreLink>
        </Body>
      </ContentWrapper>
      <LinkOutToBridge href={depositUrl}>
        <Trans>Deposit to {info.label}</Trans>
        <LinkOutCircle />
      </LinkOutToBridge>
    </RootWrapper>
  )
}
