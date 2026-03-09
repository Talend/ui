/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @fileoverview Check if the import depth let your code be UMD build compliant
 * @author Jean-Michel FRANCOIS
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../src/rules/import-depth');
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
describe('talend-import-depth', () => {
	const ruleTester = new RuleTester();
	ruleTester.run('talend-import-depth', rule, {
		valid: [
			{
				code: "import List from '@talend/react-components/lib/List';",
				languageOptions,
			},
			{
				code: "import SidePanel from '@talend/react-components/lib/SidePanel';",
				languageOptions,
			},
			{
				code: "import { SidePanel } from '@talend/react-components';",
				languageOptions,
			},
			{
				code: "import cmf, { cmfConnect } from '@talend/react-cmf';",
				languageOptions,
			},
			{
				code: "import stepper from '@talend/react-faceted-search';",
				languageOptions,
			},
			{
				code: "import pendo from '@talend/ua/lib/pendo';",
				languageOptions,
			},
		],

		invalid: [
			{
				code: "import ListComposition from '@talend/react-components/lib/List/ListComposition';",
				languageOptions,
				errors: [
					{
						message:
							"'@talend/react-components/lib/List/ListComposition' import too deep. No more than @talend/react-components/lib/List",
					},
				],
			},
			{
				code: "import match from '@talend/react-cmf/lib/matchPath';",
				languageOptions,
				errors: [
					{
						message:
							"'@talend/react-cmf/lib/matchPath' import too deep. No more than @talend/react-cmf",
					},
				],
			},
			{
				code: "import { I18N_DOMAIN_FORMS } from '@talend/react-forms/lib/UIForm';",
				languageOptions,
				errors: [
					{
						message:
							"'@talend/react-forms/lib/UIForm' import too deep. No more than @talend/react-forms",
					},
				],
			},
		],
	});
});
