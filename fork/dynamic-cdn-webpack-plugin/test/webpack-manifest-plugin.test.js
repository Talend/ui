import path from 'path';
import fs from 'fs';

import ManifestPlugin from 'webpack-manifest-plugin';

import DynamicCdnWebpackPlugin from '../src';

import runWebpack from './helpers/run-webpack';
import cleanDir from './helpers/clean-dir';

describe('webpack-manifest-plugin integration', () => {
	it('should output cdn files in manifest', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/webpack-manifest-plugin'));

		// when
		await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/webpack-manifest-plugin'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [
				new ManifestPlugin({
					fileName: 'manifest.json',
				}),
				new DynamicCdnWebpackPlugin(),
			],
		});

		// then
		const manifest = JSON.parse(
			fs.readFileSync(
				path.resolve(__dirname, './fixtures/output/webpack-manifest-plugin/manifest.json'),
			),
		);
		expect(manifest).toEqual({
			'app.js': 'app.js',
			'prop-types.js': 'https://unpkg.com/prop-types@15.7.2/prop-types.js',
			'react-is.js': 'https://unpkg.com/react-is@16.13.1/umd/react-is.development.js',
			'react.js': 'https://unpkg.com/react@15.6.1/dist/react.js',
		});

		const output = fs
			.readFileSync(
				path.resolve(__dirname, './fixtures/output/webpack-manifest-plugin/app.js'),
			)
			.toString();
		expect(output).not.toContain('THIS IS REACT!');
	});
});
