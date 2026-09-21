"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookExists = bookExists;
const books_1 = __importDefault(require("../components/models/books"));
const models_interfaces_1 = require("../components/models/models_interfaces");
const http_errors_1 = __importDefault(require("http-errors"));
function bookExists(book_id) {
    try {
        const result = books_1.default.findById(book_id);
        return result.status === models_interfaces_1.statusCode.OK;
    }
    catch (err) {
        throw (0, http_errors_1.default)(400, err);
    }
}
//# sourceMappingURL=bookExists.js.map