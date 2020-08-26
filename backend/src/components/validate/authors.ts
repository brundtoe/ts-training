import {Request, Response, NextFunction} from 'express'
const createError = require('http-errors')
const authorsSchema = require('./authorsSchema')
import Joi from '@hapi/joi'

module.exports = {
  post: (req: Request, res: Response, next: NextFunction) => {

    try {
      const schema = authorsSchema
        .with('firstname', ['lastname','mail'])
      Joi.assert(req.body, schema)
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  put: (req: Request, res: Response, next: NextFunction) => {

    try {
      const schema = authorsSchema
        .with('_id',['id','firstname','lastname','mail'])
      Joi.assert(req.body,schema )
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  show: (req: Request, res: Response, next: NextFunction) => {

    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err) {
      next(createError(400, err))
    }
  },
  delete: (req: Request, res: Response, next: NextFunction) => {
    try {
      Joi.assert(req.params.id, Joi.number().integer().required().min(1))
      next()
    } catch (err) {
      next(createError(400, err))
    }
  }

}

