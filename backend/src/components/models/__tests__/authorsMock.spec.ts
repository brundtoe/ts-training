jest.mock('../fetchMap')
const fetchMap = require('../fetchMap')
import authors from '../authors'
import {AuthorEntity, AuthorResponse, statusCode} from "../models_interfaces";
import {BookEntity, BookResponse} from "../models_interfaces";

const persons = new Map<number, AuthorEntity>()

persons.set(5, {
    id: 5,
    firstname: "Alexander",
    lastname: "Nakhimovsky",
    mail: "Nakhimovsky@mail.com"
})

persons.set(7, {
    "id": 7,
    "firstname": "Andrew",
    "lastname": "Enfield",
    "mail": "Enfield@mail.com"
})

describe('Mocking Author model', function () {


    const errorMessage = 'Authors is not iterable'
    const expected: AuthorResponse = {
        author: undefined,
        status: statusCode.NotFound,
        message: errorMessage
    }

    let authorsSpy: any

    beforeEach(() => {
        authorsSpy = jest.spyOn(fetchMap, 'getAuthors')
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    test('No Authors are found', function () {

        authorsSpy.mockReturnValue([])
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
            mail: 'jens@example.com'
        }

        const actual: AuthorResponse = authors.save(person)
        expect(authorsSpy).toHaveBeenCalled()
        expect(actual).toEqual(expected)
    })
})
