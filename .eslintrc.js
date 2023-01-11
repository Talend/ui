const config = {
	root: true,
	extends: ['@talend'],
	ignorePatterns: ['**/{node_modules,lib}', '**/.eslintrc.js'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: 'tsconfig.eslint.json',
	},
};

module.exports = config;
