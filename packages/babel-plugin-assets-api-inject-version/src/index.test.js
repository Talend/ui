import pluginTester from 'babel-plugin-tester';
import path from 'path';
import babelPlugin from '.';

pluginTester({
	plugin: babelPlugin,
	pluginName: '@talend/babel-plugin-assets-api',
	fixtures: path.join(__dirname, '..', '__fixtures__'),
});
