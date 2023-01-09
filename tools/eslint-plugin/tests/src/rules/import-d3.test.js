/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @fileoverview Check if the import of d3 is not on d3-*
 * @author Jean-Michel FRANCOIS
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../src/rules/import-d3');
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
ruleTester.run('talend-import-d3', rule, {
	valid: [
		{
			code: "import { shape } from 'd3';",
			parser,
			parserOptions,
		},
		{
			code: "import foo from 'd3-some-extra';",
			parser,
			parserOptions,
		},
		{
			code: "import foo from 'd3-shape-extra';",
			parser,
			parserOptions,
		},
	],

	invalid: [
		{
			code: "import {shape} from 'd3-shape';",
			parser,
			parserOptions,
			errors: [
				{
					message: "'d3-shape' import detected. You should use d3 main package to be cdn compliant",
					type: 'ImportDeclaration',
				},
			],
		},
	],
});
