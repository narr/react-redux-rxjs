const path = require('path');

const baseConfig = require('./webpack.config.base');
const mode = baseConfig.getMode('prod');
baseConfig.setMode(mode);

function webpackConfig() {
  const config = {
    bail: true,
    devtool: 'source-map',
    entry: baseConfig.getEntry(),
    module: {
      rules: baseConfig.getRules(),
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      path: path.join(__dirname, '../../static'),
    },
    plugins: baseConfig.getPlugins(),
    resolve: {
      alias: baseConfig.getAlias(),
      extensions: baseConfig.getExtensions(),
    },
  };
  return config;
}

module.exports = webpackConfig();
