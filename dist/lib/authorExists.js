"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authorExists;
const authors_1 = __importDefault(require("../components/models/authors"));
const models_interfaces_1 = require("../components/models/models_interfaces");
const http_errors_1 = __importDefault(require("http-errors"));
function authorExists(author_id) {
    try {
        const result = authors_1.default.findById(author_id);
        return result.status === models_interfaces_1.statusCode.OK;
    }
    catch (err) {
        throw (0, http_errors_1.default)(400, err);
    }
}
//# sourceMappingURL=authorExists.js.map