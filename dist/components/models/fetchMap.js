"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthors = getAuthors;
exports.getBooks = getBooks;
exports.getUsers = getUsers;
const bookstore_json_1 = __importDefault(require("../data/bookstore.json"));
let authors = new Map();
let books = new Map();
let users = new Map();
function getAuthors() {
    try {
        if (authors.size === 0) {
            const result = bookstore_json_1.default.authors;
            result.forEach((item) => {
                authors.set(item.id, item);
            });
        }
    }
    catch (err) {
        console.log(err);
    }
    return authors;
}
function getBooks() {
    try {
        if (books.size === 0) {
            const result = bookstore_json_1.default.books;
            result.forEach((item) => {
                books.set(item.id, item);
            });
        }
    }
    catch (err) {
        console.log(err);
    }
    return books;
}
/*
Der indlæses bookstore.customers selvom der i ts-training anvendes users i stedet for customers
 */
function getUsers() {
    try {
        if (users.size === 0) {
            const result = bookstore_json_1.default.customers;
            result.forEach((item) => {
                users.set(item.id, item);
            });
        }
    }
    catch (err) {
        console.log(err);
    }
    return users;
}
//# sourceMappingURL=fetchMap.js.map