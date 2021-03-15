const config = require ( './jest.config' );

module.exports = {
  ...config,
  moduleNameMapper: {
    ...config.moduleNameMapper,
    'Components': '<rootDir>/src/Components/',
  },
  setupFilesAfterEnv: [ '<rootDir>/jestConfig/setupTestsUI.ts' ],
};
