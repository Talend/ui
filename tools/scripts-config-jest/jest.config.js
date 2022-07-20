const path = require('path');
const { jsWithBabel: tsjestPreset } = require('ts-jest/presets');
const {
	getBabelConfig,
	getBabelConfigPath,
} = require('@talend/scripts-config-babel/babel-resolver');

module.exports = {
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2)$': path.join(__dirname, 'file-mock.js'),
		'^.+\\.(css|scss)$': path.join(__dirname, 'style-mock.js'),
		'^d3$': path.join(require.resolve('d3'), '../../dist/d3.min.js'),
	},
	rootDir: process.cwd(),
	setupFilesAfterEnv: [path.join(__dirname, 'test-setup.js')],
	testEnvironment: 'jest-environment-jsdom-global',
	testRegex: 'src/.*\\.test.(js|ts|tsx)$',
	transform: {
		...tsjestPreset.transform, // https://kulshekhar.github.io/ts-jest/user/config/#advanced
		'^.+\\.jsx?$': ['babel-jest', { configFile: getBabelConfigPath() }],
		'^.+\\.mjs?$': ['babel-jest', { configFile: getBabelConfigPath() }],
	},
	snapshotSerializers: ['jest-serializer-html'],
	modulePathIgnorePatterns: ['<rootDir>/dist/cdn'],
	globals: {
		'ts-jest': {
			// https://kulshekhar.github.io/ts-jest/user/config/babelConfig
			babelConfig: getBabelConfig(),
		},
	},
};
