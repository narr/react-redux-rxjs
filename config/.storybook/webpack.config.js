const path = require('path');
const _ = require('lodash');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const includePath = path.join(__dirname, '../../packages');
const tsconfigPath = path.join(__dirname, '../../tsconfig.json');

function removeStorybookBabelLoader(rules) {
  const babelLoaderTestRegexString = /\.jsx?$/.toString();
  return _.filter(rules, rule => {
    return rule.test.toString() !== babelLoaderTestRegexString;
  });
}

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules = removeStorybookBabelLoader(
    defaultConfig.module.rules
  ).concat([
    {
      test: /\.(ts|tsx)$/,
      include: includePath,
      use: [
        {
          loader: 'ts-loader',
          options: {
            configFile: tsconfigPath,
            transpileOnly: true,
          },
        },
      ],
    },
    {
      test: /\.js$/,
      include: includePath,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['react-app'],
          },
        },
      ],
    },
  ]);

  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  defaultConfig.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: includePath,
    })
  );

  return defaultConfig;
};
