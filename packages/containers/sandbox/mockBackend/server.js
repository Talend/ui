const bodyParser = require('body-parser');
const kit = require('./kit');
const infiniteScroll = require('./infiniteScroll');
const jsonForward = require('./jsonForward');

const server = app => {
	app.use(bodyParser.json()); // for parsing application/json
	jsonForward(app);
	kit(app);
	infiniteScroll(app);
};

module.exports = server;
