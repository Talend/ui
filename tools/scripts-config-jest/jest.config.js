const path = require('path');
const { getBabelConfigPath } = require('@talend/scripts-config-babel/babel-resolver');

module.exports = {
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2)$': path.join(__dirname, 'file-mock.js'),
		'^.+\\.(css|scss)$': path.join(__dirname, 'style-mock.js'),
		'^d3$': path.join(require.resolve('d3'), '../../dist/d3.min.js'),
		'^d3-shape$': path.join(require.resolve('d3-shape'), '../../dist/d3-shape.min.js'),
		'^d3-path$': path.join(require.resolve('d3-path'), '../../dist/d3-path.min.js'),
		'^d3-scale$': path.join(require.resolve('d3-scale'), '../../dist/d3-scale.min.js'),
		'^d3-array$': path.join(require.resolve('d3-array'), '../../dist/d3-array.min.js'),
		'^d3-interpolate$': path.join(
			require.resolve('d3-interpolate'),
			'../../dist/d3-interpolate.min.js',
		),
		'^d3-color$': path.join(require.resolve('d3-color'), '../../dist/d3-color.min.js'),
		'^d3-format$': path.join(require.resolve('d3-format'), '../../dist/d3-format.min.js'),
		'^d3-time$': path.join(require.resolve('d3-time'), '../../dist/d3-time.min.js'),
		'^d3-time-format$': path.join(
			require.resolve('d3-time-format'),
			'../../dist/d3-time-format.min.js',
		),
	},
	rootDir: process.cwd(),
	setupFilesAfterEnv: [path.join(__dirname, 'test-setup.js')],
	testEnvironment: 'jest-environment-jsdom-global',
	testRegex: 'src/.*\\.test.(js|ts|tsx)$',
	transform: {
		// match mjs js jsx ts tsx
		'^.+\\.m?[jt]sx?$': ['babel-jest', { configFile: getBabelConfigPath() }],
	},
	snapshotSerializers: ['jest-serializer-html'],
	modulePathIgnorePatterns: ['<rootDir>/dist/cdn'],
};
