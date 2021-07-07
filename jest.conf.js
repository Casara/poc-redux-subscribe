const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  globals: {},
  collectCoverage: true,
  coverageDirectory: process.env.JEST_CLOVER_OUTPUT_DIR || './coverage',
  coverageReporters: ['text', 'clover', 'lcov'],
  collectCoverageFrom: [
    '**/src/**/*.js',
    '**/spec/**/*.js',
    '!**/dist/**/*.js',
  ],
  moduleFileExtensions: [
    'js',
  ],
};
