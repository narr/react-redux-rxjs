const jestConfigBase = require('./jest.config.base');

const config = {
  coverageDirectory: './docs/coverage',
  htmlReporterOutputPath: './docs/test-result/index.html',
};

module.exports = jestConfigBase(config);
