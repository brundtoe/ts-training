import express from 'express'
import {Request, Response, NextFunction} from 'express'

const router = express.Router()
import authors from '../components/bookstore/authorsController'

const validateAuthors = require('../components/validate/authors')
const validateBooks = require('../components/validate/books')
const validateUsers = require('../components/validate/users')

import users from '../components/bookstore/usersController'
import books from '../components/bookstore/booksController'
import config from '../config'
//const config = params()
router.get('/', (req: Request, res: Response) => {
    res.render('bookstore/index', {title: 'Bookstore', host: `${config.server}/bookstore`})
})

router.route('/authors/sample/:num')
    .get(authors.sample)

router.route('/authors')
    .get(authors.index)
    .put(validateAuthors.put, authors.update)
    .post(validateAuthors.post, authors.save)

router.route('/authors/:id')
    .get(validateAuthors.show, authors.show)
    .delete(validateAuthors.delete, authors.delete)

router.route('/books/sample/:num')
    .get(books.sample)


router.route('/books')
    .get(books.index)
    .put(validateBooks.put, books.update)
    .post(validateBooks.post, books.save)
router.route('/books/:id')
    .get(validateBooks.show, books.show)
    .delete(validateBooks.delete, books.delete)

router.route('/users/sample/:num')
    .get(users.sample)

router.route('/users')
    .get(users.index)
    .put(validateUsers.put, users.update)
    .post(validateUsers.post, users.save)
router.route('/users/:id')
    .get(validateUsers.show, users.show)
    .delete(validateUsers.delete, users.delete)


export default router
