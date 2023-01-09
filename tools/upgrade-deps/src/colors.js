function printIfNotTTY(txt) {
	if (process.stdout.isTTY) {
		return undefined;
	}
	return txt;
}

export function red(txt) {
	return printIfNotTTY(txt) || `\x1B[31m${txt}\x1B[39m`;
}

export function bold(txt) {
	return printIfNotTTY(txt) || `\x1B[1m${txt}\x1B[22m`;
}

export default { red, bold };
