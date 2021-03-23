describe('Testing Bookstore page',() => {
    beforeEach(() => {
        cy.visit('/bookstore')
    })

    it('should have topmenu', () => {
        cy.get('[data-testid="brand"]')
            .contains('Bookstore Backend')
            .should('have.class','navbar-brand')

        cy.get('[data-testid="home"]').contains('Home')
        cy.get('[data-testid="frontend"]').contains('Frontend')
        cy.get('[data-testid="map-object"]').contains('Map Object')
        cy.get('[data-testid="xmlhttp"]').contains('XMLHttp')
        cy.get('[data-testid="readfiles"]').contains('ReadFiles')
        cy.get('[data-testid="route-events"]').contains('Route Events')
        cy.get('[data-testid="promise"]').contains('Promise')
        cy.get('[data-testid="xmldemo"]').contains('xmldemo')
        cy.get('[data-testid="local-storage"]').contains('LocalStorage')
    })

    it('Should show bookstore samples',() => {
        cy.get('[data-testid="authors-sample"]').contains('Authors Sample')
        cy.get('[data-testid="books-sample"]').contains('Books Sample')
        cy.get('[data-testid="users-sample"]').contains('Users Sample')
    })
})