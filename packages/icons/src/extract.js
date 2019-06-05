// generate the react.js file
const fs = require('fs');
const path = require('path');

function getDir(folder) {
	if (folder.startsWith(__dirname)) {
		return folder;
	}
	return path.join(__dirname, folder);
}

function getFiles(folder) {
	const dir = getDir(folder);
	// case insensitive sort for windows users
	return fs
		.readdirSync(dir)
		.sort((a, b) => a.localeCompare(b, { sensitivity: 'base' }));
}

function extractFiles(folder) {
	const dir = getDir(folder);
	return getFiles(folder).reduce((acc, file) => {
		const p = path.resolve(dir, file);
		// compat : treat it has it is
		if (fs.lstatSync(p).isDirectory()) {
			// do nothing handles by bundles
			return acc;
			// return Object.assign(acc, extractFiles(p));
		}
		// check if the same file exists in another bundle
		const iconId = file.split('.svg')[0];
		if (acc[iconId]) {
			throw new Error(`Icon already exists ${iconId}`);
		}
		return Object.assign(acc, { [iconId]: fs.readFileSync(path.resolve(dir, file)) });
	}, {});
}

function extractInfo(folder, parent) {
	const dir = getDir(folder);
	return getFiles(folder).reduce((acc, file) => {
		const p = path.resolve(dir, file);
		// compat : treat it has it is
		if (fs.lstatSync(p).isDirectory()) {
			return Object.assign(acc, extractInfo(p, file));
		}
		// check if the same file exists in another bundle
		const iconId = file.split('.svg')[0];
		if (acc[iconId]) {
			throw new Error(`Icon already exists ${iconId}`);
		}
		return Object.assign(acc, { [iconId]: { parent } });
	}, {});
}

exports.default = extractFiles;
exports.getFolders = folder =>
	fs.readdirSync(folder).filter(file => fs.lstatSync(path.resolve(folder, file)).isDirectory());
exports.extractInfo = extractInfo;
