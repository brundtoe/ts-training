import {Request, Response, NextFunction} from 'express'
import createError from 'http-errors'
import {userSchema} from './userSchema'
import Joi from 'joi'

module.exports = {
  post: (req: Request, res: Response, next: NextFunction) => {

    try {
      const schema = userSchema
        .with('name', ['mail','city'])
        .or('name','country')
        .or('name','state')
      Joi.assert(req.body, schema)
      next()
    } catch (err: any) {
      //@ts-ignore
      next(createError(400, err))
    }
  },
  put: (req: Request, res: Response, next: NextFunction) => {

    try {
      const schema = userSchema
        .with('_id',['id','name','mail','city'])
//        .or('name','country')
//        .or('name','state')
      Joi.assert(req.body,schema )
      next()
    } catch (err: any) {
      //@ts-ignore
      next(createError(400, err))
    }
  },
  show: (req: Request, res: Response, next: NextFunction) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err: any) {
      //@ts-ignore
      next(createError(400, err))
    }
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err: any) {
      //@ts-ignore
      next(createError(400, err))
    }
  }

}

