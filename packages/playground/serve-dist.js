const http = require('http');
const fs = require('fs');
const path = require('path');
const backend = require('./mockBackend/server');

const options = process.argv.slice(2);
const useGzip = options.includes('--gzip');
const ROOT = path.join(__dirname, 'dist');

// Simple static file server
function serveStatic(req, res, filePath) {
	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('Not Found');
			return;
		}

		const ext = path.extname(filePath);
		const contentTypes = {
			'.html': 'text/html',
			'.js': 'application/javascript',
			'.css': 'text/css',
			'.json': 'application/json',
			'.png': 'image/png',
			'.jpg': 'image/jpeg',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
		};

		const contentType = contentTypes[ext] || 'application/octet-stream';
		const headers = {
			'Content-Type': contentType,
			'Content-Length': data.length,
		};

		if (useGzip) {
			headers['Content-Encoding'] = 'gzip';
		}

		res.writeHead(200, headers);
		res.end(data);
	});
}

const server = http.createServer((req, res) => {
	// Handle API routes through backend
	if (req.url.startsWith('/api/')) {
		backend(req, res);
		return;
	}

	// Serve static files from dist
	let urlPath;
	try {
		// Use WHATWG URL to reliably extract the pathname (ignores query, hash)
		const parsedUrl = new URL(req.url, 'http://localhost');
		urlPath = parsedUrl.pathname || '/';
	} catch (e) {
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.end('Bad Request');
		return;
	}

	// Prevent directory traversal: resolve against ROOT and verify containment
	let filePath = path.resolve(ROOT, '.' + urlPath);

	// Ensure the resolved path is within the ROOT directory
	if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
		res.writeHead(403, { 'Content-Type': 'text/plain' });
		res.end('Forbidden');
		return;
	}

	// Handle directory requests (serve index.html)
	fs.stat(filePath, (err, stats) => {
		if (!err && stats.isDirectory()) {
			filePath = path.join(filePath, 'index.html');
		}

		serveStatic(req, res, filePath);
	});
});

server.listen(3000, () => {
	console.log('ready http://localhost:3000');
});
