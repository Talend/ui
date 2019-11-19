// generate the react.js file
const fs = require('fs');
const path = require('path');

function getAbsolutePath(folder) {
	if (folder.startsWith(__dirname)) {
		return folder;
	}
	return path.join(__dirname, folder);
}

function getFiles(folder) {
	const dir = getAbsolutePath(folder);
	// case insensitive sort for windows users
	return fs.readdirSync(dir).sort((a, b) => a.localeCompare(b, { sensitivity: 'base' }));
}

function getIconId(file) {
	return file.split('.svg')[0];
}

function assertUnique(files, acc) {
	const hasDuplicate = Object.keys(files).some(file => acc[getIconId(file)]);
	if (hasDuplicate) {
		throw new Error('Icons already exists');
	}
}

function extractFiles(folder) {
	const dir = getAbsolutePath(folder);
	return getFiles(folder).reduce((acc, file) => {
		const p = path.resolve(dir, file);
		if (fs.lstatSync(p).isDirectory()) {
			const files = extractFiles(p);
			assertUnique(files, acc);
			return Object.assign(acc, files);
		}
		const iconId = getIconId(file);
		if (acc[iconId]) {
			throw new Error(`Icon ${iconId} already included in the bundle`);
		}
		return Object.assign(acc, { [iconId]: fs.readFileSync(path.resolve(dir, file)) });
	}, {});
}

function extractInfo(folder, parent) {
	const dir = getAbsolutePath(folder);
	return getFiles(folder).reduce((acc, file) => {
		const p = path.resolve(dir, file);
		if (fs.lstatSync(p).isDirectory()) {
			const infos = extractInfo(p, file);
			assertUnique(infos, acc);
			return Object.assign(acc, infos);
		}
		// check if the same file exists in another bundle
		const iconId = getIconId(file);
		if (acc[iconId]) {
			throw new Error(`Icon ${iconId} already included in the bundle`);
		}
		return Object.assign(acc, { [iconId]: { parent } });
	}, {});
}

exports.default = extractFiles;
exports.getFolders = folder =>
	fs.readdirSync(folder).filter(file => fs.lstatSync(path.resolve(folder, file)).isDirectory());
exports.extractInfo = extractInfo;
