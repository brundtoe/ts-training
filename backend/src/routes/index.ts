import {Request, Response, NextFunction, Router} from 'express';

const indexRouter = Router();

/* GET home page. */
// noinspection JSUnusedLocalSymbols
indexRouter.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Jackie' });
});

export  default indexRouter;
