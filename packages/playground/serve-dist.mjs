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

function resolveSafeFilePath(requestUrl) {
	let pathname;
	try {
		const urlObj = new URL(requestUrl, 'http://localhost');
		pathname = urlObj.pathname || '/';
	} catch {
		return { statusCode: 400, message: 'Bad Request' };
	}

	let decodedPathname;
	try {
		decodedPathname = decodeURIComponent(pathname);
	} catch {
		return { statusCode: 400, message: 'Bad Request' };
	}

	if (decodedPathname.includes('\0')) {
		return { statusCode: 400, message: 'Bad Request' };
	}

	const normalizedPathname = path.posix.normalize(decodedPathname.replace(/\\/g, '/'));
	if (!normalizedPathname.startsWith('/')) {
		return { statusCode: 400, message: 'Bad Request' };
	}

	// Resolve and normalize the path, then check if file exists and resolve symlinks
	let filePath = path.resolve(distRoot, '.' + normalizedPathname);

	try {
		// Use realpathSync to resolve any symbolic links and get the canonical path
		filePath = fs.realpathSync(filePath);
	} catch (err) {
		// File doesn't exist or can't be accessed, but we'll handle this later with fs.stat
		// For now, just ensure the non-canonical path is still within bounds
	}

	if (!filePath.startsWith(distRoot + path.sep) && filePath !== distRoot) {
		return { statusCode: 403, message: 'Forbidden' };
	}

	return { filePath };
}

const server = http.createServer((req, res) => {
	// Serve static files from dist
	const { statusCode, message, filePath: resolvedFilePath } = resolveSafeFilePath(req.url);
	let filePath = resolvedFilePath;
	if (!filePath) {
		res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
		res.end(message);
		return;
	}

	// Handle directory requests (serve index.html)
	fs.stat(filePath, (err, stats) => {
		if (!err && stats.isDirectory()) {
			filePath = path.join(filePath, 'index.html');

			// Re-validate the path after appending index.html
			try {
				const realPath = fs.realpathSync(filePath);
				if (!realPath.startsWith(distRoot + path.sep) && realPath !== distRoot) {
					res.writeHead(403, { 'Content-Type': 'text/plain' });
					res.end('Forbidden');
					return;
				}
				filePath = realPath;
			} catch {
				// File doesn't exist, will be handled by serveStatic with 404
			}
		}

		serveStatic(req, res, filePath);
	});
});

server.listen(3000, () => {
	console.log('ready http://localhost:3000');
});
