import {describe, expect, test, jest, beforeEach, afterAll} from '@jest/globals'
import {AuthorMap, BookMap, AuthorEntity, AuthorResponse, UserMap, statusCode} from "../models_interfaces";

jest.unstable_mockModule('../fetchMap', () => ({
    getAuthors: jest.fn<() => AuthorMap>(),
    getBooks: jest.fn<() => BookMap>(),
    getUsers: jest.fn<() => UserMap>(),
}))

const {getAuthors} = await import ('../fetchMap')
const {default: authors} = await import ('../authors')

const persons = new Map<number, AuthorEntity>()

persons.set(5, {
    id: 5,
    firstname: "Alexander",
    lastname: "Nakhimovsky",
    mail: "Nakhimovsky@mail.com",
    created_at: process.env.CREATED_AT || '2023-09-01 18:01:02',
    updated_at: ''
})

persons.set(7, {
    id: 7,
    firstname: "Andrew",
    lastname: "Enfield",
    mail: "Enfield@mail.com",
    created_at: process.env.CREATED_AT || '2023-09-01 18:01:02',
    updated_at: ''
})

describe('Mocking Author model', function () {


    const errorMessage = 'Authors is not iterable'
    const expected: AuthorResponse = {
        author: undefined,
        status: statusCode.NotFound,
        message: errorMessage
    }

    let authorsSpy = jest.mocked(getAuthors)

    beforeEach(() => {
        authorsSpy.mockReset()
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('No Authors are found', function () {

        authorsSpy.mockReturnValue(new Map())
        const actual = authors.findAll()
        expect(authorsSpy).toHaveBeenCalled()
        expect(actual).toEqual([])
        expect.hasAssertions()
    })

    test('findAll Authors throws an Error', function () {

        authorsSpy.mockImplementation(() => {
            throw new Error()
        })

        const actual = authors.findAll()
        expect(authorsSpy).toHaveBeenCalled()
        expect(actual).toEqual([])
        expect.hasAssertions()
    })

    test('DeleteById Authors throws an Error', function () {

        const id = 6
        authorsSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const actual = authors.deleteById(id)
        expect(authorsSpy).toHaveBeenCalled()
        expect(actual).toEqual(expected)
        expect.hasAssertions()
    })

    test('UpdateById Authors throws an Error', function () {

        authorsSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const person = persons.get(5)
        if (person) {
            const actual: AuthorResponse = authors.updateById(person)
            expect(authorsSpy).toHaveBeenCalled()
            expect(actual).toEqual(expected)
        }
        expect.hasAssertions()

    })

    test('Save Authors throws an Error', function () {

        authorsSpy.mockImplementation(() => {
            throw new Error(errorMessage)
        })

        const person: AuthorEntity = {
            id: 0,
            firstname: 'Jens',
            lastname: 'Larsen',
            mail: 'jens@example.com',
            created_at: '',
            updated_at: ''
        }

        const actual: AuthorResponse = authors.save(person)
        expect(authorsSpy).toHaveBeenCalled()
        expect(actual).toEqual(expected)
    })
})
