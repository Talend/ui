import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

import runWebpack from './helpers/run-webpack';
import cleanDir from './helpers/clean-dir';

import DynamicCdnWebpackPlugin from '../src';

describe('core', () => {
	it('should set deps as cdn externals', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/basic'));
		const plugin = new DynamicCdnWebpackPlugin();
		plugin.error = () => {};

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/basic'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [plugin],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(4);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/react@15.6.1/dist/react.js');
		expect(files).toContain('https://unpkg.com/prop-types@15.7.2/prop-types.js');
		expect(files).toContain('https://unpkg.com/react-is@16.13.1/umd/react-is.development.js');

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/basic/app.js'))
			.toString();
		expect(output).not.toContain('THIS IS REACT!');
		expect(output).toContain('module.exports = React');
	});

	it('should use production version', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/env-prod'));
		const plugin = new DynamicCdnWebpackPlugin({
			env: 'production',
		});
		plugin.error = () => {};

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/env-prod'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [plugin],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(4);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/react@15.6.1/dist/react.min.js');
		expect(files).toContain('https://unpkg.com/prop-types@15.7.2/prop-types.min.js');
		expect(files).toContain(
			'https://unpkg.com/react-is@16.13.1/umd/react-is.production.min.js',
		);

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/env-prod/app.js'))
			.toString();
		expect(output).not.toContain('THIS IS REACT!');
	});

	it('should work with mode=production', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/node-env-prod'));
		const plugin = new DynamicCdnWebpackPlugin();

		// when
		const stats = await runWebpack({
			mode: 'production',

			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/node-env-prod'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [plugin],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(4);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/react@15.6.1/dist/react.min.js');
		expect(files).toContain('https://unpkg.com/prop-types@15.7.2/prop-types.min.js');
		expect(files).toContain(
			'https://unpkg.com/react-is@16.13.1/umd/react-is.production.min.js',
		);

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/node-env-prod/app.js'))
			.toString();
		expect(output).not.toContain('THIS IS REACT!');
	});

	it('should with with nested dependencies', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/nested-dependencies'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/nested-dependencies'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/nested-dependencies'),
			},

			entry: {
				app: './index.js',
			},

			plugins: [new DynamicCdnWebpackPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toEqual(['app.js']);
	});

	it('should work with duplicate-dependencies', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/duplicate-dependencies'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/duplicate-dependencies'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/duplicate-dependencies'),
				globalObject: 'this',
			},
			devtool: 'cheap-module-source-map',
			entry: {
				app: './index.js',
			},

			plugins: [new DynamicCdnWebpackPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toEqual([
			'app.js',
			'app.js.map',
			'https://unpkg.com/hoist-non-react-statics@2.5.3/dist/hoist-non-react-statics.min.js',
			'https://unpkg.com/react-bootstrap@0.34.0/dist/react-bootstrap.js',
			'https://unpkg.com/react-ace@3.0.0/dist/react-ace.js',
			'https://unpkg.com/react-autowhatever@6.0.0/dist/standalone/autowhatever.js',
		]);

		const output = fs
			.readFileSync(
				path.resolve(__dirname, './fixtures/output/duplicate-dependencies/app.js'),
			)
			.toString();
		expect(output).toContain('module.exports = ReactAce;');
		expect(output).toContain('module.exports = Autowhatever;');
		expect(output).toContain('embed:react-bootstrap@0.18.0'); // duplicate, embedded
		expect(output).not.toContain('embed:react-bootstrap@0.34.0'); // from cdn
	});

	it('should load peerDependencies', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/peer-dependencies'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/peer-dependencies'),
			},

			entry: {
				app: './peer-dependencies.js',
			},

			plugins: [new DynamicCdnWebpackPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(4);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/@angular/core@4.2.4/bundles/core.umd.js');
		expect(files).toContain('https://unpkg.com/rxjs@5.4.1/bundles/Rx.js');
		expect(files).toContain('https://unpkg.com/zone.js@0.8.12/dist/zone.js');
	});

	it('should load module without export', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/no-export'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/no-export'),
			},

			entry: {
				app: './no-export.js',
			},

			plugins: [new DynamicCdnWebpackPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(3);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/@babel/polyfill@7.0.0/dist/polyfill.js');
	});

	it('should exclude some modules', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/exclude'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/exclude'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [
				new DynamicCdnWebpackPlugin({
					exclude: ['react'],
				}),
			],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(1);
		expect(files).toContain('app.js');
		expect(files).not.toContain('https://unpkg.com/react@15.6.1/dist/react.js');

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/exclude/app.js'))
			.toString();
		expect(output).toContain('THIS IS REACT!');
	});

	it('should only include some modules', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/only'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/only'),
			},

			entry: {
				app: './multiple.js',
			},

			plugins: [
				new DynamicCdnWebpackPlugin({
					only: ['react'],
				}),
			],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(2);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/react@15.6.1/dist/react.js');
		expect(files).not.toContain('https://unpkg.com/babel-polyfill@6.23.0/dist/polyfill.js');
		expect(files).not.toContain('https://unpkg.com/react-dom@15.6.1/dist/react-dom.js');

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/only/app.js'))
			.toString();
		expect(output).toContain('THIS IS REACT DOM!');
		expect(output).toContain('THIS IS BABEL POLYFILL!');
	});

	it("should throw errors when using 'only' and 'exclude' together", async () => {
		await cleanDir(path.resolve(__dirname, './fixtures/output/error'));

		expect(() =>
			runWebpack({
				context: path.resolve(__dirname, './fixtures/app'),

				output: {
					publicPath: '',
					path: path.resolve(__dirname, './fixtures/output/error'),
				},

				entry: {
					app: './single.js',
				},

				plugins: [
					new DynamicCdnWebpackPlugin({
						exclude: ['react'],
						only: ['react'],
					}),
				],
			}),
		).toThrow("You can't use 'exclude' and 'only' at the same time");
	});

	it('should use loglevel options to output which modules are loaded from CDN / which are bundled', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/verbose'));

		const logs = [];

		const originalLog = console.log;
		const plugin = new DynamicCdnWebpackPlugin({
			loglevel: 'DEBUG',
		});
		console.log = (...log) => {
			logs.push(...log);
		};

		plugin.log = (...log) => {
			logs.push(...log);
		};

		plugin.debug = (...log) => {
			logs.push(...log);
		};

		// when
		await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/verbose'),
			},

			entry: {
				app: './mix.js',
			},

			plugins: [plugin],
		});

		// then
		expect(logs).toContain('will be served by https://unpkg.com/react@15.6.1/dist/react.js');
		expect(logs).toContain(
			"couldn't be found, if you want it you can add it to your resolver.",
		);

		console.log = originalLog;
	});

	it('should require files without extension', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/require-file'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/require-file'),
			},

			entry: {
				app: './require-file.js',
			},

			plugins: [new DynamicCdnWebpackPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(1);
		expect(files).toContain('app.js');
		expect(files).not.toContain('https://unpkg.com/react@15.6.1/dist/react.js');
	});

	it('async loading', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/async'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/async'),
			},

			entry: {
				app: './async.js',
			},

			plugins: [new DynamicCdnWebpackPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/react@15.6.1/dist/react.js');
		expect(
			files
				.filter(x => !x.startsWith('https://unpkg.com'))
				.some(fileName =>
					fs
						.readFileSync(
							path.resolve(__dirname, `./fixtures/output/async/${fileName}`),
						)
						.toString()
						.includes('THIS IS REACT!'),
				),
		).toBe(false);
	});

	it('when using multiple versions of a module, make sure the right version is used for each', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/multiple-versions'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/multiple-versions'),
			},

			entry: {
				app: './mix.js',
			},

			plugins: [new DynamicCdnWebpackPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/react@15.6.1/dist/react.js');

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/multiple-versions/app.js'))
			.toString();

		expect(output.match(/module\.exports =/g).length).toBe(1);

		expect(output).toContain('THIS IS REACT@0.14.9!');
		expect(output).not.toContain('THIS IS REACT!');
	});

	it('should use a custom resolver', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/custom-resolver'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/custom-resolver'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [
				new DynamicCdnWebpackPlugin({
					resolver: () => {
						return {
							var: 'CustomReact',
							name: 'react',
							url: 'https://my-cdn.com/react.js',
							version: '15.0.0',
							path: '/dist/react.js',
						};
					},
				}),
			],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toContain('app.js');
		expect(files).toContain('https://my-cdn.com/react.js');

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/custom-resolver/app.js'))
			.toString();
		expect(output).toContain('module.exports = CustomReact');
		expect(output).not.toContain('THIS IS REACT!');
	});

	it('should not load from cdn when one peerDependency fails', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/failing-peer-dependency'));
		const plugin = new DynamicCdnWebpackPlugin({
			resolver: name => {
				return {
					'@angular/core': {
						var: 'ng',
						name: 'angular',
						url: 'https://unpkg.com/@angular/core@4.2.4/bundles/core.umd.js',
						version: '4.2.4',
						path: '/bundles/core.umd.js',
					},
					rxjs: {
						var: 'Rx',
						name: 'rxjs',
						url: 'https://unpkg.com/rxjs@5.4.1/bundles/Rx.js',
						version: '5.4.1',
						path: '/bundles/Rx.js',
					},
				}[name];
			},
		});
		plugin.error = () => {};

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/failing-peer-dependency'),
			},

			entry: {
				app: './peer-dependencies.js',
			},

			plugins: [plugin],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(2);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/rxjs@5.4.1/bundles/Rx.js');
		expect(files).not.toContain('https://unpkg.com/@angular/core@4.2.4/bundles/core.umd.js');
		expect(files).not.toContain('https://unpkg.com/zone.js@0.8.12/dist/zone.js');

		const output = fs
			.readFileSync(
				path.resolve(__dirname, './fixtures/output/failing-peer-dependency/app.js'),
			)
			.toString();
		expect(output).toContain('THIS IS ANGULAR!');
	});

	it('should work when resolver returns a Promise', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/custom-resolver'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/custom-resolver'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [
				new DynamicCdnWebpackPlugin({
					resolver: () =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve({
									var: 'CustomReact',
									name: 'react',
									url: 'https://my-cdn.com/react.js',
									version: '15.0.0',
									path: '/dist/react.js',
								});
							}, 200);
						}),
				}),
			],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toContain('app.js');
		expect(files).toContain('https://my-cdn.com/react.js');

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/custom-resolver/app.js'))
			.toString();
		expect(output).toContain('module.exports = CustomReact');
		expect(output).not.toContain('THIS IS REACT!');
	});

	it('should use NamedModulesPlugin', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/named-modules'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/named-modules'),
			},

			entry: {
				app: './single.js',
			},

			plugins: [new DynamicCdnWebpackPlugin(), new webpack.NamedModulesPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(4);
		expect(files).toContain('app.js');
		expect(files).toContain('https://unpkg.com/react@15.6.1/dist/react.js');
		expect(files).toContain('https://unpkg.com/prop-types@15.7.2/prop-types.js');
		expect(files).toContain('https://unpkg.com/react-is@16.13.1/umd/react-is.development.js');

		const output = fs
			.readFileSync(path.resolve(__dirname, './fixtures/output/named-modules/app.js'))
			.toString();
		expect(output).not.toContain('__webpack_require__(undefined)');
		expect(output).toContain('__webpack_require__(/*! react */ \\"react\\")');
	});

	it('should When module contains a submodule', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/submodule'));

		// when
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/app'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/submodule'),
			},

			entry: {
				app: './submodule.js',
			},

			plugins: [new DynamicCdnWebpackPlugin()],
		});

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toHaveLength(1);
		expect(files).toContain('app.js');
	});
});
