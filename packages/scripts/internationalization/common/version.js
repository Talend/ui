/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const xmlParser = require('xml2json');

const error = require('./error');
const { printInfo, printSection, printSuccess } = require('./log');

function getPossibleVersion() {
	printSection('Extract version');
	const lernaJsonPath = path.join(process.cwd(), 'lerna.json');
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const pomXmlPath = path.join(process.cwd(), 'pom.xml');
	const VERSION_REGEX = /^([0-9]+\.[0-9]+).*/;

	let info;
	if (fs.existsSync(lernaJsonPath)) {
		const { version } = require(lernaJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			info = {
				source: 'lerna.json',
				version: match[1],
			};
		}
	}
	if (!info && fs.existsSync(packageJsonPath)) {
		const { version } = require(packageJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			info = {
				source: 'package.json',
				version: match[1],
			};
		}
	}
	if (!info && fs.existsSync(pomXmlPath)) {
		const data = fs.readFileSync(pomXmlPath);
		const { version } = JSON.parse(xmlParser.toJson(data)).project;
		const match = version.match(VERSION_REGEX);
		if (match) {
			info = {
				source: 'pom.xml',
				version: match[1],
			};
		}
	}

	if (info) {
		printSuccess(`Version extracted from ${info.source}: ${info.version}`);
		return info.version;
	}

	printInfo('No version file detected');
	return null;
}

function getVersion() {
	const version = getPossibleVersion();

	if (!version) {
		error(`
			talend-scripts can't determine your project version. Possible reasons : 
				* no package.json or pom.xml in this directory
				* no version in package.json or pom.xml
		`);
	}

	return version;
}

function incrementVersion(version) {
	const versionParts = version.match(/([0-9]+\.[0-9]+\.)([0-9]+)/);
	const incrementedLast = Number(versionParts[2]) + 1;
	return `${versionParts[1]}${incrementedLast}`;
}

module.exports = {
	getPossibleVersion,
	getVersion,
	incrementVersion,
};
