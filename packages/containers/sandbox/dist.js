const express = require('express');
const backend = require('./mockBackend/server');

const app = express();
app.use(express.static('dist'));
backend(app);

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
