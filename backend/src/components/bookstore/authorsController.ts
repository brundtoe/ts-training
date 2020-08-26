import {Request, Response, NextFunction} from 'express'

import authors from '../models/authors'
import config from '../../config'
import {AuthorEntity} from "../models/models_interfaces";


export default {
    index(req: Request, res: Response, next: NextFunction) {
        try {
            const data = authors.findAll()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },
    sample(req: Request, res: Response, next: NextFunction) {
        const param = req.params.num
        try {
            const num: number = parseInt(param)
            if (!Number.isInteger(num)) throw new Error(`Request param ${param} is not a number`)
            const data: AuthorEntity[] = authors.findAll()
            const sample = data.filter(item => item.id <= num)
            res.status(200).render('bookstore/authors/sample', {
                title: 'Authors',
                authors: sample
            })
        } catch (err) {
            next(err)
        }
    },
    show(req: Request, res: Response, next: NextFunction) {
        const param = req.params.id
        try {
            const author_id = parseInt(param)
            if (!Number.isInteger(author_id)) throw new Error(`Request param ${param} is not a number`)
            const data = authors.findById(author_id)
            res.status(200).json({data, link: config.bookstore})
        } catch (err) {
            next(err)
        }
    },
    delete(req: Request, res: Response, next: NextFunction) {
        const param = req.params.id
        try {
            const author_id = parseInt(param)
            if (!Number.isInteger(author_id)) throw new Error(`Request param ${param} is not a number`)
            const data = authors.deleteById(author_id)
            res.status(200).json({data, link: config.bookstore})
        } catch (err) {
            next(err)
        }
    },
    update(req: Request, res: Response, next: NextFunction) {

        const author = {
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: req.body.mail
        }
        try {
            const data = authors.updateById(author)
            res.status(200).json({data, link: config.bookstore})
        } catch (err) {
            next(err)
        }

    },

    save(req: Request, res: Response, next: NextFunction) {
        const author = {
            id: 0,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: req.body.mail
        }
        try {
            const data = authors.save(author)
            res.status(201).json({data, link: config.bookstore})

        } catch (err) {
            next(err)
        }
    }
}


