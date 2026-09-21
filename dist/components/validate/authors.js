"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authorsSchema_1 = require("./authorsSchema");
const joi_1 = __importDefault(require("joi"));
const ErrorMessages_1 = require("./ErrorMessages");
exports.default = {
    post: (req, res, next) => {
        try {
            const schema = authorsSchema_1.authorsSchema
                .with('firstname', ['lastname', 'mail']);
            joi_1.default.assert(req.body, schema);
            next();
        }
        catch (err) {
            res.status(400);
            res.json((0, ErrorMessages_1.buildMessage)(err, 'VALIDATION_ERROR'));
        }
    },
    put: (req, res, next) => {
        try {
            const schema = authorsSchema_1.authorsSchema
                .with('id', ['firstname', 'lastname', 'mail']);
            joi_1.default.assert(req.body, schema);
            next();
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
//# sourceMappingURL=authors.js.map