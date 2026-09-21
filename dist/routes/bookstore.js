"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authorsController_1 = __importDefault(require("../components/bookstore/authorsController"));
const authors_1 = __importDefault(require("../components/validate/authors"));
const books_1 = __importDefault(require("../components/validate/books"));
const users_1 = __importDefault(require("../components/validate/users"));
const usersController_1 = __importDefault(require("../components/bookstore/usersController"));
const booksController_1 = __importDefault(require("../components/bookstore/booksController"));
router.route('/authors/sample/:num')
    .get(authorsController_1.default.sample);
router.route('/authors')
    .get(authorsController_1.default.index)
    .put(authors_1.default.put, authorsController_1.default.update)
    .post(authors_1.default.post, authorsController_1.default.save);
router.route('/authors/:id')
    .get(authors_1.default.show, authorsController_1.default.show)
    .delete(authors_1.default.delete, authorsController_1.default.delete);
router.route('/books/sample/:num')
    .get(booksController_1.default.sample);
router.route('/books')
    .get(booksController_1.default.index)
    .put(books_1.default.put, booksController_1.default.update)
    .post(books_1.default.post, booksController_1.default.save);
router.route('/books/:id')
    .get(books_1.default.show, booksController_1.default.show)
    .delete(books_1.default.delete, booksController_1.default.delete);
router.route('/users/sample/:num')
    .get(usersController_1.default.sample);
router.route('/users')
    .get(usersController_1.default.index)
    .put(users_1.default.put, usersController_1.default.update)
    .post(users_1.default.post, usersController_1.default.save);
router.route('/users/:id')
    .get(users_1.default.show, usersController_1.default.show)
    .delete(users_1.default.delete, usersController_1.default.delete);
exports.default = router;
//# sourceMappingURL=bookstore.js.map