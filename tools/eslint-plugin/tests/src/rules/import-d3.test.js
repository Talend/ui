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
const parser = require('@typescript-eslint/parser');
const languageOptions = {
	parser,
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
};

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('talend-import-d3', rule, {
	valid: [
		{
			code: "import { shape } from 'd3';",
			languageOptions,
		},
		{
			code: "import foo from 'd3-some-extra';",
			languageOptions,
		},
		{
			code: "import foo from 'd3-shape-extra';",
			languageOptions,
		},
	],

	invalid: [
		{
			code: "import {shape} from 'd3-shape';",
			languageOptions,
			errors: [
				{
					message: "'d3-shape' import detected. You should use d3 main package to be cdn compliant",
					type: 'ImportDeclaration',
				},
			],
		},
	],
});
