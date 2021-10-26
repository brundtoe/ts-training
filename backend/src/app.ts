const createError = require('http-errors');
import express from 'express';
import cors from 'cors'
import { Request, Response, NextFunction} from "express";
import path from 'path';
import cookieParser = require('cookie-parser');
import logger from 'morgan';
import * as exphbs from 'express-handlebars';
import indexRouter from './routes';
import fetchRouter from './routes/fetch';
import bookstoreRouter from './routes/bookstore'

const app = express();

const hbs = exphbs.create({
  partialsDir: ['views/partials'],
  extname: '.hbs'
})
app.engine('.hbs', hbs.engine)
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', '.hbs')

const corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost','http://localhost:63342'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}
app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../static')));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', indexRouter);
app.use('/client', fetchRouter);
app.use('/bookstore', bookstoreRouter)
// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler opgivet at få den fejlfri
/**
app.use(function(err: Errback, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.name;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
export default app;
