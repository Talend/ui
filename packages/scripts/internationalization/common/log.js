/* eslint-disable no-console */
const chalk = require('chalk');

function error(message) {
	console.error(chalk.red(`❌ ${message}`));
	process.exit(1);
}

function printSection(title) {
	console.log('\n------------------------------');
	console.log(`-- ${title}`);
	console.log('------------------------------');
}

function printSuccess(text) {
	console.log(`✅ ${text}`);
}
function printRunning(text) {
	console.log(`🏃 ${text}`);
}

module.exports = {
	error,
	printSection,
	printSuccess,
	printRunning,
};
