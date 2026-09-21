"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fetchRoutes = (0, express_1.Router)();
fetchRoutes.get('/fetchjson', function (req, res) {
    res.render('client/fetchjson', { title: 'Fetch Json' });
});
exports.default = fetchRoutes;
//# sourceMappingURL=fetch.js.map