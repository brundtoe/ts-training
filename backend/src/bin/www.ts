#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import * as http from 'http';
import debug from 'debug'
import {AddressInfo} from "node:net";
debug('tsprototype:server');

/**
 * Get port from environment and store in Express.
 */

app.set('host_address', process.env.HOST_ADDRESS || '127.0.0.1')
app.set('port', process.env.PORT || '3300')

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(app.get('port'), app.get('host_address'));
server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }


  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${app.get('port')} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`Port ${app.get('port')} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  const addr = server.address()
  // @ts-ignore
  console.log(`Listening on ${addr.address}:${addr.port}`)
}

/**
 * Process Unhandled Rejections
 */

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection', reason)
  process.exit(1)
})

/**
 * Process unhandled Exceptions
 */

process.on('uncaughtException', error => {
  console.error('Unhandled Exception', error)
})
