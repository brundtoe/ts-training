import {AuthorEntity, AuthorMap, BookEntity, BookMap, UserEntity, UserMap} from "./models_interfaces";
import bookstore from '../data/bookstore.json'

let authors: AuthorMap = new Map<number, AuthorEntity>()
let books: BookMap = new Map<number, BookEntity>()
let users: UserMap = new Map<number, UserEntity>()

function getAuthors() : AuthorMap {

    try {
        if (authors.size === 0) {
            const result = bookstore.authors
            result.forEach((item) => {
                authors.set(item.id, item)
            })
        }
    } catch (err) {
        console.log(err)
    }
    return authors
}

function getBooks() : BookMap {

    try {
        if (books.size === 0) {
            const result = bookstore.books
            result.forEach((item) => {
                books.set(item.id, item)
            })
        }
    } catch (err) {
        console.log(err)
    }
    return books
}

function getUsers(): UserMap {

    try {
        if (users.size === 0) {
            const result = bookstore.users
            result.forEach((item) => {
                users.set(item.id, item)
            })
        }
    } catch (err) {
        console.log(err)
    }
    return users
}

export {getAuthors, getBooks, getUsers}
