"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authors_1 = __importDefault(require("../models/authors"));
const getDateTime_1 = require("../../lib/getDateTime");
exports.default = {
    index(req, res, next) {
        try {
            const data = authors_1.default.findAll();
            res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    },
    sample(req, res, next) {
        const param = req.params.num;
        try {
            const num = parseInt(param);
            if (!Number.isInteger(num))
                throw new Error(`Request param ${param} is not a number`);
            const data = authors_1.default.findAll();
            const sample = data.filter(item => item.id <= num);
            res.format({
                'text/html': function () {
                    res.status(200).render('bookstore/authors/sample', { title: 'Authors', authors: sample });
                },
                'application/json': function () {
                    res.status(200).json(sample);
                },
                'default': function () {
                    res.status(406).send('Not acceptable');
                }
            });
        }
        catch (err) {
            next(err);
        }
    },
    show(req, res, next) {
        const param = req.params.id;
        try {
            const author_id = parseInt(param);
            if (!Number.isInteger(author_id))
                throw new Error(`Request param ${param} is not a number`);
            const data = authors_1.default.findById(author_id);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    delete(req, res, next) {
        const param = req.params.id;
        try {
            const author_id = parseInt(param);
            if (!Number.isInteger(author_id))
                throw new Error(`Request param ${param} is not a number`);
            const data = authors_1.default.deleteById(author_id);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    update(req, res, next) {
        const author = {
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: req.body.mail,
            created_at: req.body.created_at,
            updated_at: (0, getDateTime_1.getDateTime)()
        };
        try {
            const data = authors_1.default.updateById(author);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    save(req, res, next) {
        const author = {
            id: 0,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mail: req.body.mail,
            created_at: (0, getDateTime_1.getDateTime)(),
            updated_at: ""
        };
        try {
            const data = authors_1.default.save(author);
            res.status(201).json({ data });
        }
        catch (err) {
            next(err);
        }
    }
};
//# sourceMappingURL=authorsController.js.map