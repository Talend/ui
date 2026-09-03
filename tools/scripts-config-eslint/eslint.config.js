const { defineConfig, globalIgnores } = require('eslint/config');
const { fixupPluginRules } = require('@eslint/compat');
const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');

const fs = require('fs');
const path = require('path');

const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const talendPlugin = require('@talend/eslint-plugin');
const testingLibraryPlugin = require('eslint-plugin-testing-library');
const mdxPlugin = require('eslint-plugin-mdx');

function tsConfig() {
	const appDirectory = fs.realpathSync(process.cwd());
	const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
	return fs.existsSync(resolveApp('tsconfig.json'));
}

const isTS = tsConfig();

// Base configuration for all files
const baseConfig = {
	extends: [js.configs.recommended],
	languageOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
		globals: {
			...globals.browser,
			...globals.es2022,
			...globals.node,
			...globals.jasmine,
			...globals.jest,
			jsdom: true,
			TALEND_APP_INFO: true,
		},
	},
	plugins: {
		'@talend': fixupPluginRules(talendPlugin),
		'jsx-a11y': jsxA11yPlugin,
		prettier: prettierPlugin,
		react: fixupPluginRules(reactPlugin),
		'react-hooks': reactHooksPlugin,
		'testing-library': testingLibraryPlugin,
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
			},
		},
	},
	rules: {
		...reactPlugin.configs.recommended.rules,
		...reactPlugin.configs['jsx-runtime'].rules,
		...jsxA11yPlugin.flatConfigs.recommended.rules,
		...testingLibraryPlugin.configs['flat/react'].rules,
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
		'prettier/prettier': 'error',
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

// Test and story files configuration
const testConfig = {
	files: [
		'**/*.test.js',
		'**/*.test.ts',
		'**/*.test.tsx',
		'**/*.stories.js',
		'**/*.stories.ts',
		'**/*.stories.tsx',
	],
	languageOptions: {
		globals: {
			vi: 'readonly',
		},
	},
	rules: {
		'import/no-extraneous-dependencies': 'off',
	},
};

// MDX configuration
const mdxConfig = {
	...mdxPlugin.configs.flat,
	files: ['**/*.mdx'],
};

module.exports = defineConfig([
	globalIgnores([
		'**/.changeset/**',
		'**/.github/**',
		'**/.husky/**',
		'**/.idea/**',
		'**/.surge/**',
		'**/node_modules/**',
		'**/dist/**',
		'**/build/**',
		'**/lib/**',
		'**/lib-esm/**',
		'**/coverage/**',
		'**/.storybook/public/**',
		'**/packages/design-tokens/supernova-exporter/**',
		'**/*.stories.js',
		'**/jest.setup.js',
		'**/jest.config.js',
		'**/vitest.config.ts',
		'./.eslintrc.js',
		'./index.js',
	]),
	baseConfig,
	...tsConfigs,
	testConfig,
	mdxConfig,
]);
