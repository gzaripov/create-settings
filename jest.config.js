module.exports = {
  verbose: false,
  testEnvironment: 'node',
  cache: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testRegex: 'src/.*.(test|spec)\\.ts$',
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
};
