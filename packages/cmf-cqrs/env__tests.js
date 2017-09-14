import 'babel-polyfill';

const fetch = jest.fn(
	(url, config) =>
		new Promise((resolve) => {
			if (config.response) {
				return resolve(config.response);
			}
			return resolve();
		})
);
global.fetch = fetch;
