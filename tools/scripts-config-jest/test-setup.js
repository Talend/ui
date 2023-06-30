/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty */
/* eslint-disable import/no-extraneous-dependencies */
require('@testing-library/jest-dom');
require('core-js/stable');
require('regenerator-runtime/runtime');
require('raf/polyfill');
const jestAxe = require('jest-axe');
jest.mock('ally.js');

expect.extend(jestAxe.toHaveNoViolations);
// add missing ResizeObserver
class ResizeObserver {
	observe() {
		// do nothing
	}

	unobserve() {
		// do nothing
	}

	disconnect() {
		// do nothing
	}
}
if (!global.self.ResizeObserver) {
	// add this for react-resize-detector major update
	global.self.ResizeObserver = ResizeObserver;
}

if (!global.self.TextEncoder) {
	// add this for whatwg-url use in jsdom
	global.self.TextEncoder = require('util').TextEncoder;
	global.self.TextDecoder = require('util').TextDecoder;
}
// enzyme adapter configuration
let React;
try {
	React = require('react');
} catch (e) {}

try {
	const version = React && React.version;
	if (version && version.startsWith('16.')) {
		const configure = require('enzyme').configure;
		const Adapter = require('enzyme-adapter-react-16');
		configure({ adapter: new Adapter() });
	} else if (version && version.startsWith('17.')) {
		const configure = require('enzyme').configure;
		const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
		configure({ adapter: new Adapter() });
	}
} catch (e) {}

// Mock fetch
try {
	const fetch = jest.fn(
		(url, config) =>
			new Promise(resolve => {
				if (config.response) {
					return resolve(config.response);
				}
				return resolve();
			}),
	);
	global.self.fetch = fetch;
} catch (e) {}

try {
	Object.defineProperty(global.self, 'crypto', {
		value: {
			randomUUID: () => '42',
		},
	});
} catch (e) {
	console.error(e);
}

try {
	Object.defineProperty(global.self, 'crypto', {
		value: {
			randomUUID: () => '42',
		},
	});
} catch (e) {
	console.error(e);
}

try {
	// Mock session storage
	delete window.sessionStorage;
	Object.defineProperty(window, 'sessionStorage', {
		value: (function () {
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
} catch (e) {}

try {
	jest.mock('i18next', () => {
		function tMock(key, options) {
			if (typeof options === 'string') {
				return options;
			}
			if (options && options.defaultValue) {
				const getOptionValue = k => (options[k] === undefined ? '' : options[k]);
				return (options.defaultValue || '').replace(/{{\s*(\w+)\s*}}/g, (_, k) =>
					getOptionValue(k),
				);
			}
			return key.split(':').reverse()[0];
		}
		const i18nextMock = jest.genMockFromModule('i18next');
		i18nextMock.t = tMock;
		i18nextMock.language = 'en';
		i18nextMock.getFixedT = () => tMock;
		i18nextMock.use = () => i18nextMock;
		i18nextMock.addResources = () => {};
		return i18nextMock;
	});

	jest.mock('react-i18next', () => {
		// from https://github.com/i18next/react-i18next/blob/master/example/test-jest/__mocks__/react-i18next.js
		const React = require('react');
		const i18next = require('i18next');

		const hasChildren = node => node && (node.children || (node.props && node.props.children));

		const getChildren = node =>
			node && node.children ? node.children : node.props && node.props.children;

		const renderNodes = reactNodes => {
			if (typeof reactNodes === 'string') {
				return reactNodes;
			}

			return Object.keys(reactNodes).map((key, i) => {
				const child = reactNodes[key];
				const isElement = React.isValidElement(child);

				if (typeof child === 'string') {
					return child;
				}
				if (hasChildren(child)) {
					const inner = renderNodes(getChildren(child));
					return React.cloneElement(child, { ...child.props, key: i }, inner);
				}
				if (typeof child === 'object' && !isElement) {
					return Object.keys(child).reduce((str, childKey) => `${str}${child[childKey]}`, '');
				}

				return child;
			});
		};
		// this mock makes sure any components using the translate HoC receive the t function as a prop
		return {
			withTranslation: () => Component => {
				Component.defaultProps = { ...Component.defaultProps, t: i18next.t };
				Component.displayName = `withI18nextTranslation(${
					Component.displayName || Component.name
				})`;
				return Component;
			},
			useTranslation: () => ({ t: i18next.t }),
			setI18n: () => {},
			getI18n: () => i18next,
			Trans: ({ children }) =>
				Array.isArray(children) ? renderNodes(children) : renderNodes([children]),
		};
	});
} catch (e) {}

try {
	jest.mock('@talend/design-system', () => {
		const React = jest.requireActual('react');
		const Coral = jest.requireActual('@talend/design-system');
		const propTypes = jest.requireActual('prop-types');
		const classnames = jest.requireActual('classnames');

		const mocks = {};

		function startsWithUpperCase(name) {
			return name[0] === name[0].toUpperCase();
		}

		function getMock(name) {
			const mockName = `Coral${name}`;
			function Component({ disclosure, children, ...props }) {
				return React.createElement(
					'span',
					{
						...props,
						className: classnames(mockName, props.className),
					},
					disclosure,
					children,
				);
			}
			Component.displayName = name;
			Component.propTypes = {
				disclosure: propTypes.element,
				children: propTypes.element,
				className: propTypes.string,
			};
			return Component;
		}

		function registerMock(componentName, variationName) {
			if (variationName) {
				const variationDisplayName = `${componentName}${variationName}`;
				mocks[componentName][variationName] = getMock(variationDisplayName);
			} else {
				mocks[componentName] = getMock(componentName);
			}
		}

		Object.keys(Coral)
			.filter(startsWithUpperCase)
			.forEach(name => {
				registerMock(name);
				Object.keys(Coral[name])
					.filter(startsWithUpperCase)
					.forEach(variation => registerMock(name, variation));
			});

		return mocks;
	});
} catch {}

try {
	// in the case we unmock design-system we don't want id to be random
	jest.mock('reakit/lib/Id/IdProvider', () => ({
		...jest.requireActual('reakit/lib/Id/IdProvider'),
		unstable_IdContext: jest.requireActual('react').createContext(() => 'id-42'),
	}));
} catch {}

// @floating-ui/react
// https://github.com/floating-ui/floating-ui/issues/1908
// eslint-disable-next-line no-promise-executor-return
afterAll(() => new Promise(resolve => setTimeout(resolve, 0)));
