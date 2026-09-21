import {describe, expect, test, jest, beforeEach, afterAll} from '@jest/globals'

import {AuthorMap, BookMap, BookEntity, BookResponse, UserMap, statusCode} from "../models_interfaces";

jest.unstable_mockModule('../fetchMap', () => ({
    getAuthors: jest.fn<() => AuthorMap>(),
    getBooks: jest.fn<() => BookMap>(),
    getUsers: jest.fn<() => UserMap>(),
}))

const {getBooks} = await import('../fetchMap')
const {default: books} = await import('../books')

const bookSample = new Map<number, BookEntity>()

bookSample.set(5, {
    id: 5,
    author_id: 5,
    title: 'Beginners Guide To Access 97',
    published: '2009-12-01',
    bookprice: 32.99,
    isbn: '1874416826',
    onhand: 26,
    created_at: process.env.CREATED_AT || '2023-09-01 18:01:02',
    updated_at: ''
})

bookSample.set(7, {
    id: 7,
    author_id: 3,
    title: 'Instant IE4 Dynamic Html Programmers Reference',
    published: '1997-09-01',
    bookprice: 22.99,
    isbn: '1861000685',
    onhand: 58,
    created_at: process.env.CREATED_AT || '2023-09-01 18:01:02',
    updated_at: ''

})

describe('Mocking Books', function () {

    const errorMessage = 'Books is not iterable'
    const expected: BookResponse = {
        book: undefined,
        status: statusCode.NotFound,
        message: errorMessage
    }

    let booksSpy = jest.mocked(getBooks)

    beforeEach(() => {
        booksSpy.mockReset()
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('No Books are found', function () {

        booksSpy.mockReturnValue(new Map())
        const actual = books.findAll()
        expect(booksSpy).toHaveBeenCalled()
        expect(actual).toEqual([])
        expect.hasAssertions()
    })

    test('findAll Books throws an Error', function () {

        booksSpy.mockImplementation(() => {
            throw new Error()
        })

        const actual = books.findAll()
        expect(booksSpy).toHaveBeenCalled()
        expect(actual).toEqual([])
        expect.hasAssertions()
    })

    test('DeleteById Books throws an Error', function () {

        const id = 6
        booksSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const actual = books.deleteById(id)
        expect(booksSpy).toHaveBeenCalled()
        expect(actual).toEqual(expected)
        expect.hasAssertions()
    })

    test('UpdateById Books throws an Error', function () {

        booksSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const book = bookSample.get(5)
        if (book) {
            const actual: BookResponse = books.updateById(book)
            expect(booksSpy).toHaveBeenCalled()
            expect(actual).toEqual(expected)
        }
        expect.hasAssertions()

    })

    test('Save Books throws an Error', function () {

        booksSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const book: BookEntity = {
            id: 0,
            author_id: 3,
            title: 'Professional Web Techniques',
            published: '2020-02-01',
            bookprice: 35.99,
            isbn: '1861003218',
            onhand: 54,
            created_at: '',
            updated_at: ''
        }

        const actual: BookResponse = books.save(book)
        expect(booksSpy).toHaveBeenCalled()
        expect(actual).toEqual(expected)
    })


})
