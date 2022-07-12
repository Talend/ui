/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const getWebpackConfiguration = require('../');

const runWebpack = require('./helpers/run-webpack');
const cleanDir = require('./helpers/clean-dir');
function getChunkFiles(stats) {
	return Array.from(stats.compilation.chunks).reduce(
		(files, x) => files.concat(Array.from(x.files)),
		[],
	);
}

describe('webpack config', () => {
	it('should expose a function which return a webpack config', () => {
		expect(typeof getWebpackConfiguration).toBe('function');
		const config = getWebpackConfiguration();
		expect(config).toMatchObject({
			resolve: {
				alias: { fs: false },
			},
		});
		// no webpack 4 config
		expect(config).not.toMatchObject({
			node: {
				fs: 'empty',
			},
		});
	});
	it('should build basic angular app', async () => {
		const cwd = path.resolve(__dirname, './fixtures/app');
		await cleanDir(path.resolve(__dirname, './fixtures/output/basic'));
		const config = {
			context: cwd,
			...getWebpackConfiguration(),
			output: {
				publicPath: '',
				filename: 'app.js',
				chunkFilename: '[name]-[hash].js',
				path: path.resolve(__dirname, './fixtures/output/basic'),
			},

			entry: {
				app: './index.js',
			},
		};
		const stats = await runWebpack(config);
		const files = getChunkFiles(stats);
		expect(files).toHaveLength(1);
		expect(files).toContain('app.js');
		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/basic/app.js'))
			.toString();
		// check angular mock module is imported
		expect(output).toContain('THIS IS ANGULAR');
		// check html template is loaded
		expect(output).toContain('Hello foo !');
	});
});
