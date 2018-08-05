const webpack = require('webpack');

const baseConfig = require('./webpack.config.base');
const mode = baseConfig.getMode('dev');
baseConfig.setMode(mode);

function webpackConfig() {
  const config = {
    devtool: 'cheap-module-source-map',
    entry: baseConfig.getEntry(),
    module: {
      rules: baseConfig.getRules(),
    },
    output: {
      filename: '[name].js',
    },
    plugins: baseConfig.getPlugins({
      extraPlugins: [new webpack.HotModuleReplacementPlugin()],
    }),
    resolve: {
      alias: baseConfig.getAlias(),
      extensions: baseConfig.getExtensions(),
    },
  };
  return config;
}

module.exports = webpackConfig();
