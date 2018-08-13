// generate the react.js file
const fs = require('fs');
const path = require('path');

function extractFiles(folder) {
	const dir = path.join(__dirname, folder);

	// case insensitive sort for windows users
	return
		fs.readdirSync(dir)
		.sort(function(a, b) {
			return a.localeCompare(b, { sensitivity: 'base' });
		})
		.reduce(
			(state, file) => Object.assign(state, {[file.split('.svg')[0]]: fs.readFileSync(path.resolve(dir, file))}),
			{}
		)
}

exports.default = extractFiles;
