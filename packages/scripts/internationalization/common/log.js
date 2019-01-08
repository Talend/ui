const chalk = require('chalk');

function printError(message) {
	console.error(chalk.red(`❌ ${message}`));
}

function printSuccess(text) {
	console.log(`✅ ${text}`);
}

function printRunning(text) {
	console.log(`🏃 ${text}`);
}

function printSection(title) {
	console.log('\n------------------------------');
	console.log(`-- ${title}`);
	console.log('------------------------------');
}

module.exports = {
	printError,
	printRunning,
	printSuccess,
	printSection,
};
