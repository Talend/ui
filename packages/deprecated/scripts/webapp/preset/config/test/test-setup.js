require('@babel/polyfill');
require('core-js/shim');
require('raf/polyfill');
const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

// Mock fetch
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

// Mock session storage
delete window.sessionStorage;
Object.defineProperty(window, 'sessionStorage', {
	value: (function() {
		let store = {};
		return {
			getItem(key) {
				return store[key] || null;
			},
			setItem(key, value) {
				store[key] = value.toString();
			},
			removeItem(key) {
				delete store[key];
			},
			clear() {
				store = {};
			},
		};
	})(),
	writable: true,
});
