const compression = require('compression');
const express = require('express');
const backend = require('./mockBackend/server');

const options = process.argv.slice(2);
const app = express();

if (options.includes('--gzip')) {
	app.use(compression());
}

app.use(express.static('dist'));
backend(app);

app.listen(3000, () => {
	console.log('ready http://localhost:3000');
});
