const pluginTester = require('babel-plugin-tester').default;
const babelPlugin = require('.');

pluginTester({
	plugin: babelPlugin,
	pluginName: '@talend/babel-plugin-import-scss',
	title: 'default',
	tests: [
		{
			code: `
			import theme from './MyComponent.module.scss';`,
			output: `
			import theme from './MyComponent.module.css';`,
		},
		{
			code: `
			import './MyComponent.scss';`,
			output: `
			import './MyComponent.css';`,
		},
	],
});
