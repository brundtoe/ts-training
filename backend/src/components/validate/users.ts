import {Request, Response, NextFunction} from 'express'
import createError from 'http-errors'
import {userSchema} from './userSchema'
import Joi from 'joi'

function invalidNumber(num: string) {
  return {
    error: {
      type: 'VALIDATION_ERROR',
      description: [
        `Værdien: ${num} er ikke et User nummer`
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

export default {
  post: (req: Request, res: Response, next: NextFunction) => {

    try {
      const schema = userSchema
        .with('name', ['mail','city'])
        .or('name','country')
        .or('name','state')
      Joi.assert(req.body, schema)
      next()
    } catch (err: any) {
      res.status(400)
      res.json(buildMessage(err.details[0].message))
    }
  },
  put: (req: Request, res: Response, next: NextFunction) => {

    try {
      const schema = userSchema
        .with('id',['name','mail','city', 'country','state'])
//        .or('name','country')
//        .or('name','state')
      Joi.assert(req.body,schema )
      next()
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

