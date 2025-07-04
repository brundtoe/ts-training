import {Request, Response, NextFunction} from "express";

import validate from '../books'

describe('Validering af books schema', () => {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn()
    const badRequest = 400

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn(),
            json: jest.fn()
        }
    })

    test('Should succeed with book show', () => {

        const book_id = '4'

        mockRequest = {
            params: {
                id: book_id
            }
        }

        validate.show(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail with book number as a string', () => {

        const book_id = 'dummy'

        mockRequest = {
            params: {
                id: book_id
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    "\"value\" must be a number"
                ]
            }
        }

        validate.show(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with book delete', () => {

        const book_id = '4'

        mockRequest = {
            params: {
                id: book_id
            }
        }

        validate.delete(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail with book delete with invalid number', () => {

        const book_id = 'dummy'

        mockRequest = {
            params: {
                id: book_id
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    "\"value\" must be a number"
                ]
            }
        }

        validate.delete(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with put book', async() => {
        mockRequest = {
            body: {
                id: 3,
                author_id: 3,
                title: 'Professional MongoDB',
                bookprice: 18.49,
                published: new Date('12-07-2020'),
                onhand: 43
            }
        }
        await validate.put(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail to put book without bookprice', async() => {
        mockRequest = {
            body: {
                id: 3,
                author_id: 3,
                title: 'Professional MongoDB',
                published: new Date('12-07-2020'),
                onhand: 43
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    "\"title\" missing required peer \"bookprice\""
                ]
            }
        }
        await validate.put(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should fail to put book when author is not found', async() => {
        const author_id = 9999
        mockRequest = {
            body: {
                id: 3,
                author_id: author_id,
                title: 'Professional MongoDB',
                published: new Date('12-07-2020'),
                bookprice: 18.49,
                onhand: 43
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [`Author ${author_id} findes ikke`]
            }
        }
        await validate.put(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with post book', async() => {
        mockRequest = {
            body: {
                author_id: 3,
                title: 'Professional MongoDB',
                published: new Date('12-07-2020'),
                bookprice: 18.49,
                onhand: 43
            }
        }
        await validate.post(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail to post book without title', async() => {
        mockRequest = {
            body: {
                id: 3,
                author_id: 3,
                published: new Date('12-07-2020'),
                bookprice: 18.29,
                onhand: 43
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    "\"title\" is required"
                ]
            }
        }
        await validate.post(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should fail to post book when author is not found', async() => {
        const author_id = 9999
        mockRequest = {
            body: {
                id: 3,
                author_id: author_id,
                title: 'Professional MongoDB',
                published: new Date('12-07-2020'),
                bookprice: 18.49,
                onhand: 43
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [`Author ${author_id} findes ikke`]
            }
        }
        await validate.post(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

})
