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
    moduleNameMapper: {
      '^pkg-components(.*?)$': '<rootDir>/packages/components/src$1',
      '^shared-root(.*?)$': '<rootDir>/src/app/shared$1',
    },
    modulePathIgnorePatterns: ['<rootDir>/tmp', '<rootDir>/.history'],
    watchPathIgnorePatterns: ['.*?\\.jsx?$'],
    globals: {
      'ts-jest': {
        tsConfigFile: './tsconfig.json',
      },
    },
    collectCoverageFrom: [
      '!**/*.stories.tsx',
      '!**/index.{ts,tsx}',
      '!**/src/vendors.ts',
      '!**/src/reducers.ts',
      '!**/src/ducks.ts',
      '!**/src/app/App.tsx',
      'packages/**/src/**/*.{ts,tsx}',
      'src/**/*.{ts,tsx}',
    ],
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
