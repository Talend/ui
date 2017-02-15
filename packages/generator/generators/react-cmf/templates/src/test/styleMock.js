/**
 * This file emulate an empty module.
 * It is used to mock the "import '<filename>.(s)css' during unit tests run.
 * In package.json, jest is configured to use this module instead of the real style module
 * "jest": {
     ...
     "moduleNameMapper": {
       "^.+\\.(css|scss)$": "<rootDir>/src/test/styleMock.js"
     }
 * }
 */
module.exports = {};
