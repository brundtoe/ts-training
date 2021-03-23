describe('testing page template', () => {
    beforeEach(() => {
        cy.visit('/template.html')
    })

    it('show page template', () => {
        cy.get('h1.display-5')
            .contains('Frontend templates')

        cy.get('[data-testid="brand"]')
            .contains('Frontend')
            .should('have.class', 'navbar-brand')
    })

    it('show customer using ejs template', () => {
        cy.get('#ejs-template').click()

        cy.get('[data-testid="customers"] > tr').as('customers')
            .then($rows => {
                expect($rows).to.have.length(12)
                cy.get('#customer-4')
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

    it('Show authors using handlebars', () => {
        cy.get('#hbs04-template').click()

        cy.get('[data-testid="authors"] > tr').as('authors')
            .then($rows => {
                expect($rows).to.have.length(8)
                const adrian = $rows[0].children
                expect(adrian[0].innerText).to.eql('1')
                expect(adrian[1].innerText).to.equal('Adrian Kingsley Hughes')
                expect(adrian[2].innerText).to.equal('KingsleyHughes@mail.com')
            })
        cy.get('@authors')
            .then($rows => {
                expect($rows).to.have.length(8)
                const brian = $rows[7].children
                expect(brian[0].innerText).to.eql('8')
                expect(brian[1].innerText).to.equal('Brian Francis')
                expect(brian[2].innerText).to.equal('Francis@mail.com')
            })
    })
    it('Show authors from backend', () => {
        cy.get('#hbs05-template').click()

        cy.get('[data-testid="authors"] > tr').as('backend-authors')
            .then($rows => {
                expect($rows).to.have.length(12)
                const adrian = $rows[0].children
                expect(adrian[0].innerText).to.eql('1')
                expect(adrian[1].innerText).to.equal('Adrian Kingsley Hughes')
                expect(adrian[2].innerText).to.equal('KingsleyHughes@mail.com')
            })
        cy.get('@backend-authors')
            .then($rows => {
                expect($rows).to.have.length(12)
                const brian = $rows[7].children
                expect(brian[0].innerText).to.eql('8')
                expect(brian[1].innerText).to.equal('Brian Francis')
                expect(brian[2].innerText).to.equal('Francis@mail.com')
            })
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
            .then((interception) => {
                expect(interception.response.statusCode).to.equal(200)
                expect(interception.response.body).to.eql({message: "It worked"})
            })
    })
})