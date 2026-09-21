import books from '../components/models/books'
import {BookResponse, statusCode} from '../components/models/models_interfaces'
import createError from 'http-errors'

function bookExists(book_id: number) {
    try {
        const result: BookResponse = books.findById(book_id)
        return result.status === statusCode.OK
    } catch (err: any) {
        throw createError(400, err)
    }
}

export {bookExists}
