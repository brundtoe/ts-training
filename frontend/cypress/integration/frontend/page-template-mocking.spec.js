describe('Mocking page template', () => {
    beforeEach(() => {
        cy.visit('/template.html')
    })
    it('Mocking response from author samples 12', () => {

        cy.intercept('GET', '/bookstore/authors', {
            statusCode: 200,
            body: {
                message: 'It worked'
            }
        }).as('sample')

        cy.get('#hbs05-template').click()

        cy.wait('@sample')
            .then((xhr) => {
                expect(xhr.response.statusCode).to.equal(200)
                expect(xhr.response.body).to.eql({message: "It worked"})
            })
    })

    it('Mocking response using fixtures', function() {

        cy.fixture('authors').as('authors').then((authors) => {
            cy.intercept('GET', '/bookstore/authors', authors
            ).as('sample')
        })

        cy.get('#hbs05-template').click()

        cy.wait('@sample')
            .then((result) => {
                expect(result.response.statusCode).to.equal(200)
                const actual = result.response.body
                expect(actual).to.have.length(4)
                expect(actual).to.eql(this.authors)
            })
    })

    it('Mocking response using cy.its', function() {

        cy.fixture('authors').as('authors').then((authors) => {
            cy.intercept('GET', '/bookstore/authors', authors
            ).as('sample')
        })

        cy.get('#hbs05-template').click()

        cy.wait('@sample')
            .its('response')
            .then((response) => {
                debugger
                expect(response.statusCode).to.equal(200)
                const actual = response.body
                expect(actual).to.have.length(4)
                expect(actual).to.eql(this.authors)
            })
        //Er de fire authors også indsat på siden
        cy.get('[data-testid="authors"]')
            .children('tr')
            .should('have.length',4)
    })

})