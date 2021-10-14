import authors from '../components/models/authors'
import {AuthorResponse, statusCode} from '../components/models/models_interfaces'
import createError from 'http-errors'

function authorExists(author_id: number) {
    try {
        const result: AuthorResponse = authors.findById(author_id)
        return result.status === statusCode.OK
    } catch (err: any) {
        throw createError(400, err)
    }
}

export {authorExists}
