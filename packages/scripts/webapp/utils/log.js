/**
 * Print a separator
 * @param title The title to print
 */
function printSeparator(title) {
	console.log(`\n${title} `.padEnd(100, '-'));
}

module.exports = { printSeparator };
