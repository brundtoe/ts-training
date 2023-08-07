import {Request, Response, NextFunction} from 'express'
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

interface ErrorMessage {
  error: {
    type: string,
    description: string[]
  }
}
function  buildMessage (err: any, err_type: string) {
  let error: ErrorMessage = {
    error: {
      type: err_type,
      description: []
    }
  }
  for (const item of err.details) {
    error.error.description.push(item.message)
  }
  return error
}
export default {
  post: (req: Request, res: Response, next: NextFunction) => {

    try {
      Joi.assert(req.body, userSchema, {abortEarly: false})
      next()
    } catch (err: any) {
      res.status(400)
      res.json(buildMessage(err, 'VALIDATION_ERROR'))
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
      res.json(buildMessage(err, 'VALIDATION_ERROR'))
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

