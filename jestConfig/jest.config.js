module.exports = {
    transform: {
        ".+\\.ts(x?)$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts(x?)$",
    moduleFileExtensions: ["ts", "js", "tsx"],
    moduleNameMapper: {
      "api": "<rootDir>/src/api/__mocks__/",
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    },
  rootDir: '../'
};
