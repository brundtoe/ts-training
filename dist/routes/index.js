"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexRouter = (0, express_1.Router)();
/* GET home page. */
// noinspection JSUnusedLocalSymbols
indexRouter.get('/', function (req, res, next) {
    res.render('index', { title: 'Jackie' });
});
exports.default = indexRouter;
//# sourceMappingURL=index.js.map