const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('../src').default;

const runWebpack = require('./helpers/run-webpack');
const cleanDir = require('./helpers/clean-dir');

describe('html-webpack-plugin integration', () => {
	it('should insert scripts in html', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/html-webpack-plugin'));

		// when
		await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '/',
				path: path.resolve(__dirname, './fixtures/output/html-webpack-plugin'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [new HtmlWebpackPlugin(), new DynamicCdnWebpackPlugin()],
		});

		// then
		const indexFile = fs
			.readFileSync(
				path.resolve(__dirname, './fixtures/output/html-webpack-plugin/index.html'),
				{ encoding: 'utf-8' },
			)
			.toString();
		expect(indexFile).toContain('src="/app.js"');
		expect(indexFile).toContain('src="https://unpkg.com/react@15.6.1/dist/react.js"');

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/html-webpack-plugin/app.js'))
			.toString();
		expect(output).not.toContain('THIS IS REACT!');
	});
});
