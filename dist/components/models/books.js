"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchMap_1 = require("./fetchMap");
const models_interfaces_1 = require("./models_interfaces");
exports.default = {
    findById(book_id) {
        const data = (0, fetchMap_1.getBooks)();
        if (data.has(book_id)) {
            return {
                book: data.get(book_id),
                status: models_interfaces_1.statusCode.OK,
                message: `Book ${book_id} er fundet`
            };
        }
        return {
            status: models_interfaces_1.statusCode.NotFound,
            message: `Book med nummer ${book_id} findes ikke`
        };
    },
    findAll() {
        let data = [];
        try {
            const actual = (0, fetchMap_1.getBooks)();
            if (actual.size > 0) {
                actual.forEach((item) => {
                    data.push(item);
                });
            }
            return data;
        }
        catch (err) {
            return [];
        }
    },
    deleteById(book_id) {
        try {
            const data = (0, fetchMap_1.getBooks)();
            if (data.has(book_id)) {
                data.delete(book_id);
                return {
                    status: models_interfaces_1.statusCode.OK,
                    message: `Slettet book ${book_id}`
                };
            }
            return {
                status: models_interfaces_1.statusCode.NotFound,
                message: `Book med nummer ${book_id} findes ikke`,
            };
        }
        catch (err) {
            return {
                book: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
    },
    updateById(book) {
        try {
            const data = (0, fetchMap_1.getBooks)();
            if (data.has(book.id)) {
                data.set(book.id, book);
                return {
                    book: data.get(book.id),
                    status: models_interfaces_1.statusCode.OK,
                    message: `Book ${book.id} er opdateret`
                };
            }
            return {
                status: models_interfaces_1.statusCode.NotFound,
                message: `Book med nummer ${book.id} findes ikke`,
            };
        }
        catch (err) {
            return {
                book: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
    },
    save(book) {
        let data;
        try {
            data = (0, fetchMap_1.getBooks)();
            const lastBook = data.get(data.size);
            if (lastBook) {
                book.id = lastBook.id + 1;
                data.set(book.id, book);
                return {
                    book: data.get(book.id),
                    status: models_interfaces_1.statusCode.OK,
                    message: `Book ${book.id} er oprettet`
                };
            }
        }
        catch (err) {
            return {
                book: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
        return {
            book: undefined,
            status: models_interfaces_1.statusCode.NotFound,
            message: 'Unexpected end of save author'
        };
    }
};
//# sourceMappingURL=books.js.map