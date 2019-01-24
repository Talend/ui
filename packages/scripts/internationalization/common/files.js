const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const xmlParser = require('xml2json');

const error = require('./error');
const { printRunning } = require('./log');

function copyFiles(srcFolder, targetFolder) {
	printRunning(`Copy ${srcFolder}/ files into ${targetFolder}`);
	spawn.sync('cp', ['-r', `${srcFolder}/.`, targetFolder], { stdio: 'inherit' });
}

function fsFind(rootFolder, type, name) {
	const findArgs = [rootFolder];

	if (type) {
		findArgs.push('-type', type);
	}
	if (name) {
		findArgs.push('-name', name);
	}

	const filesChild = spawn.sync('find', findArgs);
	if (filesChild.status !== 0) {
		error(filesChild.stderr.toString());
	}
	return filesChild.stdout
		.toString()
		.split('\n')
		.filter(filePath => filePath);
}

function getLanguageFoldersDefinitions(folderPath) {
	return fs
		.readdirSync(folderPath)
		.filter(name => name !== '.git')
		.map(name => ({
			name,
			absPath: path.join(folderPath, name),
			language: name.substr(0, name.indexOf('_')),
		}))
		.filter(({ absPath }) => fs.lstatSync(absPath).isDirectory());
}

function getXmlAsJson(xmlPath) {
	const data = fs.readFileSync(xmlPath);
	return JSON.parse(xmlParser.toJson(data));
}

module.exports = {
	copyFiles,
	fsFind,
	getLanguageFoldersDefinitions,
	getXmlAsJson,
};
