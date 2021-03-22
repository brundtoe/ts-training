describe('Test page users', () => {
    beforeEach(() => {
        cy.visit('/users.html')
    })

    it('Should show users page', () => {
        cy.get('h1.display-5')
            .contains('Backend users')


        cy.get('[data-testid="brand"]')
            .contains('Frontend')
            .should('have.class','navbar-brand')
    })

    it('Should show users', () => {
        cy.get('[data-testid="customers"] > tr').as('customers')
            .its('length')
            .should('be.eq', 12)

        cy.get('@customers')
            .then(($rows) => {
                expect($rows).to.have.length(12)
                cy.get('#customer-3')
                    .invoke('text')
                    .should('contain', '4')
                    .and('contain', 'Irwin Shaw')
                    .and('contain', 'South Dakota')
                    .and('contain', 'shaw@anymail.com')
            })

        cy.get('@customers')
            .then(($rows) => {
                expect($rows).to.have.length(12)
                const nicolas = $rows[11].children
                expect(nicolas[0].innerText).to.eql('12')
                expect(nicolas[1].innerText).to.eql('Nicolas Fawcett')
                expect(nicolas[2].innerText).to.eql('Jones Town')
                expect(nicolas[3].innerText).to.eql('Illinois')
                expect(nicolas[4].innerText).to.eql('fawcett@anymail.com')

            })
    })


})