// generate the react.js file
const fs = require('fs');
const path = require('path');

function extractFiles(folder) {
	let dir;
	if (folder.startsWith(__dirname)) {
		dir = folder;
	} else {
		dir = path.join(__dirname, folder);
	}
	// case insensitive sort for windows users
	return fs
		.readdirSync(dir)
		.sort((a, b) => a.localeCompare(b, { sensitivity: 'base' }))
		.reduce((acc, file) => {
			const p = path.resolve(dir, file);
			// compat : treat it has it is
			if (fs.lstatSync(p).isDirectory()) {
				return Object.assign(acc, extractFiles(p));
			}
			// check if the same file exists in another bundle
			const iconId = file.split('.svg')[0];
			if (acc[iconId]) {
				throw new Error(`Icon already exists ${iconId}`);
			}
			return Object.assign(acc, { [iconId]: fs.readFileSync(path.resolve(dir, file)) });
		}, {});
}

exports.default = extractFiles;
exports.getFolders = folder =>
	fs.readdirSync(folder).filter(file => fs.lstatSync(path.resolve(folder, file)).isDirectory());
