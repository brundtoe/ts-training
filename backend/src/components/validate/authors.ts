import {Request, Response, NextFunction} from 'express'

import {authorsSchema} from './authorsSchema'
import Joi from 'joi'
import {invalidNumber, buildMessage} from './ErrorMessages'

export default {
    post: (req: Request, res: Response, next: NextFunction) => {

        try {
            const schema = authorsSchema
                .with('firstname', ['lastname', 'mail'])
            Joi.assert(req.body, schema)
            next()
        } catch (err: any) {
            res.status(400)
            res.json(buildMessage(err, 'VALIDATION_ERROR'))
        }
    },
    put: (req: Request, res: Response, next: NextFunction) => {

        try {
            const schema = authorsSchema
                .with('id', ['firstname', 'lastname', 'mail'])
            Joi.assert(req.body, schema)
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

