"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidNumber = invalidNumber;
exports.buildMessage = buildMessage;
function invalidNumber(num, entity) {
    return {
        error: {
            type: 'VALIDATION_ERROR',
            description: [
                `Værdien: ${num} er ikke et ${entity} nummer`
            ]
        }
    };
}
function buildMessage(err, err_type) {
    let error = {
        error: {
            type: err_type,
            description: []
        }
    };
    for (const item of err.details) {
        error.error.description.push(item.message);
    }
    return error;
}
//# sourceMappingURL=ErrorMessages.js.map