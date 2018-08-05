/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();

app.use(compression());
// https://expressjs.com/en/api.html#express.json
// app.use(express.json());
app.use(morgan('dev'));
// serve build files
app.use('/static', express.static('static'));
// webpack
const webpackConfigPath = path.join(
  __dirname,
  '../config/webpack/webpack.config.dev.js'
);
const webpackConfig = require(webpackConfigPath);
const webpackCompiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(webpackCompiler, {
    publicPath: '/',
  })
);
app.use(webpackHotMiddleware(webpackCompiler));

app.listen(3000, () =>
  console.log('Development server started at port 3000..!!')
);
