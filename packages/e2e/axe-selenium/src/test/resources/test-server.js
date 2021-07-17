const http = require('http');
const url = require('url');

const validHTML = `
    <!doctype html>
    <html lang="en">
        <head><title>Test Page</title></head>
        <body>
            <div role="main">
                <h1>This is a test</h1>
                <p>This is a test page with no violations</p>
            </div>
        </body>
    </html>
`;
const invalidHTML = `
    <!doctype html>
    <html> <!-- -->
        <head><title>Test Page</title></head>
        <body>
            <div>
                <p id="invalid-contrast" style="background-color: rgba(35, 97, 146, 0.3); color: #236192;">This paragraph has insufficient color contrast</p>
                <img id="invalid-alternative-text" src="image-without-alternative-text"></img>
            </div>
        </body>
    </html>
`;

http.createServer(function (req, res) {
    const urlParts = url.parse(req.url, true);
    const urlParams = urlParts.query;
    const valid = urlParams && urlParams.valid;

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(valid === 'true' ? validHTML : invalidHTML);

}).listen('5005');
