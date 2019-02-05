module.exports = {
	rootDir: process.cwd(),
	testRegex: 'src/.*\\.test.js$',
	moduleNameMapper: {
		'^.+\\.(css|scss)$': '<rootDir>/node_modules/@talend/scripts/webapp/preset/config/test/style-mock.js',
	},
	setupFilesAfterEnv: [
		'<rootDir>/node_modules/@talend/scripts/webapp/preset/config/test/test-setup.js',
	],
	transform: { '^.+\\.js$': '<rootDir>/node_modules/@talend/scripts/webapp/preset/config/test/jest-preprocess.js' },
};
