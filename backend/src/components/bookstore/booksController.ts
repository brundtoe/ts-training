import {Request, Response, NextFunction} from 'express'
import books from '../models/books'
import {BookEntity} from "../models/models_interfaces";
import config from '../../config'


export default {
    index(req: Request, res: Response, next: NextFunction) {
        try {
            const data = books.findAll()
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    },
    sample(req: Request, res: Response, next: NextFunction) {
        const param = req.params.num
        try {
            const num = parseInt(req.params.num)
            if (!Number.isInteger(num)) throw new Error(`Request param ${param} is not a number`)
            const data: BookEntity[] = books.findAll()
            const sample = data.filter(item => item.id <= num)
            //res.status(200).json(sample)
            res.status(200).render('bookstore/books/sample',{
                title: 'Bøger i Bookstore',
                books: sample
            })
        } catch (err) {
            next(err)
        }
    },

    show(req: Request, res: Response, next: NextFunction) {
        const param = req.params.id
        try {
            const id = parseInt(req.params.id)
            if (!Number.isInteger(id)) throw new Error(`Request param ${param} is not a number`)
            const data = books.findById(id)
            res.status(200).json({data, link: config.bookstore})
        } catch (err) {
            next(err)
        }
    },
    delete(req: Request, res: Response, next: NextFunction) {
        const param = req.params.id
        try {
            const id = parseInt(req.params.id)
            if (!Number.isInteger(id)) throw new Error(`Request param ${param} is not a number`)
            const data = books.deleteById(id)
            res.status(200).json({data, link: config.bookstore})
        } catch (err) {
            next(err)
        }
    },
    update(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.body.id)
        const book = {
            id: id,
            author_id: req.body.author_id,
            title: req.body.title,
            published: req.body.published,
            bookprice: parseFloat(req.body.bookprice),
            isbn: req.body.isbn,
            onhand: parseInt(req.body.onhand)

        }
        try {
            const data = books.updateById(book)
            res.status(200).json({data, link: config.bookstore})
        } catch (err) {
            next(err)
        }

    },

    save(req: Request, res: Response, next: NextFunction) {
        const book = {
            id: 0,
            author_id: req.body.author_id,
            title: req.body.title,
            published: req.body.published,
            bookprice: parseFloat(req.body.bookprice),
            isbn: req.body.isbn,
            onhand: parseInt(req.body.onhand)
        }

        try {
            const data = books.save(book)
            res.status(201).json({data, link: config.bookstore})
        } catch (err) {
            next(err)
        }
    }
}


