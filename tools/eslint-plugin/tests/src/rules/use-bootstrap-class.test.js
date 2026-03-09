/**
 * @fileoverview Check if the import of d3 is not on d3-*
 * @author Jean-Michel FRANCOIS
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../src/rules/use-bootstrap-class');
const RuleTester = require('eslint').RuleTester;
const parser = require('@typescript-eslint/parser');
const languageOptions = {
	parser,
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: { jsx: true },
	},
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('talend-use-bootstrap-class', rule, {
	valid: [
		{
			code: `import classnames from 'classnames';
			classnames('foo', { 'bar': true })`,
			languageOptions,
		},
	],

	invalid: [
		{
			code: `import classnames from 'classnames';
			classnames('foo', 'btn')`,
			languageOptions,
			errors: [
				{
					message: 'bootstrap 3 class are deprecated',
				},
			],
		},
		{
			code: `import classnames from 'classnames';
			classnames('foo', { 'btn-default': true })`,
			languageOptions,
			errors: [
				{
					message: 'bootstrap 3 class are deprecated',
				},
			],
		},
		{
			code: `<button className="btn-default foo">foo</button>`,
			languageOptions,
			errors: [
				{
					message: 'bootstrap 3 class are deprecated',
				},
			],
		},
	],
});
