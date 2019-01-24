const { printError } = require('./log');

function error(message) {
	printError(message);
	process.exit(1);
}

module.exports = error;
