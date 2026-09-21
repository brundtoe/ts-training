"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const exphbs = __importStar(require("express-handlebars"));
const routes_1 = __importDefault(require("./routes"));
const fetch_1 = __importDefault(require("./routes/fetch"));
const bookstore_1 = __importDefault(require("./routes/bookstore"));
const errorHandler_1 = __importDefault(require("./lib/errorHandler"));
const app = (0, express_1.default)();
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
    extname: '.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('views', node_path_1.default.join(__dirname, '../views'));
app.set('view engine', '.hbs');
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(node_path_1.default.join(__dirname, '../static')));
//app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', routes_1.default);
app.use('/client', fetch_1.default);
app.use('/api', bookstore_1.default);
// catch 404 and forward to error handler
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404, 'Route not found', { type: 'ROUTE_ERROR' }));
});
// error handler
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map