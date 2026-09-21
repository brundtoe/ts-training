"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),
    id: joi_1.default.number()
        .integer()
        .min(1),
    name: joi_1.default.string()
        .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
        .min(3)
        .max(30)
        .required(),
    city: joi_1.default.string()
        .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
        .min(3)
        .max(30),
    state: joi_1.default.string()
        .regex(/^[a-zA-Zæøå ÆØÅ]{3,30}$/)
        .min(3)
        .max(30),
    country: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30),
    mail: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'nu'] } })
});
exports.userSchema = userSchema;
//# sourceMappingURL=userSchema.js.map