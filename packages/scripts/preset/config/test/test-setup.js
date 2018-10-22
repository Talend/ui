require('babel-polyfill');
require('raf/polyfill');
const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

const fetch = jest.fn(
	(url, config) =>
		new Promise(resolve => {
			if (config.response) {
				return resolve(config.response);
			}
			return resolve();
		}),
);
global.fetch = fetch;
