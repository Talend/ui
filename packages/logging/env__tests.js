const fetch = jest.fn(
	(url, config) => new Promise((resolve, reject) => {
		if (config.response) {
			if (config.response.error) {
				reject(new TypeError(config.response));
			}
			return resolve(config.response);
		}
		return resolve();
	})
);
global.fetch = fetch;
