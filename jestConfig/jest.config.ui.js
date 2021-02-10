const config = require('./jest.config');

module.exports = {
  ...config,
  setupFilesAfterEnv: ["<rootDir>/jestConfig/setupTestsUI.ts"]
}
