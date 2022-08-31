/* eslint-disable @typescript-eslint/no-var-requires */
const defaultConfig = require("@inpyjamas/scripts/jest");
defaultConfig.collectCoverageFrom = ["api/**/*.{ts,tsx}", "api/*.{ts,tsx}"];
// defaultConfig.globalSetup = "./test/jest.global-setup.js";
// defaultConfig.globalTeardown = "./test/jest.global-teardown.js";
defaultConfig.coveragePathIgnorePatterns = [
	"/node_modules/",
	"dist",
	"deprecated",
];
defaultConfig.coverageThreshold.global = {
	branches: 69,
	functions: 69,
	lines: 69,
	statements: 69,
};
module.exports = defaultConfig;
