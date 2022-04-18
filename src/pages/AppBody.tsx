import React from 'react'
import styled from 'styled-components/macro'
import { Z_INDEX } from 'theme'

export const BodyWrapper = styled.main<{ margin?: string; maxWidth?: string }>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  max-width: ${({ maxWidth }) => maxWidth ?? '480px'};
  width: 100%;
  background: ${({ theme }) => theme.bg0};
  box-shadow: rgb(0 247 113 / 41%) 0px 0px 20px -8px, 0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  border: 10px solid ${({ theme }) => theme.bg0};
  background-color: #00000052;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  z-index: ${Z_INDEX.deprecated_content};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...rest }: { children: React.ReactNode }) {
  return <BodyWrapper {...rest}>{children}</BodyWrapper>
}
