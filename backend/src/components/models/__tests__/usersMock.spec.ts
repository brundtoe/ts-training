jest.mock('../fetchMap')
const fetchMap = require('../fetchMap')
import users from '../users'
import {UserEntity, UserResponse, statusCode} from "../models_interfaces";

const userSample = new Map<number, UserEntity>()

userSample.set(5,  {
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

describe('Mocking User model', function () {


    const errorMessage = 'users is not iterable'
    const expected: UserResponse = {
        user: undefined,
        status: statusCode.NotFound,
        message: errorMessage
    }

    let usersSpy: any

    beforeEach(() => {
        usersSpy = jest.spyOn(fetchMap, 'getUsers')
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('No users are found', function () {

        usersSpy.mockReturnValue([])
        const actual = users.findAll()
        expect(usersSpy).toHaveBeenCalled()
        expect(actual).toEqual([])
        expect.hasAssertions()
    })

    test('findAll users throws an Error', function () {

        usersSpy.mockImplementation(() => {
            throw new Error()
        })

        const actual = users.findAll()
        expect(usersSpy).toHaveBeenCalled()
        expect(actual).toEqual([])
        expect.hasAssertions()
    })

    test('DeleteById users throws an Error', function () {

        const id = 6
        usersSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const actual = users.deleteById(id)
        expect(usersSpy).toHaveBeenCalled()
        expect(actual).toEqual(expected)
        expect.hasAssertions()
    })

    test('UpdateById users throws an Error', function () {

        usersSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const user = userSample.get(5)
        if (user) {
            const actual: UserResponse = users.updateById(user)
            expect(usersSpy).toHaveBeenCalled()
            expect(actual).toEqual(expected)
        }
        expect.hasAssertions()

    })

    test('Save users throws an Error', function () {

        usersSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const user: UserEntity = {
            id: 0,
            name: "Francis Albion",
            city: "Pensacola",
            state: "Florida",
            country: "USA",
            mail: "francis@anymail.com"
        }

        const actual: UserResponse = users.save(user)
        expect(usersSpy).toHaveBeenCalled()
        expect(actual).toEqual(expected)
    })
})
