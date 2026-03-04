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
module.exports = function addRoutes(req, res) {
	const API_MOCK_ENDPOINT = '/api/mock';

	if (!req.url.startsWith(API_MOCK_ENDPOINT)) {
		res.writeHead(404);
		res.end('Not Found');
		return;
	}

	const urlPath = req.url.split('?')[0];
	const mockFilePath = `${__dirname}/mock/${urlPath.substr(API_MOCK_ENDPOINT.length)}.json`;

	wait()
		.then(() => readFile(mockFilePath))
		.then(content => {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(JSON.parse(content)));
		})
		.catch(error => {
			// eslint-disable-next-line no-console
			console.error('Unable to load mock file "%s" due to :', mockFilePath, error);
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			res.end('Bad Request');
		});
};
