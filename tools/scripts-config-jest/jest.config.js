const path = require('path');
const { getBabelConfigPath } = require('@talend/scripts-config-babel/babel-resolver');

module.exports = {
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2)$': path.join(__dirname, 'file-mock.js'),
		'^.+\\.(css|scss)$': path.join(__dirname, 'style-mock.js'),
	},
	rootDir: process.cwd(),
	setupFilesAfterEnv: [path.join(__dirname, 'test-setup.js')],
	testEnvironment: 'jest-environment-jsdom-global',
	testRegex: 'src/.*\\.test.(js|ts|tsx)$',
	transform: {
		// match mjs js jsx ts tsx
		'^.+\\.m?[jt]sx?$': ['babel-jest', { configFile: getBabelConfigPath() }],
	},
	// stop ignore node_modules transform since d3 and others start to put es6 as main of packages
	transformIgnorePatterns: [`/node_modules/(?!.*)`],
	snapshotSerializers: ['jest-serializer-html'],
	modulePathIgnorePatterns: ['<rootDir>/dist/cdn'],
};
