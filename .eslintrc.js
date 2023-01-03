const config = {
	root: true,
	extends: ['./node_modules/@talend/scripts-config-eslint/.eslintrc.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.json',
	},
};

module.exports = config;
