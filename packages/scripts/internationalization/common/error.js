const chalk = require('chalk');

function error(message) {
	console.error(chalk.red(message));
	process.exit(1);
}

module.exports = error;
