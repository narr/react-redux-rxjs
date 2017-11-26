'use strict';

const autoprefixer = require('autoprefixer');

function cssLoaderDev(nodeModules) {
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use a plugin to extract that CSS to a file, but
  // in development "style" loader enables hot editing of CSS.
  return [
    {
      loader: require.resolve('style-loader'),
      options: {
        // when style loader is used with { options: { sourceMap: true } } option,
        // the CSS modules will be generated as Blobs
        sourceMap: true,
      },
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: true,
        modules: !nodeModules,
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ];
}

function cssLoaderProd(shouldUseSourceMap, nodeModules) {
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use a plugin to extract that CSS to a file, but
  // in development "style" loader enables hot editing of CSS.
  return [
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize: true,
        sourceMap: shouldUseSourceMap,
        modules: !nodeModules,
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
    },
  ];
}

module.exports = {
  cssLoader: {
    dev: cssLoaderDev,
    prod: cssLoaderProd,
  },
};
