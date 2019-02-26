module.exports = {
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|woff|woff2)$':
			'<rootDir>/node_modules/@talend/scripts/webapp/preset/config/test/file-mock.js',
		'^.+\\.(css|scss)$':
			'<rootDir>/node_modules/@talend/scripts/webapp/preset/config/test/style-mock.js',
	},
	rootDir: process.cwd(),
	setupFilesAfterEnv: [
		'<rootDir>/node_modules/@talend/scripts/webapp/preset/config/test/test-setup.js',
	],
	testEnvironment: 'jest-environment-jsdom-global',
	testRegex: 'src/.*\\.test.js$',
	transform: {
		'^.+\\.js$':
			'<rootDir>/node_modules/@talend/scripts/webapp/preset/config/test/jest-preprocess.js',
	},
};
