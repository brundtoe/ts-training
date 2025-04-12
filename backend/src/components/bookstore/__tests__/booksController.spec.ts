import {Request} from 'express'
import booksController from '../booksController'
import {BookEntity, BookResponse, statusCode} from "../../models/models_interfaces";

interface BookControllerResponse {
    data: BookResponse
}

describe('Books Controller', function () {

    const mockRequest = (params: any, body?: any) => ({
        params,
        body
    }) as Request

    const next = jest.fn()

    const mockResponse = () => {
        const res: any = {}
        res.status = jest.fn().mockReturnValue(res)
        res.render = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        res.format = jest.fn().mockReturnValue(res)
        return res
    }

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

    test('Index Should return all books', function () {

        const res = mockResponse()
        const req = mockRequest({})
        booksController.index(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.json.mock.calls[0][0].length).toBe(49)
    })

    test('Sample shold return a number of books', function () {
        const num = 12
        const req = mockRequest({num: num.toString()})
        const res = mockResponse()
        booksController.sample(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.format).toHaveBeenCalled()
        expect(res.format).toHaveBeenCalledWith({
            'text/html': expect.any(Function),
            'application/json': expect.any(Function),
            'default': expect.any(Function)
        })
    })

    test('Sample should throw error on not number', function () {
        const num = 'sample'
        const req = mockRequest({num: num.toString()})
        const res = mockResponse()

        booksController.sample(req, res, next)
        expect(next).toHaveBeenCalled()
        const message = `Request param ${num} is not a number`
        expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({message: message}))

    })

    test('should show book number 7', function () {
        const id = 7
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: BookControllerResponse = {
            data: {
                book: bookSample.get(id),
                status: statusCode.OK,
                message: `Book ${id} er fundet`
            }
        }

        booksController.show(req, res, next)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)

    })
    test('Should fail to show book 999', function () {
        const id = 999
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: BookControllerResponse = {
            data: {
                status: statusCode.NotFound,
                message: `Book med nummer ${id} findes ikke`
            }
        }

        booksController.show(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('show should throw error on param not a number', function () {
        const id = 'Alfred'
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        booksController.show(req, res, next)
        expect(next).toHaveBeenCalled()
        const message = `Request param ${id} is not a number`
        expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({message: message}))

    })

    test('should update an book', function () {
        const id = 5
        const sample = bookSample.get(id)
        if (sample) {
            sample.title = 'Ruby on Rails 3rd Edition'
            sample.published = '2020-03-09'

            const req = mockRequest({}, sample)
            const res = mockResponse()
            const expected: BookControllerResponse = {
                data: {
                    book: sample,
                    status: statusCode.OK,
                    message: `Book ${id} er opdateret`
                }
            }

            booksController.update(req, res, next)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalled()
            expect(res.json.mock.calls[0][0]).toEqual(expected)
        }
    })

    test('Update should fail on non existing book', function () {
        const id = 999

        const sample: BookEntity = {
            id: id,
            author_id: 3,
            title: 'Professional Web Techniques',
            published: '2020-02-01',
            bookprice: 35.99,
            isbn: '1861003218',
            onhand: 54
        }

        const req = mockRequest({}, sample)
        const res = mockResponse()
        const expected: BookControllerResponse = {
            data: {
                status: statusCode.NotFound,
                message: `Book med nummer ${id} findes ikke`
            }
        }

        booksController.update(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json).toHaveBeenCalledWith(expected)

    })

    test('should succeed to delete book 19', function () {
        const id = 19
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: BookControllerResponse = {
            data: {
                status: statusCode.OK,
                message: `Slettet book ${id}`
            }
        }

        booksController.delete(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('Should fail to delete non existing book', function () {

        const id = 999
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: BookControllerResponse = {
            data: {
                status: statusCode.NotFound,
                message: `Book med nummer ${id} findes ikke`
            }
        }

        booksController.delete(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('Should succced in saving new book', function () {
        const id = 49
        const saved: BookEntity = {
            id: 0,
            author_id: 3,
            title: 'Professional Web Techniques',
            published: '2020-02-01',
            bookprice: 35.99,
            isbn: '1861003218',
            onhand: 54
        }
        const req = mockRequest({}, saved)
        const res = mockResponse()

        const result = Object.assign({}, saved)
        result.id = id

        const expected: BookControllerResponse = {
            data: {
                book: result,
                status: statusCode.OK,
                message: `Book ${result.id} er oprettet`
            }
        }

        booksController.save(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(expected)
    })

})
