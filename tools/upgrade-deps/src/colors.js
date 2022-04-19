function printIfNotTTY(txt) {
	if (process.stdout.isTTY) {
		return undefined;
	}
	return txt;
}

function red(txt) {
	return printIfNotTTY(txt) || `\x1B[31m${txt}\x1B[39m`;
}

function bold(txt) {
	return printIfNotTTY(txt) || `\x1B[1m${txt}\x1B[22m`;
}

module.exports = {
	red,
	bold,
};
