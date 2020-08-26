import books from '../books'
import {BookEntity, BookResponse, statusCode} from '../models_interfaces';

const bookSample = new Map<number, BookEntity>()

bookSample.set(5, {
    id: 5,
    author_id: 5,
    title: 'Beginners Guide To Access 97',
    published: '2009-12-01',
    bookprice: 32.99,
    isbn: '1874416826',
    onhand: 26
})

bookSample.set(7, {
    id: 7,
    author_id: 3,
    title: 'Instant IE4 Dynamic Html Programmers Reference',
    published: '1997-09-01',
    bookprice: 22.99,
    isbn: '1861000685',
    onhand: 58
})

describe('Books Model', function () {

    test('Find bookById', function () {
        const id = 5
        const expected: BookResponse = {
            book: bookSample.get(id),
            status: statusCode.OK,
            message: `Book ${id} er fundet`
        }
        const actual: BookResponse = books.findById(id)
        expect(actual).toEqual(expected)
    })

    test('Book is not found in database', function () {
        const id = 999

        const expected = {
            status: statusCode.NotFound,
            message: `Book med nummer ${id} findes ikke`,
        }
        const actual: BookResponse = books.findById(id)
        expect(actual).toEqual(expected)


    })

    test('Find all books', function () {
        const actual = books.findAll()
        expect(actual.length).toBe(49)
    })

    test('Delete book', function () {
        const id = 25
        const actual: BookResponse = books.deleteById(id)
        const expected: BookResponse = {
            status: statusCode.OK,
            message: `Slettet book ${id}`
        }
        expect(actual).toEqual(expected)
        const foundMessage: BookResponse = books.findById(id)
        const message: BookResponse = {
            status: statusCode.NotFound,
            message: `Book med nummer ${id} findes ikke`
        }
        expect(foundMessage).toEqual(message)
    })

    test('Fails to Delete unknown book', function () {
        const id = 999
        const expected: BookResponse = {
            book: undefined,
            status: statusCode.NotFound,
            message: `Book med nummer ${id} findes ikke`
        }
        const actual: BookResponse = books.deleteById(id)
        expect(actual).toEqual(expected)
    })

    test('Update an Book', function () {
        const id = 7
        const book: BookEntity | undefined = bookSample.get(id)
        if (book) {
            book.title = 'Ruby on Rails'
            const actual: BookResponse = books.updateById(book)
            const expected: BookResponse = {
                book: book,
                status: statusCode.OK,
                message: `Book ${id} er opdateret`
            }
            expect(actual).toEqual(expected)
            const updated = books.findById(id)
            expect(updated.book).toEqual(expected.book)
        }
        expect.hasAssertions()
    })

    test('Fails to update an unknown Book', function () {
        const id = 99
        const book: BookEntity =  {
            id: id,
            author_id: 3,
            title: 'Professional Web Techniques',
            published: '2020-02-01',
            bookprice: 35.99,
            isbn: '1861003218',
            onhand: 54
        }
        const expected: BookResponse = {
            status: statusCode.NotFound,
            message: `Book med nummer ${id} findes ikke`
            }

        const actual: BookResponse = books.updateById(book)
        expect(actual).toEqual(expected)
        expect.hasAssertions()
    })

    test('Save new Book', function () {
        const book: BookEntity =  {
            id: 0,
            author_id: 3,
            title: 'Professional Web Techniques',
            published: '2020-02-01',
            bookprice: 35.99,
            isbn: '1861003218',
            onhand: 54
        }
        const actual = books.save(book)
        const id = 49
        const expected = {
            book: book,
            status: statusCode.OK,
            message: `Book ${id} er oprettet`
        }
        expect(actual).toEqual(expected)
    })
})
