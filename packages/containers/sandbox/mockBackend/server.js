const fs = require('fs');

/**
 * Read the content of a file
 * @param filepath {String} File to the file to read
 * @returns {Promise}
 */
const readFile = filepath => new Promise((resolve, reject) => {
	fs.readFile(filepath, 'utf-8', (err, data) => {
		if (err) {
			reject(err);
		} else {
			resolve(data);
		}
	});
});

const server = app => {
	// Directly bind /api/mock/* HTTP queries to local mockBackend/mock/* contents
	const API_MOCK_ENDPOINT = '/api/mock';

	app.get(`${API_MOCK_ENDPOINT}/*`, (req, res) => {
		const mockFilePath = `${__dirname}/mock/${req.url.substr(API_MOCK_ENDPOINT.length)}.json`;

		readFile(mockFilePath)
			.then(content => res.json(JSON.parse(content)))
			.catch(error => {
				// eslint-disable-next-line no-console
				console.error(`Unable to load mock file "${mockFilePath}" due to :`, error);
				res.status(400).send('Bad Request');
			});
	});
};

module.exports = server;
