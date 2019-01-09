/* eslint-disable no-console */
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

function printInfo(text) {
	console.log(`ℹ️ ${text}`);
}

function printWarning(text) {
	console.log(chalk.yellow(`⚠️️ ${text}`));
}

function printSection(title) {
	console.log('\n------------------------------');
	console.log(`-- ${title}`);
	console.log('------------------------------');
}

module.exports = {
	printError,
	printInfo,
	printSuccess,
	printRunning,
	printWarning,
	printSection,
};
