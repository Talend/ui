const https = require('https');

/**
 * This function creates a new URL in case of redirection detected
 * @param {string} location is response.headers.location in http response
 * @param {string} url is full original url string
 */
function getURL(location, url) {
	if (location.startsWith('http')) {
		return location;
	}
	var origin = new URL(url);
	origin.pathname = location;
	return origin.href;
}

function download(url, options = []) {
	return new Promise((resolve, reject) => {
		const request = https.get(url, resp => {
			if (resp.headers.location) {
				// follow redirection
				download(getURL(resp.headers.location, url), options).then(resolve).catch(reject);
				return;
			}
			if (options.includes('-v')) {
				console.log('talend-scripts postinstall: download', url, resp.statusCode);
			}
			if (resp.statusCode >= 400) {
				reject(new Error(`Download ${url}, ${resp.statusCode}`));
				return;
			}
			let data = '';

			// A chunk of data has been recieved.
			resp.on('data', chunk => {
				data += chunk;
			});

			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				resolve(data);
			});
		});
		request.on('error', err => {
			console.error(err);
			reject(err);
		});
		request.end();
	});
}

module.exports = {
	download,
};
