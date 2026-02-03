const js = require('@eslint/js');
const globals = require('globals');
const babelParser = require('@babel/eslint-parser');
const tseslint = require('typescript-eslint');

const fs = require('fs');
const path = require('path');

function tsConfig() {
	const appDirectory = fs.realpathSync(process.cwd());
	const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
	return fs.existsSync(resolveApp('tsconfig.json'));
}

const isTS = tsConfig();

// Import plugins using legacy format where needed
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const talendPlugin = require('@talend/eslint-plugin');

// Base configuration for all files
const baseConfig = {
	languageOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		parser: babelParser,
		parserOptions: {
			requireConfigFile: false,
			ecmaFeatures: {
				jsx: true,
			},
		},
		globals: {
			...globals.browser,
			...globals.es2021,
			...globals.node,
			...globals.jasmine,
			...globals.jest,
			jsdom: true,
			TALEND_APP_INFO: true,
		},
	},
	plugins: {
		'@talend': talendPlugin,
		react: reactPlugin,
		'react-hooks': reactHooksPlugin,
		'jsx-a11y': jsxA11yPlugin,
		import: importPlugin,
		prettier: prettierPlugin,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		...js.configs.recommended.rules,
		...reactPlugin.configs.recommended.rules,
		...reactPlugin.configs['jsx-runtime'].rules,
		...prettierConfig.rules,
		'@talend/import-depth': 'error',
		'@talend/use-bootstrap-class': 'warn',
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': ['error', 'only-multiline'],
		'function-paren-newline': 'off',
		'implicit-arrow-linebreak': 'off',
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'import/no-named-as-default': 'off',
		indent: 'off',
		'jsx-a11y/label-has-associated-control': 'error',
		'jsx-a11y/label-has-for': 'off',
		'max-classes-per-file': 'off',
		'new-cap': ['error', { capIsNewExceptions: ['List', 'Map'] }],
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'no-else-return': ['error', { allowElseIf: true }],
		'no-mixed-operators': 'off',
		'no-restricted-globals': 'off',
		'no-restricted-properties': 'off',
		'no-tabs': 'off',
		'object-curly-newline': 'off',
		'operator-linebreak': 'off',
		'prefer-destructuring': 'off',
		'react/button-has-type': 'off',
		'react/destructuring-assignment': 'off',
		'react/forbid-foreign-prop-types': 'off',
		'react/forbid-prop-types': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/jsx-curly-newline': 'off',
		'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
		'react/jsx-fragments': 'off',
		'react/jsx-indent': 'off',
		'react/jsx-indent-props': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-wrap-multilines': 'off',
		'react/no-array-index-key': 'off',
		'react/no-this-in-sfc': 'off',
		'react/no-unescaped-entities': 'off',
		'react/no-unused-prop-types': ['error', { skipShapeProps: true }],
		'react/prefer-es6-class': 'off',
		'react/require-default-props': 'off',
		'react/state-in-constructor': 'off',
		'react/static-property-placement': 'off',
	},
};

// TypeScript configuration
const tsConfigs = isTS
	? tseslint.config(
			...tseslint.configs.recommended,
			{
				files: ['**/*.ts', '**/*.tsx'],
				languageOptions: {
					parser: tseslint.parser,
					parserOptions: {
						project: true,
						tsconfigRootDir: process.cwd(),
					},
				},
				rules: {
					'@typescript-eslint/indent': 'off',
					'@typescript-eslint/no-var-requires': 'off',
					'@typescript-eslint/no-explicit-any': 'warn',
				},
			},
			{
				// Disable TS rules for JS files
				files: ['**/*.js'],
				rules: {
					'@typescript-eslint/no-unsafe-return': 'off',
					'@typescript-eslint/no-unsafe-call': 'off',
					'@typescript-eslint/no-unsafe-member-access': 'off',
					'@typescript-eslint/no-unsafe-assignment': 'off',
					'@typescript-eslint/no-unsafe-argument': 'off',
					'@typescript-eslint/restrict-template-expressions': 'off',
					'@typescript-eslint/restrict-plus-operands': 'off',
				},
			},
	  )
	: [];

// Test files configuration
const testConfig = {
	files: [
		'**/*.test.js',
		'**/*.test.ts',
		'**/*.test.tsx',
		'**/*.stories.js',
		'**/*.stories.ts',
		'**/*.stories.tsx',
	],
	rules: {
		'import/no-extraneous-dependencies': 'off',
	},
};

module.exports = [
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/lib/**',
			'**/lib-esm/**',
			'**/build/**',
			'**/coverage/**',
			'**/.storybook/public/**',
			'./index.js',
			'./.eslintrc.js',
		],
	},
	baseConfig,
	...tsConfigs,
	testConfig,
];

