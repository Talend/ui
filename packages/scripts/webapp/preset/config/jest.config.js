module.exports = {
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttjest-preprocess.jsf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
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
