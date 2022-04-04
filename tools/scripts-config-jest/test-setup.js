require('@testing-library/jest-dom');
require('core-js/stable');
require('regenerator-runtime/runtime');
require('raf/polyfill');

const React = require('react');
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

function tMock(key, options) {
	if (typeof options === 'string') {
		return options;
	}
	if (options && options.defaultValue) {
		const getOptionValue = k => (options[k] === undefined ? '' : options[k]);
		return (options.defaultValue || '').replace(/{{\s*(\w+)\s*}}/g, (_, k) => getOptionValue(k));
	}
	return key.split(':').reverse()[0];
}

const i18nextMock = jest.genMockFromModule('i18next');
i18nextMock.t = tMock;
i18nextMock.getFixedT = () => tMock;
i18nextMock.use = () => i18nextMock;
i18nextMock.addResources = () => {};

jest.mock('i18next', () => i18nextMock);

jest.mock('react-i18next', () => {
	// from https://github.com/i18next/react-i18next/blob/master/example/test-jest/__mocks__/react-i18next.js
	const React = require('react');

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
			Component.defaultProps = { ...Component.defaultProps, t: tMock };
			Component.displayName = `withI18nextTranslation(${Component.displayName || Component.name})`;
			return Component;
		},
		useTranslation: () => ({ t: tMock }),
		setI18n: () => {},
		getI18n: () => i18nextMock,
		Trans: ({ children }) =>
			Array.isArray(children) ? renderNodes(children) : renderNodes([children]),
	};
});

try {
	jest.mock('@talend/design-system', () => {
		const Coral = jest.requireActual('@talend/design-system');

		const mocks = {};

		function startsWithUpperCase(name) {
			return name[0] === name[0].toUpperCase();
		}

		function getMock(name) {
			return props => React.createElement(`Coral${name}`, props);
		}

		function registerMock(componentName, variationName) {
			if (variationName) {
				const variationDisplayName = `${componentName}${variationName}`;
				mocks[componentName][variationName] = getMock(variationDisplayName);
				mocks[componentName][variationName].displayName = variationDisplayName;
			} else {
				mocks[componentName] = getMock(componentName);
				mocks[componentName].displayName = componentName;
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
