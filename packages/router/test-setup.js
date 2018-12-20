/**
 * This file is here because this module is not part of the lerna.
 * So we have enzyme in the current node_module.
 * If we use ../../test-setup it doesn t work because we have two enzyme
 * so it complains about not having any enzyme-adapter for react.
 */
/* eslint-disable global-require,no-plusplus */
import { configure } from 'enzyme';

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
