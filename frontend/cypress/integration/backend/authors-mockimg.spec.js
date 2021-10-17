describe('bookstore api authors', {"baseUrl": 'http://localhost:3300/bookstore'}, function () {

    beforeEach(function () {
    })

    it('response from author samples 12', () => {
/**
        cy.intercept('GET', '/authors', {
            statusCode: 200,
            body: {
                message: 'It worked'
            }
        }).as('sample')
*/
        cy.request('/authors/sample/12'). as('sample')

        cy.get('@sample')
            .its('headers')
            .its('content-type')
            .should('include', 'text/html; charset=utf-8')
    })
    it('response from authors', () => {
        cy.request('/authors'). as('sample')

        cy.get('@sample')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })
})