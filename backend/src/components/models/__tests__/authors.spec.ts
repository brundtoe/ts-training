import authors from '../authors'
import {AuthorEntity, AuthorResponse, statusCode} from "../models_interfaces";

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

describe('Authors Model', function () {

    test('Find authorById', function () {
        const id = 5
        const expected: AuthorResponse = {
            author: persons.get(id),
            status: statusCode.OK,
            message: `Author ${id} er fundet`
        }
        const actual: AuthorResponse = authors.findById(id)
        expect(actual).toEqual(expected)
    })

    test('Author is not found in database', function () {
        const id = 999

        const expected = {
            status: statusCode.NotFound,
            message: `Author med nummer ${id} findes ikke`,
        }
        const actual: AuthorResponse = authors.findById(id)
        expect(actual).toEqual(expected)


    })

    test('Find all authors', function () {
        const actual = authors.findAll()
        expect(actual.length).toBe(29)
    })

    test('Delete author', function () {
        const id = 25
        const actual: AuthorResponse = authors.deleteById(id)
        const expected: AuthorResponse = {
            status: statusCode.OK,
            message: `Slettet author ${id}`
        }
        expect(actual).toEqual(expected)
        const foundMessage: AuthorResponse = authors.findById(id)
        const message: AuthorResponse = {
            status: statusCode.NotFound,
            message: `Author med nummer ${id} findes ikke`
        }
        expect(foundMessage).toEqual(message)
    })

    test('Fails to Delete unknown author', function () {
        const id = 999
        const expected: AuthorResponse = {
            author: undefined,
            status: statusCode.NotFound,
            message: `Author med nummer ${id} findes ikke`
        }
        const actual: AuthorResponse = authors.deleteById(id)
        expect(actual).toEqual(expected)
    })

    test('Update an Author', function () {
        const id = 7
        const person: AuthorEntity | undefined = persons.get(id)
        if (person) {
            person.firstname = 'William'
            const actual: AuthorResponse = authors.updateById(person)
            const expected: AuthorResponse = {
                author: person,
                status: statusCode.OK,
                message: `Author ${id} er opdateret`
            }
            expect(actual).toEqual(expected)
            const updated = authors.findById(id)
            expect(updated.author).toEqual(expected.author)
        }
        expect.hasAssertions()
    })

    test('Fails to update an unknown Author', function () {
        const id = 99
        const person =  {
            id: id,
            firstname: "Alexander",
            lastname: "Nakhimovsky",
            mail: "Nakhimovsky@mail.com"
        }
        const expected: AuthorResponse = {
            status: statusCode.NotFound,
            message: `Author med nummer ${id} findes ikke`
            }

        const actual: AuthorResponse = authors.updateById(person)
        expect(actual).toEqual(expected)
        expect.hasAssertions()
    })

    test('Save new Author', function () {
        const person: AuthorEntity = {
            id: 0,
            firstname: 'Maria',
            lastname: 'Magdalene',
            mail: 'maria@example.com'
        }
        const actual = authors.save(person)
        const id = 29
        const expected = {
            author: person,
            status: statusCode.OK,
            message: `Author ${id} er oprettet`
        }
        expect(actual).toEqual(expected)
    })
})
