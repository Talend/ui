import 'babel-polyfill';
import 'isomorphic-fetch';
import { configure } from 'enzyme';
import AdapterReact15 from 'enzyme-adapter-react-15';
import AdapterReact16 from 'enzyme-adapter-react-16';

if (process.env.REACT_VERSION === 15) {
	configure({ adapter: new AdapterReact15() });
} else {
	configure({ adapter: new AdapterReact16() });
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
