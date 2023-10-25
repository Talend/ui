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
const parser = require.resolve('@babel/eslint-parser');
const parserOptions = {
	babelOptions: {
		configFile: require.resolve('@talend/scripts-config-babel'),
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
				parser,
				parserOptions,
			},
			{
				code: "import SidePanel from '@talend/react-components/lib/SidePanel';",
				parser,
				parserOptions,
			},
			{
				code: "import { SidePanel } from '@talend/react-components';",
				parser,
				parserOptions,
			},
			{
				code: "import cmf, { cmfConnect } from '@talend/react-cmf';",
				parser,
				parserOptions,
			},
			{
				code: "import stepper from '@talend/react-faceted-search';",
				parser,
				parserOptions,
			},
			{
				code: "import pendo from '@talend/ua/lib/pendo';",
				parser,
				parserOptions,
			},
		],

		invalid: [
			{
				code: "import ListComposition from '@talend/react-components/lib/List/ListComposition';",
				parser,
				parserOptions,
				errors: [
					{
						message:
							"'@talend/react-components/lib/List/ListComposition' import too deep. No more than @talend/react-components/lib/List",
						type: 'ImportDeclaration',
					},
				],
			},
			{
				code: "import match from '@talend/react-cmf/lib/matchPath';",
				parser,
				parserOptions,
				errors: [
					{
						message:
							"'@talend/react-cmf/lib/matchPath' import too deep. No more than @talend/react-cmf",
						type: 'ImportDeclaration',
					},
				],
			},
			{
				code: "import { I18N_DOMAIN_FORMS } from '@talend/react-forms/lib/UIForm';",
				parser,
				parserOptions,
				errors: [
					{
						message:
							"'@talend/react-forms/lib/UIForm' import too deep. No more than @talend/react-forms",
						type: 'ImportDeclaration',
					},
				],
			},
		],
	});
});
