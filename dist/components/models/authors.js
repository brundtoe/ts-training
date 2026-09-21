"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchMap_1 = require("./fetchMap");
const models_interfaces_1 = require("./models_interfaces");
exports.default = {
    findAll() {
        let data = [];
        try {
            const actual = (0, fetchMap_1.getAuthors)();
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
    findById(author_id) {
        const data = (0, fetchMap_1.getAuthors)();
        if (data.has(author_id)) {
            return {
                author: data.get(author_id),
                status: models_interfaces_1.statusCode.OK,
                message: `Author ${author_id} er fundet`
            };
        }
        return {
            status: models_interfaces_1.statusCode.NotFound,
            message: `Author med nummer ${author_id} findes ikke`,
        };
    },
    deleteById(author_id) {
        try {
            const data = (0, fetchMap_1.getAuthors)();
            if (data.has(author_id)) {
                data.delete(author_id);
                return {
                    status: models_interfaces_1.statusCode.OK,
                    message: `Slettet author ${author_id}`
                };
            }
            return {
                status: models_interfaces_1.statusCode.NotFound,
                message: `Author med nummer ${author_id} findes ikke`
            };
        }
        catch (err) {
            return {
                author: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
    },
    updateById(author) {
        try {
            const data = (0, fetchMap_1.getAuthors)();
            if (data.has(author.id)) {
                data.set(author.id, author);
                return {
                    author: data.get(author.id),
                    status: models_interfaces_1.statusCode.OK,
                    message: `Author ${author.id} er opdateret`
                };
            }
            return {
                status: models_interfaces_1.statusCode.NotFound,
                message: `Author med nummer ${author.id} findes ikke`,
            };
        }
        catch (err) {
            return {
                author: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
    },
    save(author) {
        let data;
        try {
            data = (0, fetchMap_1.getAuthors)();
            const lastAuthor = data.get(data.size);
            if (lastAuthor) {
                author.id = lastAuthor.id + 1;
                data.set(author.id, author);
                return {
                    author: data.get(author.id),
                    status: models_interfaces_1.statusCode.OK,
                    message: `Author ${author.id} er oprettet`
                };
            }
            return {
                author: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: 'Unexpected end of save author'
            };
        }
        catch (err) {
            return {
                author: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
    }
};
//# sourceMappingURL=authors.js.map