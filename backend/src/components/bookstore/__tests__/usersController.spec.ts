import {Request} from 'express'
import usersController from '../usersController'
import config from '../../../config'
import {UserEntity, UserResponse, statusCode} from "../../models/models_interfaces";

interface UserControllerResponse {
    data: UserResponse
}

describe('Users Controller', function () {

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

    const userSample = new Map<number, UserEntity>()

    userSample.set(5, {
        id: 5,
        name: "Sidney Sheldon",
        city: "Miami",
        state: "Florida",
        country: "USA",
        mail: "sheldon@anymail.com"
    })

    userSample.set(7, {
        id: 7,
        name: "Frederich Forsyth",
        city: "Hollywood",
        state: "California",
        country: "USA",
        mail: "forsyth@anymail.com"
    })

    test('Index Should return all users', function () {

        const res = mockResponse()
        const req = mockRequest({})
        usersController.index(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json.mock.calls[0][0].length).toBe(29)
    })

    test('Sample shold return a number of users', function () {
        const num = 12
        const req = mockRequest({num: num.toString()})
        const res = mockResponse()
        usersController.sample(req, res, next)
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

        usersController.sample(req, res, next)
        expect(next).toHaveBeenCalled()
        const message = `Request param ${num} is not a number`
        expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({message: message}))
    })

    test('should show user number 7', function () {
        const id = 7
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: UserControllerResponse = {
            data: {
                user: userSample.get(id),
                status: statusCode.OK,
                message: `User ${id} er fundet`
            }
        }

        usersController.show(req, res, next)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)

    })
    test('Should fail to show user 999', function () {
        const id = 999
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: UserControllerResponse = {
            data: {
                status: statusCode.NotFound,
                message: `User med nummer ${id} findes ikke`
            }
        }

        usersController.show(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('show should throw error on param not a number', function () {
        const id = 'Alfred'
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        usersController.show(req, res, next)
        expect(next).toHaveBeenCalled()
        const message = `Request param ${id} is not a number`
        expect(next.mock.calls[0][0]).toEqual(expect.objectContaining({message: message}))

    })

    test('should update an user', function () {
        const id = 5
        const sample = userSample.get(id)
        if (sample) {
            const updated = Object.assign({}, sample)
            updated.name = 'Charles Dickens'
            const req = mockRequest({}, updated)
            const res = mockResponse()
            const expected: UserControllerResponse = {
                data: {
                    user: updated,
                    status: statusCode.OK,
                    message: `User ${sample.id} er opdateret`
                }
            }

            usersController.update(req, res, next)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalled()
            expect(res.json.mock.calls[0][0]).toEqual(expected)
        }
    })

    test('Update should fail on non existing user', function () {
        const sample = userSample.get(5)
        const id = 999
        if (sample) {
            sample.id = id
            const req = mockRequest({}, sample)
            const res = mockResponse()
            const expected: UserControllerResponse = {
                data: {
                    status: statusCode.NotFound,
                    message: `User med nummer ${id} findes ikke`
                }
            }

            usersController.update(req, res, next)
            expect(next).not.toHaveBeenCalled()
            expect(res.json).toHaveBeenCalledWith(expected)
        }
    })

    test('should succeed to delete user 19', function () {
        const id = 19
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: UserControllerResponse = {
            data: {
                status: statusCode.OK,
                message: `Slettet user ${id}`
            }
        }

        usersController.delete(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('Should fail to delete non existing user', function () {

        const id = 999
        const req = mockRequest({id: id.toString()})
        const res = mockResponse()
        const expected: UserControllerResponse = {
            data: {
                status: statusCode.NotFound,
                message: `User med nummer ${id} findes ikke`
            }
        }

        usersController.delete(req, res, next)
        expect(next).not.toHaveBeenCalled()
        expect(res.json.mock.calls[0][0]).toEqual(expected)
    })

    test('Should succced in saving new user', function () {
        const user: UserEntity = {
            id: 0,
            name: "Francis Albion",
            city: "Pensacola",
            state: "Florida",
            country: "USA",
            mail: "francis@anymail.com"
        }
        const req = mockRequest({}, user)
        const res = mockResponse()

        const result = Object.assign({}, user)
        result.id = 29

        const expected: UserControllerResponse = {
            data: {
                user: result,
                status: statusCode.OK,
                message: `User ${result.id} er oprettet`
            }
        }

        usersController.save(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith(expected)
    })

})
