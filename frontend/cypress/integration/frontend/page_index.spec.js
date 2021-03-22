context('Testing frontend start page',() => {

    beforeEach(() => {
        cy.visit('/')
    })

    describe('Should show start page',() => {


        it('Should Display frontend start page', () => {
            cy.get('[data-testid="brand"]')
                .contains('Frontend')
                .should('have.class', 'navbar-brand')
        })

        it('Should have menu items', () => {
            cy.get('[data-testid="navbar"]').as('navbar')
                .find('[data-testid="home"]')
                .contains('Home')

            cy.get('@navbar')
                .find('[data-testid="bookstore"]')
                .contains('Backend')

            cy.get('@navbar')
                .find('[data-testid="templates"]')
                .contains('Templates')

            cy.get('@navbar')
                .find('[data-testid="users"]')
                .contains('Users')
        })

        it('Should navigate to Backend', () => {
            cy.get('[data-testid="bookstore"]')
                .click()

            cy.get('h1.display-4')
                .contains('Bookstore')
        })

        it('Should navigate to Users', () => {
            cy.get('[data-testid="users"]')
                .click()

            cy.get('h1.display-5')
                .contains('Backend users')
        })

        it('Should show dropdown Templates', () => {
            cy.get('[data-testid="templates"]')
                .click()

            cy.get('[data-testid="dropdown"]')
                .contains('Templates')
        })
    })
})