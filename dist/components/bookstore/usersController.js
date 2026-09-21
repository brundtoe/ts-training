"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../models/users"));
const getDateTime_1 = require("../../lib/getDateTime");
exports.default = {
    index(req, res, next) {
        try {
            const data = users_1.default.findAll();
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
            const data = users_1.default.findAll();
            const sample = data.filter((item) => item.id <= num);
            res.format({
                'text/html': function () {
                    res.status(200).render('bookstore/users/sample', { title: 'Users i Bookstore', users: sample });
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
            const id = parseInt(param);
            if (!Number.isInteger(id))
                throw new Error(`Request param ${param} is not a number`);
            const data = users_1.default.findById(id);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    delete(req, res, next) {
        const param = req.params.id;
        try {
            const id = parseInt(param);
            if (!Number.isInteger(id))
                throw new Error(`Request param ${param} is not a number`);
            const data = users_1.default.deleteById(id);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    update(req, res, next) {
        const id = parseInt(req.body.id);
        const user = {
            id: id,
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            mail: req.body.mail,
            created_at: req.body.created_at,
            updated_at: (0, getDateTime_1.getDateTime)()
        };
        try {
            const data = users_1.default.updateById(user);
            res.status(200).json({ data });
        }
        catch (err) {
            next(err);
        }
    },
    save(req, res, next) {
        const user = {
            id: 0,
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            mail: req.body.mail,
            created_at: (0, getDateTime_1.getDateTime)(),
            updated_at: ""
        };
        try {
            const data = users_1.default.save(user);
            res.status(201).json({ data });
        }
        catch (err) {
            next(err);
        }
    }
};
//# sourceMappingURL=usersController.js.map