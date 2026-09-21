"use strict";
// noinspection JSUnusedLocalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
function default_1(err, req, res, _next) {
    let actual = {};
    if (err.error) {
        actual.error = err.error;
    }
    else {
        actual = {
            error: {
                type: err.type || 'APPLICATION_ERROR',
                description: [err.message,
                    req.url]
            }
        };
    }
    // render the error
    res.status(err.status || 500);
    res.json(actual);
}
//# sourceMappingURL=errorHandler.js.map