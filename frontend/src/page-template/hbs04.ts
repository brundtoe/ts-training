const handlebars = require('../../node_modules/handlebars/dist/handlebars.min.js')

import {bookstore} from "../assets/data/bookstore";
import {authorsView} from "../views/authors";
import loadView from "../util/loadView"

const hbsTemplate04 = <HTMLElement>document.getElementById('hbs04-template')
hbsTemplate04.addEventListener('click', (e) => {

    e.preventDefault()

    const authors = bookstore.authors.filter(author => author.id <= 8)
    loadView(handlebars, authorsView, authors, 'data')
})
