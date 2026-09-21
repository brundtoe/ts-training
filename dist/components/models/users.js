"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchMap_1 = require("./fetchMap");
const models_interfaces_1 = require("./models_interfaces");
const users = {
    findById(user_id) {
        const data = (0, fetchMap_1.getUsers)();
        if (data.has(user_id)) {
            return {
                user: data.get(user_id),
                status: models_interfaces_1.statusCode.OK,
                message: `User ${user_id} er fundet`
            };
        }
        return {
            status: models_interfaces_1.statusCode.NotFound,
            message: `User med nummer ${user_id} findes ikke`,
        };
    },
    findAll() {
        let data = [];
        try {
            const actual = (0, fetchMap_1.getUsers)();
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
    deleteById(user_id) {
        try {
            const data = (0, fetchMap_1.getUsers)();
            if (data.has(user_id)) {
                data.delete(user_id);
                return {
                    status: models_interfaces_1.statusCode.OK,
                    message: `Slettet user ${user_id}`
                };
            }
            return {
                status: models_interfaces_1.statusCode.NotFound,
                message: `User med nummer ${user_id} findes ikke`,
            };
        }
        catch (err) {
            return {
                user: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
    },
    updateById(user) {
        try {
            const data = (0, fetchMap_1.getUsers)();
            if (data.has(user.id)) {
                data.set(user.id, user);
                return {
                    user: data.get(user.id),
                    status: models_interfaces_1.statusCode.OK,
                    message: `User ${user.id} er opdateret`
                };
            }
            return {
                status: models_interfaces_1.statusCode.NotFound,
                message: `User med nummer ${user.id} findes ikke`,
            };
        }
        catch (err) {
            return {
                user: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
    },
    save(user) {
        let data;
        try {
            data = (0, fetchMap_1.getUsers)();
            const lastUser = data.get(data.size);
            if (lastUser) {
                user.id = lastUser.id + 1;
                data.set(user.id, user);
                return {
                    user: data.get(user.id),
                    status: models_interfaces_1.statusCode.OK,
                    message: `User ${user.id} er oprettet`
                };
            }
            return {
                user: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: 'Unexpected end of save author'
            };
        }
        catch (err) {
            return {
                user: undefined,
                status: models_interfaces_1.statusCode.NotFound,
                message: err.message
            };
        }
    }
};
exports.default = users;
//# sourceMappingURL=users.js.map