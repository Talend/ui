import 'babel-polyfill';
import 'isomorphic-fetch';
import { configure } from 'enzyme';
import AdapterReact15 from 'enzyme-adapter-react-15';
import AdapterReact16 from 'enzyme-adapter-react-16';

function getMajorVersion() {
	if (!process.env.REACT_VERSION) {
		return '16';
	}
	return process.env.REACT_VERSION.replace('^', '').split('.')[0];
}

const REACT_VERSION = getMajorVersion();

if (REACT_VERSION === '15') {
	configure({ adapter: new AdapterReact15() });
} else if (REACT_VERSION === '16') {
	configure({ adapter: new AdapterReact16() });
} else {
	throw new Error(`Unsupported version of React: ${REACT_VERSION}`);
}

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
