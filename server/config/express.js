/**
 * Express configuration
 */

'use strict';

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import config from './environment';


export default function(app) {
  var env = app.get('env');

  app.use(morgan('dev'));

  app.set('views', `${config.root}/server/views`);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  if(env === 'development') {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const stripAnsi = require('strip-ansi');
    const webpack = require('webpack');
    const makeWebpackConfig = require('../../webpack.make');
    const webpackConfig = makeWebpackConfig({ DEV: true });
    const compiler = webpack(webpackConfig);
    const browserSync = require('browser-sync').create();
  }
}
