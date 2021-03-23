context('Bookstore samples', {baseUrl: 'http://localhost:3300'}, () => {

    describe('Show bookstore authors', () => {
        beforeEach(() => {
            cy.visit('/bookstore/authors/sample/12')
        })

        it('Show 12 authors', () => {
            cy.get('[data-testid="authors"]')
                .children('tr')
                .then($rows => {
                    expect($rows).to.have.length(12)
                    const chris = $rows[11]
                    expect(chris.children[0].innerText).to.equal('12')
                    expect(chris.children[1].innerText).to.equal('Christian')
                    expect(chris.children[2].innerText).to.equal('Gross')
                    expect(chris.children[3].innerText).to.equal('Gross@mail.com')
                })
        })
    })

    describe('Show bookstore books', () => {
        beforeEach(() => {
            cy.visit('/bookstore/books/sample/12')
        })

        it('Show 12 books', () => {
            cy.get('[data-testid="books"]')
                .children('tr')
                .then($rows => {
                    expect($rows).to.have.length(12)
                    const book = $rows[11]
                    expect(book.children[0].innerText).to.equal('12')
                    expect(book.children[1].innerText).to.equal('Professional ASP Techniques For Webmasters')
                    expect(book.children[2].innerText).to.equal('49.99')
                    expect(book.children[3].innerText).to.equal('74')
                })
        })
    })

    describe('Show bookstore users', () => {
        beforeEach(() => {
            cy.visit('/bookstore/users/sample/12')
        })

        it('Show 12 users', () => {
            cy.get('[data-testid="users"]')
                .children('tr')
                .then($rows => {
                    expect($rows).to.have.length(12)
                    const user = $rows[11]
                    expect(user.children[0].innerText).to.equal('12')
                    expect(user.children[1].innerText).to.equal('Nicolas Fawcett')
                    expect(user.children[2].innerText).to.equal('Jones Town')
                    expect(user.children[3].innerText).to.equal('Illinois')
                    expect(user.children[4].innerText).to.equal('fawcett@anymail.com')
                })
        })
    })

    describe('show variable number of bookstore records', () => {

        it('Select 5 authors', () => {
            cy.visit('/bookstore/authors/sample/5')
            cy.get('[data-testid="authors"]')
                .children('tr')
                .should('have.length',5)
        })

        it('Select 7 books', () => {
            cy.visit('/bookstore/books/sample/7')
            cy.get('[data-testid="books"]')
                .children('tr')
                .should('have.length',7)
        })

        it('Select 11 users', () => {
            cy.visit('/bookstore/users/sample/11')
            cy.get('[data-testid="users"]')
                .children('tr')
                .should('have.length',11)
        })

    })
})