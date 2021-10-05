export default function mockTranslations() {
	const React = require('react');

	const useMock = [k => k, {}];
	useMock.t = (key, options) =>
		(options.defaultValue || '').replace(/{{(\w+)}}/g, (_, k) => options[k]);
	useMock.i18n = {};

	// from https://github.com/i18next/react-i18next/blob/master/example/test-jest/__mocks__/react-i18next.js

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
	return {
		// this mock makes sure any components using the translate HoC receive the t function as a prop
		withTranslation: () => Component => {
			Component.defaultProps = {
				...Component.defaultProps,
				t: (key, options) =>
					(options.defaultValue || '').replace(/{{(\w+)}}/g, (_, k) => options[k]),
			};
			Component.displayName = `withI18nextTranslation(${Component.displayName || Component.name})`;
			return Component;
		},
		useTranslation: () => useMock,
		setI18n: () => {},
		getI18n: () => ({
			t: (key, options) => (options.defaultValue || '').replace(/{{(\w+)}}/g, (_, k) => options[k]),
		}),
		Trans: ({ children }) => renderNodes(children),
	};
}
