import {Request, Response, Router} from 'express';
const fetchRoutes = Router();




fetchRoutes.get('/fetchjson', function(req: Request, res: Response) {
  res.render('client/fetchjson', {title: 'Fetch Json'});
});

export default fetchRoutes

