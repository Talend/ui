import pluginTester, { prettierFormatter } from 'babel-plugin-tester';
import path from 'path';

import babelPlugin from '.';

pluginTester({
	plugin: babelPlugin,
	pluginName: '@talend/babel-plugin-assets-api',
	fixtures: path.join(__dirname, '..', '__fixtures__'),
	endOfLine: 'preserve',
	formatResult: function customFormatter(code) {
		return prettierFormatter(code, {
			parser: 'babel',
		});
	},
});
