module.exports = {
  mutate: [
    'src/**/*.js',
  ],
  testRunner: 'jest',
  jest: {
    configFile: './jest.conf.js',
    enableFindRelatedTests: true,
  },
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'off',
  thresholds: { high: 100, low: 80, break: 100 },
};
