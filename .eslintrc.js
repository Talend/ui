const config = {
	root: true,
	extends: ['@talend/scripts-config-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
};

module.exports = config;
