const fs = require('fs');

/**
 * Read the content of a file
 * @param filepath {String} File to the file to read
 * @returns {Promise}
 */
const readFile = filepath =>
	new Promise((resolve, reject) => {
		fs.readFile(filepath, 'utf-8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});

/**
 * Resolve the return promise after the given delay
 * @param {Number} delay Delay length (in ms)
 * @returns {Promise}
 */
const wait = (delay = 1000) => new Promise(resolve => setTimeout(resolve, delay));

/**
 * Directly bind /api/mock/* HTTP queries to local mockBackend/mock/* contents
 */
module.exports = function addRoutes(app) {
	const API_MOCK_ENDPOINT = '/api/mock';

	app.get(`${API_MOCK_ENDPOINT}/*`, (req, res) => {
		const urlPath = req.url.split('?')[0];
		const mockFilePath = `${__dirname}/mock/${urlPath.substr(API_MOCK_ENDPOINT.length)}.json`;

		wait()
			.then(() => readFile(mockFilePath))
			.then(content => res.json(JSON.parse(content)))
			.catch(error => {
				// eslint-disable-next-line no-console
				console.error(`Unable to load mock file "${mockFilePath}" due to :`, error);
				res.status(400).send('Bad Request');
			});
	});
};
