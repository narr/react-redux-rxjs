module.exports = ({
  coverageDirectory = './tmp/coverage',
  htmlReporterOutputPath,
} = {}) => {
  const config = {
    rootDir: '../../',
    testRegex: 'src/.*?(\\.|/)(test|spec)\\.tsx?$',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePathIgnorePatterns: ['<rootDir>/tmp'],
    watchPathIgnorePatterns: ['.*?\\.jsx?$'],
    globals: {
      'ts-jest': {
        tsConfigFile: './tsconfig.json',
      },
    },
    coverageDirectory,
    coverageThreshold: {
      global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
    setupTestFrameworkScriptFile: 'jest-enzyme',
    testEnvironment: 'enzyme',
    testURL: 'http://localhost/',
  };

  if (htmlReporterOutputPath) {
    config.reporters = [
      'default',
      [
        './node_modules/jest-html-reporter',
        {
          pageTitle: 'Test Report',
          outputPath: htmlReporterOutputPath,
        },
      ],
    ];
  }

  return config;
};
