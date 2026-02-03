/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distRoot = path.join(__dirname, 'dist');

const options = process.argv.slice(2);
const useGzip = options.includes('--gzip');

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
	// Serve static files from dist
	let pathname;
	try {
		const urlObj = new URL(req.url, 'http://localhost');
		pathname = urlObj.pathname || '/';
	} catch {
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.end('Bad Request');
		return;
	}

	// Normalize and validate the path to prevent traversal
	let decodedPathname;
	try {
		decodedPathname = decodeURIComponent(pathname);
	} catch {
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.end('Bad Request');
		return;
	}

	if (decodedPathname.includes('\0')) {
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.end('Bad Request');
		return;
	}

	const normalizedPathname = path.posix.normalize(decodedPathname.replace(/\\/g, '/'));
	if (!normalizedPathname.startsWith('/')) {
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.end('Bad Request');
		return;
	}

	// Normalize the path and ensure it stays within distRoot
	let filePath = path.resolve(distRoot, '.' + normalizedPathname);

	if (!filePath.startsWith(distRoot + path.sep) && filePath !== distRoot) {
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
