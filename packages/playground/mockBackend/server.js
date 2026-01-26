const kit = require('./kit');
const jsonForward = require('./jsonForward');

const server = (req, res) => {
	// Parse JSON body for POST/PUT requests
	let body = '';
	req.on('data', chunk => {
		body += chunk.toString();
	});
	req.on('end', () => {
		try {
			req.body = body ? JSON.parse(body) : {};
		} catch (e) {
			req.body = {};
		}
		// Parse query string
		const url = new URL(req.url, `http://${req.headers.host}`);
		req.query = Object.fromEntries(url.searchParams);
		req.url = url.pathname;

		// Route to appropriate handler
		if (req.url.startsWith('/api/mock/')) {
			jsonForward(req, res);
		} else if (req.url.startsWith('/api/')) {
			kit(req, res);
		} else {
			res.writeHead(404);
			res.end('Not Found');
		}
	});
};

module.exports = server;
