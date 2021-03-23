
const author = require('../../fixtures/nakhimovsky.json')

describe('bookstore api authors', {"baseUrl": 'http://localhost:3300/bookstore'}, () => {
    beforeEach(() => {

    })

    it('get author', () => {
        cy.request('/authors/5')
            .then($response => {
                expect($response.status).to.equal(200)
                expect($response.body.data.author).to.eql({
                    "id": 5,
                    "firstname": "Alexander",
                    "lastname": "Nakhimovsky",
                    "mail": "Nakhimovsky@mail.com"
                })
            })
    })

    it('get author again', () => {
        cy.request('/authors/5')
            .then($response => {
                expect($response.status).to.equal(200)
                expect($response.body.data).to.eql(author)
            })
    })

    it('get author again and again', () => {
        cy.intercept('/authors/5').as('getAuthor')
        //cy.wait('@getAuthor')

        cy.request('GET', '/authors/5')
            .its('body')
            .should('have.property', 'data')
            .and('eql', author)
    })

})
