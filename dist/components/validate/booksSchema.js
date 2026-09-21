"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.booksSchema = joi_1.default.object({
    _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
    id: joi_1.default.number()
        .integer()
        .min(1),
    author_id: joi_1.default.number()
        .integer()
        .min(1)
        .required(),
    title: joi_1.default.string()
        .min(2)
        .max(35)
        .required(),
    published: joi_1.default.date()
        .iso()
        .greater('01-01-1994'),
    bookprice: joi_1.default.number()
        .precision(2)
        .min(1.00)
        .max(99.99),
    isbn: joi_1.default.string()
        .regex(/^[0-9]{10}$/)
        .length(10),
    onhand: joi_1.default.number()
        .integer()
        .min(0)
        .max(99)
});
//# sourceMappingURL=booksSchema.js.map