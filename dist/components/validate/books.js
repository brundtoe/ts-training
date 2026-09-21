"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booksSchema_1 = require("./booksSchema");
const authorExists_1 = __importDefault(require("../../lib/authorExists"));
const joi_1 = __importDefault(require("joi"));
const ErrorMessages_1 = require("./ErrorMessages");
function authorNotFoundMessage(author_id) {
    return {
        error: {
            type: 'VALIDATION_ERROR',
            description: [`Author ${author_id} findes ikke`]
        }
    };
}
exports.default = {
    post: async (req, res, next) => {
        try {
            const schema = booksSchema_1.booksSchema
                .with('title', ['author_id', 'bookprice', 'onhand']);
            joi_1.default.assert(req.body, schema);
            const author = (0, authorExists_1.default)(parseInt(req.body.author_id));
            if (!author) {
                res.status(400);
                res.json(authorNotFoundMessage(req.body.author_id));
            }
            else {
                next();
            }
        }
        catch (err) {
            res.status(400);
            res.json((0, ErrorMessages_1.buildMessage)(err, 'VALIDATION_ERROR'));
        }
    },
    put: async (req, res, next) => {
        try {
            const schema = booksSchema_1.booksSchema
                .with('title', ['id', 'author_id', 'bookprice', 'onhand']);
            joi_1.default.assert(req.body, schema);
            const author = (0, authorExists_1.default)(parseInt(req.body.author_id));
            if (!author) {
                res.status(400);
                res.json(authorNotFoundMessage(req.body.author_id));
            }
            else {
                next();
            }
        }
        catch (err) {
            res.status(400);
            res.json((0, ErrorMessages_1.buildMessage)(err, 'VALIDATION_ERROR'));
        }
    },
    show: (req, res, next) => {
        try {
            joi_1.default.assert(req.params.id, joi_1.default.number().integer().required().min(1));
            next();
        }
        catch (err) {
            res.status(400);
            res.json((0, ErrorMessages_1.buildMessage)(err, 'VALIDATION_ERROR'));
        }
    },
    delete: (req, res, next) => {
        try {
            joi_1.default.assert(req.params.id, joi_1.default.number().integer().required().min(1));
            next();
        }
        catch (err) {
            res.status(400);
            res.json((0, ErrorMessages_1.buildMessage)(err, 'VALIDATION_ERROR'));
        }
    }
};
//# sourceMappingURL=books.js.map