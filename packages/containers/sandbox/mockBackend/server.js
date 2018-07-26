const bodyParser = require('body-parser');
const kit = require('./kit');
const jsonForward = require('./jsonForward');

const server = app => {
	app.use(bodyParser.json()); // for parsing application/json
	jsonForward(app);
	kit(app);
};

module.exports = server;
