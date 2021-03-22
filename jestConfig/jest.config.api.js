const config = require ( './jest.config' );

module.exports = {
  ...config,
  setupFilesAfterEnv: [ '<rootDir>/jestConfig/setupTestsApi.ts' ],
  moduleNameMapper: {
    'api': '<rootDir>/src/api/extension.api',
  },
};
