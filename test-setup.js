// /* eslint-disable global-require,no-plusplus */
import 'mutationobserver-shim';

// import '@babel/polyfill';
// import 'isomorphic-fetch';
// import 'raf/polyfill';
// import { Headers } from 'node-fetch';
// import { configure } from 'enzyme';
// import dateMock from './mocks/dateMock';

// // define fetch
// const fetch = jest.fn(
// 	(url, config) =>
// 		new Promise(resolve => {
// 			if (config.response) {
// 				return resolve(config.response);
// 			}
// 			return resolve();
// 		}),
// );
// global.fetch = fetch;
// global.Headers = Headers;
// global.localStorage = {
// 	setItem(key, value) {
// 		global.localStorage[key] = value;
// 	},
// };

// // define Element.closest
// if (typeof Element.prototype.matches !== 'function') {
// 	Element.prototype.matches = function matches(selector) {
// 		const element = this;
// 		const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
// 		let index = 0;

// 		while (elements[index] && elements[index] !== element) {
// 			++index;
// 		}

// 		return Boolean(elements[index]);
// 	};
// }

// Element.prototype.closest = function closest(selector) {
// 	let element = this;

// 	while (element && element.nodeType === 1) {
// 		if (element.matches(selector)) {
// 			return element;
// 		}

// 		element = element.parentNode;
// 	}

// 	return null;
// };

// global.dateMock = dateMock;
