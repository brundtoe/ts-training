"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = __importDefault(require("../models/books"));
const getDateTime_1 = require("../../lib/getDateTime");
exports.default = {
    index(req, res, next) {
        try {
            const data = books_1.default.findAll();
            res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    },
    sample(req, res, next) {
        const param = req.params.num;
        try {
            const num = parseInt(req.params.num);
            if (!Number.isInteger(num))
                throw new Error(`Request param ${param} is not a number`);
            const data = books_1.default.findAll();
            const sample = data.filter(item => item.id <= num);
            res.format({
                'text/html': function () {
                    res.status(200).render('bookstore/books/sample', { title: 'Bøger i Bookstore', books: sample });
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
            const id = parseInt(req.params.id);
            if (!Number.isInteger(id))
                throw new Error(`Request param ${param} is not a number`);
            const data = books_1.default.findById(id);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    delete(req, res, next) {
        const param = req.params.id;
        try {
            const id = parseInt(req.params.id);
            if (!Number.isInteger(id))
                throw new Error(`Request param ${param} is not a number`);
            const data = books_1.default.deleteById(id);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    update(req, res, next) {
        const id = parseInt(req.body.id);
        const book = {
            id: id,
            author_id: req.body.author_id,
            title: req.body.title,
            published: req.body.published,
            bookprice: parseFloat(req.body.bookprice),
            isbn: req.body.isbn,
            onhand: parseInt(req.body.onhand),
            created_at: req.body.created_at,
            updated_at: (0, getDateTime_1.getDateTime)()
        };
        try {
            const data = books_1.default.updateById(book);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    save(req, res, next) {
        const book = {
            id: 0,
            author_id: req.body.author_id,
            title: req.body.title,
            published: req.body.published,
            bookprice: parseFloat(req.body.bookprice),
            isbn: req.body.isbn,
            onhand: parseInt(req.body.onhand),
            created_at: (0, getDateTime_1.getDateTime)(),
            updated_at: ""
        };
        try {
            const data = books_1.default.save(book);
            res.status(201).json({ data });
        }
        catch (err) {
            next(err);
        }
    }
};
//# sourceMappingURL=booksController.js.map