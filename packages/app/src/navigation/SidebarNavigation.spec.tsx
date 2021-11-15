import { useMainStore } from '../store'
import SidebarNavigation from './SidebarNavigation.vue'

describe('SidebarNavigation', () => {
  beforeEach(() => {
    cy.mount(() => {
      const mainStore = useMainStore()

      return (
        <div>
          <div class={[mainStore.navBarExpanded ? 'w-248px' : 'w-64px', 'transition-all', 'h-screen']}>
            <SidebarNavigation />
          </div>
          <div id="tooltip-target"/>
        </div>
      )
    })
  })

  it('expands the bar when clicking the expand button', () => {
    cy.findByText('test-project').should('not.be.visible')
    cy.get('[aria-expanded]').click().should('have.attr', 'aria-expanded', 'true')
    cy.findByText('test-project').should('be.visible')
  })

  it('shows tooltips on hover', () => {
    cy.get('[data-cy="sidebar-header"').trigger('mouseover')
    cy.contains('#tooltip-target > div', 'test-project').should('be.visible')
    cy.get('[data-cy="sidebar-header"]').trigger('mouseout')

    cy.get('[data-cy="switch-testing-type"]').trigger('mouseover')
    cy.contains('#tooltip-target > div', 'E2E Testing').should('be.visible')
    cy.get('[data-cy="switch-testing-type"]').trigger('mouseout')

    cy.get('[data-e2e-href="/runs"]').trigger('mouseover')
    cy.contains('#tooltip-target > div', 'Runs').should('be.visible')
    cy.get('[data-e2e-href="/runs"]').trigger('mouseout')
  })

  it('opens a modal to switch testing type', { viewportWidth: 1280 }, () => {
    cy.get('[data-cy="switch-testing-type"]').click()
  })
})