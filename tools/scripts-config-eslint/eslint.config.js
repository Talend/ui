const js = require('@eslint/js');
const globals = require('globals');
const babelParser = require('@babel/eslint-parser');
const typescriptEslint = require('typescript-eslint');
const pluginImport = require('eslint-plugin-import');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const pluginJsxA11y = require('eslint-plugin-jsx-a11y');
const pluginPrettier = require('eslint-plugin-prettier');
const pluginJestDom = require('eslint-plugin-jest-dom');
const pluginTestingLibrary = require('eslint-plugin-testing-library');
const pluginMdx = require('eslint-plugin-mdx');
const pluginStorybook = require('eslint-plugin-storybook');
const pluginAngular = require('eslint-plugin-angular');
const pluginTalend = require('@talend/eslint-plugin');
const prettierConfig = require('eslint-config-prettier');

const fs = require('fs');
const path = require('path');

function tsConfig() {
	const appDirectory = fs.realpathSync(process.cwd());
	const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
	return fs.existsSync(resolveApp('tsconfig.json'));
}

const isTS = tsConfig();

// Base configuration for JavaScript files
const baseConfig = {
	languageOptions: {
		ecmaVersion: 6,
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
			...globals.es6,
			...globals.jasmine,
			...globals.jest,
			jsdom: true,
			TALEND_APP_INFO: true,
		},
	},
	plugins: {
		'@talend': pluginTalend,
		angular: pluginAngular,
		import: pluginImport,
		'jest-dom': pluginJestDom,
		'jsx-a11y': pluginJsxA11y,
		prettier: pluginPrettier,
		react: pluginReact,
		'react-hooks': pluginReactHooks,
		storybook: pluginStorybook,
		'testing-library': pluginTestingLibrary,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		...js.configs.recommended.rules,
		...pluginReact.configs.recommended.rules,
		...pluginReact.configs['jsx-runtime'].rules,
		...pluginJsxA11y.configs.recommended.rules,
		...pluginJestDom.configs.recommended.rules,
		...pluginTestingLibrary.configs.react.rules,
		...pluginStorybook.configs.recommended.rules,
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
		'angular/controller-name': ['error', '/[A-Z].*Ctrl/'],
		'angular/di': 'off',
		'angular/json-functions': 'off',
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
		'testing-library/utils-module': 'off',
		'testing-library/custom-renders': 'off',
		'testing-library/custom-queries': 'off',
		'testing-library/no-node-access': 'off',
		'testing-library/render-result-naming-convention': 'off',
	},
};

// TypeScript configuration
const tsConfigs = isTS
	? [
			...typescriptEslint.configs.recommended,
			{
				files: ['**/*.ts', '**/*.tsx'],
				languageOptions: {
					parser: typescriptEslint.parser,
					parserOptions: {
						project: true,
						tsconfigRootDir: process.cwd(),
					},
				},
				plugins: {
					'@typescript-eslint': typescriptEslint.plugin,
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
	  ]
	: [];

// Test files configuration
const testConfig = {
	files: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/*.stories.js', '**/*.stories.ts', '**/*.stories.tsx'],
	rules: {
		'import/no-extraneous-dependencies': 'off',
	},
};

// MDX configuration
const mdxConfig = {
	...pluginMdx.flat,
	processor: pluginMdx.createRemarkProcessor({
		lintCodeBlocks: true,
	}),
};

module.exports = [
	{
		ignores: ['**/node_modules/**', '**/dist/**', '**/lib/**', '**/lib-esm/**', '**/build/**', 'index.js', '.eslintrc.js'],
	},
	baseConfig,
	...tsConfigs,
	testConfig,
	mdxConfig,
];
