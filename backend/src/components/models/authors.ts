import {getAuthors} from './fetchMap'
import {AuthorEntity, AuthorMap, AuthorResponse, statusCode} from './models_interfaces'

export default {

    findById(author_id: number): AuthorResponse {
        const data = getAuthors()
        if (data.has(author_id)) {
            return {
                author: data.get(author_id),
                status: statusCode.OK,
                message: `Author ${author_id} er fundet`
            }
        }
        return {
            status: statusCode.NotFound,
            message: `Author med nummer ${author_id} findes ikke`,
        }
    },

    findAll(): AuthorEntity[]  {
        let data: AuthorEntity[] = []
        try {
            const actual: AuthorMap = getAuthors()
            if (actual.size > 0) {
                actual.forEach((item) => {
                    data.push(item)
                })
            }
            return data
        } catch (err) {
            return []
        }
    },

    deleteById(author_id: number): AuthorResponse {
        try {
            const data = getAuthors()
            if (data.has(author_id)) {
                data.delete(author_id)
                return {
                    status: statusCode.OK,
                    message: `Slettet author ${author_id}`
                }
            }

            return {
                status: statusCode.NotFound,
                message: `Author med nummer ${author_id} findes ikke`
            }

        } catch (err) {
            return {
                author: undefined,
                status: statusCode.NotFound,
                message: err.message
            }
        }
    }
    ,
    updateById(author: AuthorEntity): AuthorResponse {
        try {
            const data = getAuthors()
            if (data.has(author.id)) {
                data.set(author.id, author)
                return {
                    author: data.get(author.id),
                    status: statusCode.OK,
                    message: `Author ${author.id} er opdateret`
                }
            }

            return {
                status: statusCode.NotFound,
                message: `Author med nummer ${author.id} findes ikke`,
            }

        } catch (err) {

            return {
                author: undefined,
                status: statusCode.NotFound,
                message: err.message
            }
        }
    },

    save(author: AuthorEntity): AuthorResponse {
        let data: Map<number, AuthorEntity>
        try {
            data = getAuthors()
            const lastAuthor: AuthorEntity | undefined = data.get(data.size)
            if (lastAuthor) {
                author.id = lastAuthor.id + 1
                data.set(author.id, author)
                return {
                    author: data.get(author.id),
                    status: statusCode.OK,
                    message: `Author ${author.id} er oprettet`
                }
            }
            return {
                author: undefined,
                status: statusCode.NotFound,
                message: 'Unexpected end of save author'
            }
        } catch (err) {
            return {
                author: undefined,
                status: statusCode.NotFound,
                message: err.message
            }
        }
    }
}
