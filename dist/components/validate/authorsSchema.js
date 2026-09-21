"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const authorsSchema = joi_1.default.object({
    _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
    id: joi_1.default.number()
        .integer()
        .min(1),
    firstname: joi_1.default.string()
        .regex(/^[a-zA-ZæøåÆØÅ]{3,30}$/)
        .min(2)
        .max(30)
        .required(),
    lastname: joi_1.default.string()
        .regex(/^[a-zA-ZæøåÆØÅ]{3,30}$/)
        .min(3)
        .max(30),
    mail: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'nu'] } })
});
exports.authorsSchema = authorsSchema;
//# sourceMappingURL=authorsSchema.js.map