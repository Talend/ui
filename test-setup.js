/* eslint-disable global-require,no-plusplus */
import '@babel/polyfill';
import 'isomorphic-fetch';
import 'raf/polyfill';
import { configure } from 'enzyme';
import dateMock from './mocks/dateMock';

function getMajorVersion() {
	if (!process.env.REACT_VERSION) {
		return '16';
	}
	return process.env.REACT_VERSION.replace('^', '').split('.')[0];
}

const REACT_VERSION = getMajorVersion();

let AdapterReact;
if (REACT_VERSION === '15') {
	AdapterReact = require('enzyme-adapter-react-15');
} else if (REACT_VERSION === '16') {
	AdapterReact = require('enzyme-adapter-react-16');
} else {
	throw new Error(`Unsupported version of React: ${REACT_VERSION}`);
}

configure({ adapter: new AdapterReact() });

// define fetch
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
global.Headers = Headers;
global.localStorage = {
	setItem(key, value) {
		global.localStorage[key] = value;
	},
};

// define Element.closest
if (typeof Element.prototype.matches !== 'function') {
	Element.prototype.matches = function matches(selector) {
		const element = this;
		const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
		let index = 0;

		while (elements[index] && elements[index] !== element) {
			++index;
		}

		return Boolean(elements[index]);
	};
}

Element.prototype.closest = function closest(selector) {
	let element = this;

	while (element && element.nodeType === 1) {
		if (element.matches(selector)) {
			return element;
		}

		element = element.parentNode;
	}

	return null;
};

global.dateMock = dateMock;
