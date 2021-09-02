import { CyHttpMessages } from 'cypress/types/net-stubbing'
import { aliasQuery, hasQuery } from '../utils/graphql-test-utils'

describe('Add Liquidity', () => {
  beforeEach(() => {
    cy.intercept('POST', '/subgraphs/name/uniswap/uniswap-v3', (req) => {
      aliasQuery(req, 'feeTierDistribution')
    })
  })

  it('loads the two correct tokens', () => {
    cy.visit('/add/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85/0xc778417E063141139Fce010982780140Aa0cD5Ab/500')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'MKR')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'AVAX')
  })

  it('does not crash if AVAX is duplicated', () => {
    cy.visit('/add/0xc778417E063141139Fce010982780140Aa0cD5Ab/0xc778417E063141139Fce010982780140Aa0cD5Ab')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'AVAX')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('not.contain.text', 'AVAX')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/add/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'SKL')
    cy.get('#add-liquidity-input-tokenb .token-symbol-container').should('contain.text', 'MKR')
  })

  it('single token can be selected', () => {
    cy.visit('/add/0xb290b2f9f8f108d03ff2af3ac5c8de6de31cdf6d')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'SKL')
    cy.visit('/add/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85')
    cy.get('#add-liquidity-input-tokena .token-symbol-container').should('contain.text', 'MKR')
  })

  it('loads fee tier distribution', () => {
    cy.fixture('feeTierDistribution.json').then((feeTierDistribution) => {
      cy.intercept('POST', '/subgraphs/name/uniswap/uniswap-v3', (req: CyHttpMessages.IncomingHttpRequest) => {
        if (hasQuery(req, 'feeTierDistribution')) {
          req.alias = 'feeTierDistributionQuery'

          req.reply({
            body: {
              data: {
                ...feeTierDistribution,
              },
            },
            headers: {
              'access-control-allow-origin': '*',
            },
          })
        }
      })

      cy.visit('/add/0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85/0xc778417E063141139Fce010982780140Aa0cD5Ab')

      cy.wait('@feeTierDistributionQuery')

      cy.get('#add-liquidity-selected-fee .selected-fee-label').should('contain.text', '0.3% fee tier')
      cy.get('#add-liquidity-selected-fee .selected-fee-percentage').should('contain.text', '70%')
    })
  })
})
