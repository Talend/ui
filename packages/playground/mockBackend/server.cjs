const bodyParser = require('body-parser');
const kit = require('./kit.cjs');
const jsonForward = require('./jsonForward.cjs');

const server = devServer => {
	devServer.app.use(bodyParser.json()); // for parsing application/json
	jsonForward(devServer.app);
	kit(devServer.app);
};

module.exports = server;
