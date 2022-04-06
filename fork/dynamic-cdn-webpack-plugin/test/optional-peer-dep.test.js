const path = require('path');

const runWebpack = require('./helpers/run-webpack');
const cleanDir = require('./helpers/clean-dir');

const DynamicCdnWebpackPlugin = require('../src').default;

describe('Optional Peer Dep', () => {
	it('should work', async () => {
		// given
		await cleanDir(path.resolve(__dirname, './fixtures/output/optional-peer-deps'));
		const plugin = new DynamicCdnWebpackPlugin();
		plugin.error = () => {};

		// wheb
		const stats = await runWebpack({
			context: path.resolve(__dirname, './fixtures/optional-peer-deps'),

			output: {
				publicPath: '',
				path: path.resolve(__dirname, './fixtures/output/optional-peer-deps'),
			},

			entry: {
				app: './index.js',
			},

			plugins: [plugin],
		});
		const urlReactRedux = 'https://unpkg.com/react-redux@14.0.3/dist/react-redux.js';
		const urlReactDom = 'https://unpkg.com/react-dom@16.14.0/umd/react-dom.development.js';

		// then
		const files = stats.compilation.chunks.reduce((accu, x) => accu.concat(x.files), []);
		expect(files).toContain('https://unpkg.com/react-dnd@14.0.3/dist/umd/ReactDnD.js');
		expect(files).toContain(urlReactDom);
		expect(files).toContain(urlReactRedux);
		expect(files.indexOf(urlReactRedux)).toBeGreaterThan(files.indexOf(urlReactDom));
	});
});
