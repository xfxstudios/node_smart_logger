module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: './test/unit/.*.ts$',
  testPathIgnorePatterns: [
    './test/unit/stubs/',
    './node_modules/',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  collectCoverageFrom: [
    './src/**/*.{ts,js}'
  ],
};
