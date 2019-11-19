const path = require('path');

module.exports = {
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2)$': path.join(
			__dirname,
			'test',
			'file-mock.js',
		),
		'^.+\\.(css|scss)$': path.join(__dirname, 'test', 'style-mock.js'),
	},
	rootDir: process.cwd(),
	setupFilesAfterEnv: [path.join(__dirname, 'test', 'test-setup.js')],
	testEnvironment: 'jest-environment-jsdom-global',
	testRegex: 'src/.*\\.test.js$',
	transform: { '^.+\\.js$': path.join(__dirname, 'test', 'jest-preprocess.js') },
};
