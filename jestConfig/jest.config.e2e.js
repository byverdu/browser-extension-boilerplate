const config = require ( './jest.config' );

module.exports = {
  ...config,
  moduleNameMapper: {
    ...config.moduleNameMapper,
  },
  setupFilesAfterEnv: [ '<rootDir>/jestConfig/setupTestsUI.ts' ],
};
