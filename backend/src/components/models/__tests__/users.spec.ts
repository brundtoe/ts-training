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

describe('Users Model', function () {

    test('Find userById', function () {
        const id = 5
        const expected: UserResponse = {
            user: userSample.get(id),
            status: statusCode.OK,
            message: `User ${id} er fundet`
        }
        const actual: UserResponse = users.findById(id)
        expect(actual).toEqual(expected)
    })

    test('User is not found in database', function () {
        const id = 999

        const expected = {
            status: statusCode.NotFound,
            message: `User med nummer ${id} findes ikke`,
        }
        const actual: UserResponse = users.findById(id)
        expect(actual).toEqual(expected)


    })

    test('Find all users', function () {
        const actual = users.findAll()
        expect(actual.length).toBe(29)
    })

    test('Delete user', function () {
        const id = 25
        const actual: UserResponse = users.deleteById(id)
        const expected: UserResponse = {
            status: statusCode.OK,
            message: `Slettet user ${id}`
        }
        expect(actual).toEqual(expected)
        const foundMessage: UserResponse = users.findById(id)
        const message: UserResponse = {
            status: statusCode.NotFound,
            message: `User med nummer ${id} findes ikke`
        }
        expect(foundMessage).toEqual(message)
    })

    test('Fails to Delete unknown user', function () {
        const id = 999
        const expected: UserResponse = {
            user: undefined,
            status: statusCode.NotFound,
            message: `User med nummer ${id} findes ikke`
        }
        const actual: UserResponse = users.deleteById(id)
        expect(actual).toEqual(expected)
    })

    test('Update an User', function () {
        const id = 7
        const user: UserEntity | undefined = userSample.get(id)
        if (user) {
            user.name = 'Charles'
            const actual: UserResponse = users.updateById(user)
            const expected: UserResponse = {
                user: user,
                status: statusCode.OK,
                message: `User ${id} er opdateret`
            }
            expect(actual).toEqual(expected)
            const updated = users.findById(id)
            expect(updated.user).toEqual(expected.user)
        }
        expect.hasAssertions()
    })

    test('Fails to update an unknown User', function () {
        const id = 99
        const user: UserEntity =  {
            id: 99,
            name: "Sidney Sheldon",
            city: "Miami",
            state: "Florida",
            country: "USA",
            mail: "sheldon@anymail.com"
        }
        const expected: UserResponse = {
            status: statusCode.NotFound,
            message: `User med nummer ${id} findes ikke`
        }

        const actual: UserResponse = users.updateById(user)
        expect(actual).toEqual(expected)
        expect.hasAssertions()
    })

    test('Save new User', function () {
        const user: UserEntity = {
            id: 0,
            name: "Francis Albion",
            city: "Pensacola",
            state: "Florida",
            country: "USA",
            mail: "francis@anymail.com"
        }
        const actual = users.save(user)
        const id = 29
        const expected: UserResponse = {
            user: user,
            status: statusCode.OK,
            message: `User ${id} er oprettet`
        }
        expect(actual).toEqual(expected)
    })
})
