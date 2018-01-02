import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

const fetch = jest.fn(
	(url, config) => new Promise((resolve, reject) => {
		if (config.response) {
			if (config.response.error) {
				reject(config.response);
			}
			return resolve(config.response);
		}
		return resolve();
	})
);
global.fetch = fetch;
