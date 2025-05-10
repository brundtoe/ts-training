import createError from 'http-errors';
import express from 'express';
import cors from 'cors'
import path from 'node:path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as exphbs from 'express-handlebars';
import indexRouter from './routes';
import fetchRouter from './routes/fetch';
import bookstoreRouter from './routes/bookstore'
import errorHandler from './lib/errorHandler'

const app = express();

const hbs = exphbs.create({
  partialsDir: ['views/partials'],
  extname: '.hbs'
})
app.engine('.hbs', hbs.engine)
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', '.hbs')

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../static')));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', indexRouter);
app.use('/client', fetchRouter);
app.use('/api', bookstoreRouter)
// catch 404 and forward to error handler

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'Route not found', {type: 'ROUTE_ERROR'}))
})

// error handler
app.use(errorHandler)


export default app;
