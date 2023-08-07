import {Request, Response, NextFunction} from 'express'
import createError from 'http-errors'
import {booksSchema} from './booksSchema'
import authorExists from '../../lib/authorExists'
import Joi from 'joi'

function invalidNumber(num: string) {
  return {
    error: {
      type: 'VALIDATION_ERROR',
      description: [
        `Værdien: ${num} er ikke et Book nummer`
      ]
    }
  }
}

function buildMessage(message: string) {
  return {
    error: {
      type: 'VALIDATION_ERROR',
      description: [message]
    }
  }
}

function authorNotFoundMessage(author_id: Number) {
  return {
    error: {
      type: 'VALIDATION_ERROR',
      description: [`Author ${author_id} findes ikke`]
    }
  }

}
export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = booksSchema
        .with('title', ['author_id','bookprice','onhand'])
      Joi.assert(req.body, schema)
      const author = authorExists(parseInt(req.body.author_id))
      if (!author) {
        res.status(400)
        res.json(authorNotFoundMessage(req.body.author_id))
      } else {
        next()
      }
    } catch (err: any) {
      res.status(400)
      res.json(buildMessage(err.details[0].message))
    }
  },
  put: async (req: Request, res: Response, next: NextFunction) => {

    try {
      const schema = booksSchema
        .with('title',['id','author_id','bookprice','onhand'])
      Joi.assert(req.body,schema )
      const author = authorExists(parseInt(req.body.author_id))
      if (!author) {
        res.status(400)
        res.json(authorNotFoundMessage(req.body.author_id))
      } else {
        next()
      }
    } catch (err: any) {
      res.status(400)
      res.json(buildMessage(err.details[0].message))
    }
  },
  show: (req: Request, res: Response, next: NextFunction) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err: any) {
      res.status(400)
      res.json(invalidNumber(req.params.id))
    }
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err: any) {
      res.status(400)
      res.json(invalidNumber(req.params.id))
    }
  }

}



