/**
 * Express configuration
 */

'use strict';

import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './environment';


export default function(app) {
  app.use(morgan('dev'));

  app.set('views', `${config.root}/server/views`);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  function errorHandler (error, req, res, next) {
    if (error instanceof SyntaxError || error instanceof Error) {
      res.statusMessage = 'invalid input, please correct it.';
      return res.status(400).end();
    } else {
      return next();
    }
  }
  app.use(errorHandler);
}
