// /* eslint-disable global-require,no-plusplus */
// import '@babel/polyfill';
// import 'isomorphic-fetch';
// import 'raf/polyfill';
// import { Headers } from 'node-fetch';
// import { configure } from 'enzyme';
// import dateMock from './mocks/dateMock';

import i18n from 'i18next';
import reactI18n from 'react-i18next';

/**
 * lets mock i18next for all tests
 */
// jest.mock('i18next', () => {
// 	const noop = () => {};
// 	const i18n = {
// 		t: (msg, options) => {
// 			let buff = options.defaultValue || msg;
// 			const split = buff.split('}}');
// 			if (split.length > 1) {
// 				buff = split.reduce((acc, current) => {
// 					const sub = current.split('{{');
// 					let value = sub.length > 1 ? options[sub[1].trim()] : '';
// 					if (value === undefined) {
// 						value = '';
// 					}
// 					return `${acc}${sub[0]}${value}`;
// 				}, '');
// 			}
// 			return buff;
// 		},
// 		isMock: true,
// 		getFixedT: () => i18n.t,
// 		options: {},
// 		language: 'en',
// 		languages: ['en'],
// 		isInitialized: true,
// 		init: noop,
// 		on: noop,
// 		off: noop,
// 		loadNamespaces: noop,
// 		hasResourceBundle: () => false,
// 		services: {
// 			resourceStore: {
// 				data: {},
// 			},
// 			backendConnector: {},
// 		},
// 		store: {
// 			data: {},
// 			on: noop,
// 			off: noop,
// 		},
// 		changeLanguage: noop,
// 	};
// 	i18n.createInstance = () => i18n;
// 	return i18n;
// });

// jest.mock('react-i18next', () => {
// 	const mock = jest.genMockFromModule('react-i18next');
// 	mock.useTranslation = () => ({
// 		t: (key, options) => {
// 			let buff = options.defaultValue || key;
// 			const split = buff.split('}}');
// 			if (split.length > 1) {
// 				buff = split.reduce((acc, current) => {
// 					const sub = current.split('{{');
// 					let value = sub.length > 1 ? options[sub[1].trim()] : '';
// 					if (value === undefined) {
// 						value = '';
// 					}
// 					return `${acc}${sub[0]}${value}`;
// 				}, '');
// 			}
// 			return buff;
// 		},
// 	});

// 	return mock;
// });
i18n.t = (key, options) => {
	let buff = options.defaultValue || key;
	const split = buff.split('}}');
	if (split.length > 1) {
		buff = split.reduce((acc, current) => {
			const sub = current.split('{{');
			let value = sub.length > 1 ? options[sub[1].trim()] : '';
			if (value === undefined) {
				value = '';
			}
			return `${acc}${sub[0]}${value}`;
		}, '');
	}
	return buff;
};
reactI18n.useTranslation = () => ({ t: i18n.t });

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
