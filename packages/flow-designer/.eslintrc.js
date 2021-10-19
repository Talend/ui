const talendEslintRcPath = require.resolve('@talend/scripts-config-eslint/.eslintrc');

module.exports = {
	extends: talendEslintRcPath,
	parser: '@typescript-eslint/parser',
	rules: {
		'react/prop-types': 'off',
		'import/no-unresolved': 'off',
		'no-shadow': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
	},
};
