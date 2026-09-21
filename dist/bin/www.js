#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
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
const app_1 = __importDefault(require("../app"));
const http = __importStar(require("http"));
const debug_1 = __importDefault(require("debug"));
(0, debug_1.default)('tsprototype:server');
/**
 * Get port from environment and store in Express.
 */
app_1.default.set('host_address', process.env.HOST_ADDRESS || '127.0.0.1');
app_1.default.set('port', process.env.PORT || '3300');
/**
 * Create HTTP server.
 */
const server = http.createServer(app_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(app_1.default.get('port'), app_1.default.get('host_address'));
server.on('error', onError);
server.on('listening', onListening);
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${app_1.default.get('port')} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${app_1.default.get('port')} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    // @ts-ignore
    console.log(`Listening on ${addr.address}:${addr.port}`);
}
/**
 * Process Unhandled Rejections
 */
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection', reason);
    process.exit(1);
});
/**
 * Process unhandled Exceptions
 */
process.on('uncaughtException', error => {
    console.error('Unhandled Exception', error);
});
//# sourceMappingURL=www.js.map