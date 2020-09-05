import 'bootstrap'
import '../scss/index.scss'
import './page.scss'

import handlebars from 'handlebars'

import {bookstore} from "../assets/data/bookstore";
import {authorsView} from "../views/authors";
import loadView from "../util/loadView"

const authors = bookstore.authors.filter(author => author.id <= 12)
loadView(handlebars, authorsView, authors, 'data')

