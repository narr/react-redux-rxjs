const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const rootPath = path.join(__dirname, '../../');
let webpackMode;
const DEV_MODE = 'development';
const PROD_MODE = 'production';

function getMode(mode) {
  if (mode === 'dev') {
    return DEV_MODE;
  } else if (mode === 'prod') {
    return PROD_MODE;
  }
}

function setMode(mode) {
  if (webpackMode) {
    return;
  }
  webpackMode = mode;
  // For React
  process.env.NODE_ENV = mode;
}

function getEntry() {
  const hmrEntry =
    webpackMode === DEV_MODE
      ? [
          // For IE 11, https://github.com/webpack-contrib/webpack-hot-middleware/issues/11
          'event-source-polyfill',
          'webpack-hot-middleware/client?reload=true',
        ]
      : [];
  return {
    vendors: hmrEntry.concat([path.join(rootPath, './src/vendors.ts')]),
    app: path.join(rootPath, './src/index.tsx'),
  };
}

function getRules() {
  return [getRuleTs(), getRuleImg()];
}

function getRuleTs() {
  const rule = {
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile:
            webpackMode === DEV_MODE
              ? path.join(rootPath, './config/typescript/tsconfig.webpack.json')
              : path.join(rootPath, './tsconfig.json'),
          transpileOnly: true,
        },
      },
    ],
  };

  if (webpackMode === DEV_MODE) {
    rule.use = [
      {
        loader: 'babel-loader',
        options: {
          presets: ['react-app'],
          cacheDirectory: true,
          babelrc: false,
          plugins: ['react-hot-loader/babel'],
        },
      },
      ...rule.use,
    ];
  }
  return rule;
}

function getRuleImg() {
  const rule = {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    // default fallback is 'file-loader'
    // https://github.com/webpack-contrib/url-loader#fallback
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'media/[name].[hash:8].[ext]',
    },
  };
  return rule;
}

function getPlugins({ extraPlugins = [] } = {}) {
  return [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors'],
    }),
    getHtmlWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    getBundleAnalyzerPlugin(),
  ]
    .concat(extraPlugins)
    .concat(webpackMode === PROD_MODE ? getProdWebpackPlugin() : [])
    .filter(Boolean);
}

function getHtmlWebpackPlugin() {
  const config = {
    template: path.join(rootPath, './src/index.html'),
  };
  return new HtmlWebpackPlugin(config);
}

function getProdWebpackPlugin() {
  return [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          beautify: false,
        },
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ];
}

function getBundleAnalyzerPlugin() {
  if (process.env.NO_BUNDLE_ANALYZER) {
    return null;
  }
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
  return new BundleAnalyzerPlugin();
}

function getAlias() {
  return {
    'proj-root': rootPath,
    'pkg-components': path.join(rootPath, './packages/components/src'),
    'shared-root': path.join(rootPath, './src/app/shared'),
  };
}

function getExtensions() {
  return ['.js', '.ts', '.tsx'];
}

module.exports = {
  getMode,
  setMode,
  getEntry,
  getRules,
  getPlugins,
  getAlias,
  getExtensions,
};
