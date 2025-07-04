import validate from '../users'
import {NextFunction, Request, Response} from "express";

describe('Validering af users schema', () => {

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

    test('Should succeed with user show', () => {
        const user_id = '4'

        mockRequest = {
            params: {
                id: user_id
            }
        }

        validate.show(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail with user number as a string', () => {

        const user_id = 'dummy'

        mockRequest = {
            params: {
                id: user_id
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    `Værdien: ${user_id} er ikke et User nummer`
                ]
            }
        }

        validate.show(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with user delete', () => {

        const user_id = '4'

        mockRequest = {
            params: {
                id: user_id
            }
        }

        validate.delete(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail with user delete with invalid number', () => {

        const user_id = 'dummy'

        mockRequest = {
            params: {
                id: user_id
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    `Værdien: ${user_id} er ikke et User nummer`
                ]
            }
        }

        validate.delete(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with put user', async () => {
        mockRequest = {
            body: {
                id: 3,
                name: 'Alfred Coppel',
                city: 'Malibu',
                state: 'California',
                country: 'USA',
                mail: 'coppel@anymail.com'
            }
        }
        validate.put(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })
    test('Should fail to put user without city', async () => {
        mockRequest = {
            body: {
                id: 3,
                name: 'Alfred Coppel',
                state: 'California',
                country: 'USA',
                mail: 'coppel@anymail.com'
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    "\"id\" missing required peer \"city\""
                ]
            }
        }
        validate.put(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })

    test('Should succeed with post user', async () => {
        mockRequest = {
            body: {
                id: 3,
                name: 'Alfred Coppel',
                city: 'Malibu',
                state: 'California',
                country: 'USA',
                mail: 'coppel@anymail.com'
            }
        }
        validate.post(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(nextFunction).toHaveBeenCalledTimes(1)
        expect(mockResponse.json).not.toHaveBeenCalled()
        expect(mockResponse.status).not.toHaveBeenCalled()
    })

    test('Should fail to post user without city', async () => {
        mockRequest = {
            body: {
                name: 'Alfred Coppel',
                state: 'California',
                country: 'USA',
                mail: 'coppel@anymail.dk'
            }
        }

        const expectedResponse = {
            error: {
                type: 'VALIDATION_ERROR',
                description: [
                    "\"mail\" must be a valid email",
                ]
            }
        }
        validate.post(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction)
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(badRequest)
        expect(nextFunction).not.toHaveBeenCalled()
    })
})
