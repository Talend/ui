const config = {
	root: true,
	extends: ['@talend'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
};

module.exports = config;
