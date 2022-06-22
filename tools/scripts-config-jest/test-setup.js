require('@testing-library/jest-dom');
require('core-js/stable');
require('regenerator-runtime/runtime');
require('raf/polyfill');

// enzyme adapter configuration
let React;
try {
	React = require('react');
} catch (e) {}

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

jest.mock('i18next', () => {
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
			Component.displayName = `withI18nextTranslation(${Component.displayName || Component.name})`;
			return Component;
		},
		useTranslation: () => ({ t: i18next.t }),
		setI18n: () => {},
		getI18n: () => i18next,
		Trans: ({ children }) =>
			Array.isArray(children) ? renderNodes(children) : renderNodes([children]),
	};
});

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
			function Component(props) {
				return React.createElement('span', {
					...props,
					className: classnames(mockName, props.className),
				});
			}
			Component.displayName = name;
			Component.propTypes = {
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
