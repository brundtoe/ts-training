process.env.DOCKER = 'true'
import {configValue} from '../index.d'
import config from '../index'

const expected: configValue = {
    db: {
        port: 3306,
        user: 'athlon38',
        database: 'mystore',
        password: 'trine-73-glf',
        host: 'localhost'
    },
    server: 'http://localhost:3300',
    bookstore: 'http://localhost:3300/bookstore'
}

describe('Config environment', function () {
    test('dummy test', function () {
        expect(true).toBeTruthy()
    })

    test('Configuration i Docker', function () {
        expected.db.host = 'mysql'
        expect(config.db).toEqual(expected.db)
    })
})
