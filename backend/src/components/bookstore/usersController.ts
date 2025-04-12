import {Request, Response, NextFunction} from 'express'
import users from '../models/users'
import {UserEntity} from '../models/models_interfaces'

export default {
    index(req: Request, res: Response, next: NextFunction) {
        try {
            const data = users.findAll()
            res.status(200).json(data)
        } catch (err: any) {
            next(err)
        }
    },
    sample(req: Request, res: Response, next: NextFunction) {
        const param = req.params.num
        try {
            const num = parseInt(param)
            if (!Number.isInteger(num)) throw new Error(`Request param ${param} is not a number`)
            const data: UserEntity[] = users.findAll()
            const sample = data.filter((item) => item.id <= num)
            res.format({
                'text/html': function () {
                    res.status(200).render('bookstore/users/sample', {title: 'Users i Bookstore', users: sample})
                },
                'application/json': function () {
                    res.status(200).json(sample)
                },
                'default': function () {
                    res.status(406).send('Not acceptable')
                }
            })
        } catch (err: any) {
            next(err)
        }
    },
    show(req: Request, res: Response, next: NextFunction) {
        const param = req.params.id
        try {
            const id = parseInt(param)
            if (!Number.isInteger(id)) throw new Error(`Request param ${param} is not a number`)
            const data = users.findById(id)
            res.status(200).json({data})
        } catch (err: any) {
            next(err)
        }
    },
    delete(req: Request, res: Response, next: NextFunction) {
        const param = req.params.id
        try {
            const id = parseInt(param)
            if (!Number.isInteger(id)) throw new Error(`Request param ${param} is not a number`)
            const data = users.deleteById(id)
            res.status(200).json({data})
        } catch (err: any) {
            next(err)
        }
    },
    update(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.body.id)
        const user: UserEntity = {
            id: id,
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            mail: req.body.mail
        }
        try {
            const data = users.updateById(user)
            res.status(200).json({data})

        } catch (err: any) {
            next(err)
        }

    },

    save(req: Request, res: Response, next: NextFunction) {
        const user: UserEntity = {
            id: 0,
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            mail: req.body.mail
        }
        try {
            const data = users.save(user)
            res.status(201).json({data})

        } catch (err: any) {
            next(err)
        }
    }
}


