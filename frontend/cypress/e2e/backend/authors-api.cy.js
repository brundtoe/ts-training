const nakhimovsky = require('../../fixtures/nakhimovsky.json')

const andrew = {
    id: 7,
    firstname: "Andrew",
    lastname: "Enfield",
    mail: "enfield@example.com"
}

const maria = {
    firstname: "Maria",
    lastname: "Lang",
    mail: "marialang@mail.com"
}

describe('bookstore api authors', {"baseUrl": 'http://localhost:3300/bookstore'}, function () {

    beforeEach(function () {

    })

    it('get author', function () {
        cy.request('/authors/5')
            .then(response => {
                expect(response.status).to.equal(200)
                expect(response.body.data.author).to.eql(nakhimovsky.author)
            })
    })

    it('get response body', function () {
        cy.request('GET', '/authors/5')
            .its('body')
            .should('have.property', 'data')
            .and('eql', nakhimovsky)
    })

    it('Update  Andrew Enfield', function () {

        cy.request('/authors/7').its('body.data.author')
            .then(andrew_org => {

                cy.request({
                    method: 'PUT',
                    url: '/authors',
                    body: andrew,
                    headers: {"Content-Type": "application/json"}
                }).then(resp => {
                    expect(resp.status).to.equal(200)
                    expect(resp.body.data.author).to.eql(andrew)
                })

                cy.request({
                    method: 'PUT',
                    url: '/authors',
                    body: andrew_org,
                    headers: {"Content-Type": "application/json"}
                }).then(resp => {
                    expect(resp.status).to.equal(200)
                    expect(resp.body.data.author).to.eql(andrew_org)
                })
            })
    })

    it('Post a new author Maria Lang', function() {
        cy.request({
            method: 'POST',
            url: '/authors',
            body: maria,
            headers: {"Content-Type": "application/json"}
        }).then(resp => {
            expect(resp.status).to.equal(201)
            maria.id = resp.body.data.author.id
            debugger
            expect(resp.body.data.author).to.eql(maria)
        })
    })

    it.only('Delete an author', function () {
        cy.request({
            method: 'POST',
            url: '/authors',
            body: maria,
            headers: {"Content-Type": "application/json"}
        }).then(resp => {
            expect(resp.status).to.equal(201)
            const id = resp.body.data.author.id

            cy.request({
                method: 'DELETE',
                url: `/authors/${id}`,
                headers: {"Content-Type": "application/json"}
            }).then(resp => {
                expect(resp.status).to.equal(200)
            })

            cy.request(`/authors/${id}`)
                .then(resp => {
                    expect(resp.status).to.equal(200)
                    expect(resp.body.data.status).to.equal(400)
                    expect(resp.body.data.message).to.equal(`Author med nummer ${id} findes ikke`)
                })
        })
    })
})
