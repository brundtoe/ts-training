import {Request, Response, NextFunction} from 'express'
import {booksSchema} from './booksSchema'
import authorExists from '../../lib/authorExists'
import Joi from 'joi'
import {buildMessage} from './ErrorMessages'

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
      res.json(buildMessage(err, 'VALIDATION_ERROR'))
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
      res.json(buildMessage(err, 'VALIDATION_ERROR'))
    }
  },
  show: (req: Request, res: Response, next: NextFunction) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err: any) {
      res.status(400)
      res.json(buildMessage(err, 'VALIDATION_ERROR'))
    }
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err: any) {
      res.status(400)
      res.json(buildMessage(err, 'VALIDATION_ERROR'))
    }
  }

}



