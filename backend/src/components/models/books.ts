import {getBooks} from './fetchMap'
import {BookEntity, BookResponse,  statusCode} from "./models_interfaces"

export default {

    findById(book_id: number) :BookResponse {
        const data = getBooks()
        if (data.has(book_id)) {
            return {
                book: data.get(book_id),
                status: statusCode.OK,
                message: `Book ${book_id} er fundet`
            }
        }
        return {
            status: statusCode.NotFound,
            message: `Book med nummer ${book_id} findes ikke`
        }
    },

    findAll() : BookEntity[] {
        let data: BookEntity[] = []
        try {
            const actual = getBooks()
            if (actual.size > 0) {
                actual.forEach((item) => {
                    data.push(item)
                })
            }
            return data
        } catch (err) {
            return []
        }
    },

    deleteById(book_id: number): BookResponse {
        try {
            const data = getBooks()
            if (data.has(book_id)) {
                data.delete(book_id)
                return {
                    status: statusCode.OK,
                    message: `Slettet book ${book_id}`
                }
            }
            return {
                status: statusCode.NotFound,
                message: `Book med nummer ${book_id} findes ikke`,
            }

        } catch (err) {
            return {
                book: undefined,
                status: statusCode.NotFound,
                message: err.message
            }
        }
    },

    updateById(book: BookEntity): BookResponse {
        try {
            const data = getBooks()
            if (data.has(book.id)) {
                data.set(book.id, book)
                return {
                    book: data.get(book.id),
                    status: statusCode.OK,
                    message: `Book ${book.id} er opdateret`
                }
            }
            return {
                status: statusCode.NotFound,
                message: `Book med nummer ${book.id} findes ikke`,
                }
        } catch (err) {
            return {
                book: undefined,
                status: statusCode.NotFound,
                message: err.message
            }
        }
    },

    save(book: BookEntity): BookResponse {
        let data: Map<number, BookEntity>
        try {
            data = getBooks()
            const lastBook: BookEntity | undefined = data.get(data.size)
            if (lastBook) {
                book.id = lastBook.id + 1
                data.set(book.id, book)
                return {
                    book: data.get(book.id),
                    status: statusCode.OK,
                    message: `Book ${book.id} er oprettet`
                }
            }
        } catch (err) {
            return {
                book: undefined,
                status: statusCode.NotFound,
                message: err.message
            }
        }
        return {
            book: undefined,
            status: statusCode.NotFound,
            message: 'Unexpected end of save author'
        }
    }
}
