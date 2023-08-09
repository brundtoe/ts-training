import {Request} from 'express'
import authorsController from '../authorsController'
import config from '../../../config'
import {AuthorEntity, AuthorResponse, statusCode} from "../../models/models_interfaces";

interface AuthorControllerResponse {
    data: AuthorResponse
}

describe('Authors Controller', function () {

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

    const sampleAuthors = new Map<number, AuthorEntity>()

    sampleAuthors.set(5, {
        id: 5,
        firstname: "Alexander",
        lastname: "Nakhimovsky",
        mail: "Nakhimovsky@mail.com"
    })

    sampleAuthors.set(7, {
        "id": 7,
        "firstname": "Andrew",
        "lastname": "Enfield",
        "mail": "Enfield@mail.com"
    })

    test('Index Should return all authors', function () {

        const res = mockResponse()
        const req = mockRequest({})
        authorsController.index(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.json.mock.calls[0][0].length).toBe(29)
    })

    test('Sample should return a number of authors', function () {
        const num = 12
        const req = mockRequest({num: num.toString()})
        const res = mockResponse()
        authorsController.sample(req, res, next)
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

        authorsController.sample(req, res, next)
        expect(next).toHaveBeenCalled()
        const message = `Request param ${num} is not a number`
        expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({message: message}))

    })

    test('should show author number 7', function () {
        const id = 7
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: AuthorControllerResponse = {
            data: {
                author: sampleAuthors.get(id),
                status: statusCode.OK,
                message: `Author ${id} er fundet`
            }
        }

        authorsController.show(req, res, next)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)

    })
    test('Should fail to show author 999', function () {
        const id = 999
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: AuthorControllerResponse = {
            data: {
                status: statusCode.NotFound,
                message: `Author med nummer ${id} findes ikke`
            }
        }

        authorsController.show(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('show should throw error on param not a number', function () {
        const id = 'Alfred'
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        authorsController.show(req, res, next)
        expect(next).toHaveBeenCalled()
        const message = `Request param ${id} is not a number`
        expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({message: message}))

    })

    test('should update an author', function () {

        const sample = sampleAuthors.get(5)
        if (sample) {
            const updated = {
                id: sample.id,
                firstname: 'William',
                lastname: 'Johnson',
                mail: sample.mail
            }
            const req = mockRequest({}, updated)
            const res = mockResponse()
            const expected: AuthorControllerResponse = {
                data: {
                    author: updated,
                    status: statusCode.OK,
                    message: `Author ${sample.id} er opdateret`
                }
            }

            authorsController.update(req, res, next)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalled()
            expect(res.json.mock.calls[0][0]).toEqual(expected)
        }
    })

    test('Update should fail on non existing author', function () {
        const sample = sampleAuthors.get(5)
        const id = 999
        if (sample) {
            const updated = {
                id: id,
                firstname: 'William',
                lastname: 'Johnson',
                mail: sample.mail
            }
            const req = mockRequest({}, updated)
            const res = mockResponse()
            const expected: AuthorControllerResponse = {
                data: {
                    status: statusCode.NotFound,
                    message: `Author med nummer ${id} findes ikke`
                }
            }

            authorsController.update(req, res, next)
            expect(next).not.toHaveBeenCalled()
            expect(res.json).toHaveBeenCalledWith(expected)
        }
    })

    test('should succeed to delete author 19', function () {
        const id = 19
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: AuthorControllerResponse = {
            data: {
                status: statusCode.OK,
                message: `Slettet author ${id}`
            }
        }

        authorsController.delete(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('Should fail to delete non existing author', function () {

        const id = 999
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: AuthorControllerResponse = {
            data: {
                status: statusCode.NotFound,
                message: `Author med nummer ${id} findes ikke`
            }
        }

        authorsController.delete(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('Should succced in saving new author', function () {
        const id = 0
        const saved = {
            id: id,
            firstname: 'Katrine',
            lastname: 'Andersen',
            mail: 'katrine@example.com'
        }
        const req = mockRequest({}, saved)
        const res = mockResponse()

        const result = Object.assign({}, saved)
        result.id = 29

        const expected: AuthorControllerResponse = {
            data: {
                author: result,
                status: statusCode.OK,
                message: `Author ${result.id} er oprettet`
            }
        }

        authorsController.save(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(expected)
    })

})
