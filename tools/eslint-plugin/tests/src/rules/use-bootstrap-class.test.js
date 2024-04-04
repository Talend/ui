/**
 * @fileoverview Check if the import of d3 is not on d3-*
 * @author Jean-Michel FRANCOIS
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../src/rules/use-bootstrap-class');
const RuleTester = require('eslint').RuleTester;
const parser = require.resolve('@babel/eslint-parser');
const parserOptions = {
	babelOptions: {
		configFile: require.resolve('@talend/scripts-config-babel'),
	},
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

describe('test', () => {});
const ruleTester = new RuleTester();
ruleTester.run('talend-use-bootstrap-class', rule, {
	valid: [
		{
			code: `import classnames from 'classnames';
			classnames('foo', { 'bar': true })`,
			parser,
			parserOptions,
		},
	],

	invalid: [
		{
			code: `import classnames from 'classnames';
			classnames('foo', 'btn')`,
			parser,
			parserOptions,
			errors: [
				{
					message: 'bootstrap 3 class are deprecated',
				},
			],
		},
		{
			code: `import classnames from 'classnames';
			classnames('foo', { 'btn-default': true })`,
			parser,
			parserOptions,
			errors: [
				{
					message: 'bootstrap 3 class are deprecated',
				},
			],
		},
		{
			code: `<button className="btn-default foo">foo</button>`,
			parser,
			parserOptions,
			errors: [
				{
					message: 'bootstrap 3 class are deprecated',
				},
			],
		},
	],
});
