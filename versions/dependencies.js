#!/usr/bin/env node
/* eslint no-console: 0 */

const REACT_VERSION = process.env.REACT_VERSION || '^16.8.6';
console.log('REACT_VERSION: ', REACT_VERSION);
const JEST_VERSION = '^24.7.1';

module.exports = {
	// addons
	'babel-polyfill': '^6.26.0',
	'focus-outline-manager': '^1.0.2',
	'normalize.css': '5.0.0',
	'path-to-regexp': '^2.0.0',
	'react-addons-perf': '^15.4.2',
	'react-tap-event-plugin': '^2.0.0',
	'whatwg-fetch': '^2.0.3',

	// UI deps outside of the release life cycle
	'@talend/scripts': '^0.16.1',
	'@talend/react-cmf-router': '^3.2.1',

	// deps: non component libs
	ajv: '^6.2.1',
	'bootstrap-sass': '3.4.1',
	'bson-objectid': '^1.1.5',
	classnames: '^2.2.5',
	'date-fns': '^1.27.2',
	keycode: '^2.2.0',
	'hoist-non-react-statics': '2.5.5',
	immutable: '^3.8.1',
	immutablediff: '^0.4.4',
	invariant: '^2.2.2',
	lodash: '^4.17.4',
	'prop-types': '^15.5.10',
	react: REACT_VERSION,
	'react-dom': REACT_VERSION,
	'react-immutable-proptypes': '^2.1.0',
	i18next: '^15.1.3',
	'i18next-parser': '^0.13.0',
	'react-i18next': '^10.10.0',
	'react-redux': '^5.0.7',
	'react-router': '^3.2.0',
	'react-router-redux': '^4.0.8',
	'react-test-renderer': REACT_VERSION,
	'react-transition-group': '^2.3.1',
	redux: '^3.7.2',
	'redux-batched-actions': '^0.2.0',
	'redux-batched-subscribe': '^0.1.6',
	'redux-logger': '^3.0.6',
	'redux-mock-store': '^1.2.3',
	'redux-saga': '^0.15.4',
	'redux-thunk': '^2.2.0',
	'redux-undo': 'beta',
	reselect: '^2.5.4',
	slugify: '^1.1.0',
	uuid: '^3.0.1', // prefer bson-objectid
	tv4: '^1.3.0',

	// deps: libs that interact with the DOM
	'd3-shape': '1.2.0',
	'react-ace': '6.2.0',
	'react-bootstrap': '0.32.4',
	'rc-slider': '8.6.3',
	'rc-tooltip': '3.7.3',
	'react-autowhatever': '10.2.0',
	'react-debounce-input': '3.2.0',
	'react-jsonschema-form': '0.51.0',
	'react-virtualized': '9.21.0',

	// script dep
	deepmerge: '^1.5.1',

	// dev deps
	'@storybook/react': '^4.0.12',
	'@storybook/addon-a11y': '^4.0.12',
	'@storybook/addon-storyshots': '^4.0.12',
	'@storybook/addon-actions': '^4.0.12',
	'@storybook/addon-info': '^4.0.12',
	'@storybook/addon-knobs': '^4.0.12',
	'@storybook/addons': '^4.0.12',
	autoprefixer: '^7.1.4',
	'babel-eslint': '^10.0.1',
	'babel-jest': JEST_VERSION,
	// babel 7
	'@babel/cli': '^7.2.0',
	'@babel/core': '^7.2.0',
	'@babel/plugin-proposal-class-properties': '^7.2.0',
	'@babel/plugin-proposal-object-rest-spread': '^7.2.0',
	'@babel/plugin-transform-object-assign': '^7.2.0',
	'@babel/plugin-proposal-export-namespace-from': '^7.2.0',
	'@babel/plugin-proposal-export-default-from': '^7.2.0',
	'@babel/preset-env': '^7.2.0',
	'@babel/preset-react': '^7.0.0',
	cpx: '^1.5.0',
	enzyme: '^3.9.0',
	'enzyme-adapter-react-15': '^1.3.1',
	'enzyme-adapter-react-16': '^1.11.2',
	'enzyme-to-json': '^3.3.5',
	eslint: '^4.0.0',
	'eslint-config-airbnb': '^11.1.0',
	'eslint-plugin-import': '^1.16.0',
	'eslint-plugin-jsx-a11y': '^2.2.2',
	'eslint-plugin-react': '^6.3.0',
	jest: JEST_VERSION,
	'jest-cli': JEST_VERSION,
	'jest-in-case': '^1.0.2', // this is integrated in jest 23
	'jest-environment-jsdom': JEST_VERSION,
	jsdom: '^11.11.0',
	prettier: '^1.6.1',
	'react-storybook-cmf': '^0.4.0',
	'react-storybook-addon-props-combinations': '^1.1.0',
	'react-stub-context': '^0.7.0',
	'regenerator-runtime': '^0.13.1',
	rimraf: '^2.6.2',
	'sass-lint': '^1.13.1',

	// webpack
	'babel-loader': '^8.0.0',
	'copy-webpack-plugin': '^4.6.0',
	'css-loader': '^1.0.1',
	'extract-text-webpack-plugin': 'next',
	'file-loader': '^2.0.0',
	'webfonts-loader': '^4.2.1',
	'node-sass': '^4.7.2',
	'postcss-loader': '^3.0.0',
	'sass-loader': '^7.1.0',
	'style-loader': '^0.23.0',
	'url-loader': '^1.1.2',
	webpack: '^4.19.0',
	'webpack-cli': '^3.1.0',
	'webpack-bundle-analyzer': '^3.0.4',
	'webpack-dashboard': '^2.0.0',
	'webpack-dev-server': '^3.1.11',
};
