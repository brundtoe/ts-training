import {Request, Response, NextFunction} from "express";

import validate from '../authors'

describe('Validering af author schema', () => {

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


    test('Should succeed with author show', () => {

        const author_id = '4'

        mockRequest = {
            params: {
                id: author_id
            }
        }

        validate.show(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })


    test('Should fail with author number as a string', () => {

        const author_id = 'dummy'

        mockRequest = {
            params: {
                id: author_id
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                    description: [
                    `Værdien: ${author_id} er ikke et Author nummer`
                ]
            }
        }

        validate.show(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with author delete', () => {

        const author_id = '4'

        mockRequest = {
            params: {
                id: author_id
            }
        }

        validate.delete(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail with author delete with invalid number', () => {

        const author_id = 'dummy'

        mockRequest = {
            params: {
                id: author_id
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    `Værdien: ${author_id} er ikke et Author nummer`
                ]
            }
        }

        validate.delete(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with put author', async() => {
        mockRequest = {
            body: {
                id: 33,
                firstname: 'Jens',
                lastname: 'Larsen',
                mail: 'jens@larsen.com'
            }
        }
        validate.put(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail to put author without lastname', async() => {
        mockRequest = {
            body: {
                id: 33,
                firstname: 'Jens',
                mail: 'jens@larsen.com'
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    "\"id\" missing required peer \"lastname\""
                ]
            }
        }
        validate.put(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with post author', async() => {
        mockRequest = {
            body: {
                firstname: 'Jens',
                lastname: 'Larsen',
                mail: 'jens@larsen.com'
            }
        }
        validate.post(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail to post author without firstname', async() => {
        mockRequest = {
            body: {
                lastname: 'Larsen',
                mail: 'jens@larsen.com'
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    "\"firstname\" is required"
                ]
            }
        }
        validate.put(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toBeCalledWith(expectedResponse)
        expect(mockResponse.status).toBeCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

})
