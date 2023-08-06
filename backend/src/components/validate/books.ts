import {Request, Response, NextFunction} from 'express'
import createError from 'http-errors'
import {booksSchema} from './booksSchema'
import authorExists from '../../lib/authorExists'
import Joi from 'joi'

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = booksSchema
        .with('title', ['author_id','bookprice','onhand'])
      Joi.assert(req.body, schema)
      const author = authorExists(parseInt(req.body.author_id))
      if (!author) throw createError(400,'author does not exist')
      next()
    } catch (err: any) {
      next(createError(400, err))
    }
  },
  put: async (req: Request, res: Response, next: NextFunction) => {

    try {
      const schema = booksSchema
        .with('title',['_id','id','author_id','bookprice','onhand'])
      Joi.assert(req.body,schema )
      const author = authorExists(parseInt(req.body.author_id))
      if (!author) throw createError(400,'author does not exist')
      next()
    } catch (err: any) {
      next(createError(400, err))
    }
  },
  show: (req: Request, res: Response, next: NextFunction) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err: any) {
      next(createError(400, err))
    }
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err: any) {
      next(createError(400, err))
    }
  }

}



