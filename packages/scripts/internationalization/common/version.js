/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const xmlParser = require('xml2json');

const { error, printInfo, printSection, printSuccess } = require('./log');

function getPossibleVersion() {
	printSection('Extract version');
	const lernaJsonPath = path.join(process.cwd(), 'lerna.json');
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const pomXmlPath = path.join(process.cwd(), 'pom.xml');
	const VERSION_REGEX = /^([0-9]+\.[0-9]+).*/;

	if (fs.existsSync(lernaJsonPath)) {
		const { version } = require(lernaJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			printSuccess('Version found');
			return {
				source: 'lerna.json',
				version: match[1],
			};
		}
	}
	if (fs.existsSync(packageJsonPath)) {
		const { version } = require(packageJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			printSuccess('Version found');
			return {
				source: 'package.json',
				version: match[1],
			};
		}
	}
	if (fs.existsSync(pomXmlPath)) {
		const data = fs.readFileSync(pomXmlPath);
		const { version } = xmlParser.toJson(data);
		const match = version.match(VERSION_REGEX);
		if (match) {
			printSuccess('Version found');
			return {
				source: 'pom.xml',
				version: match[1],
			};
		}
	}

	printInfo('No version file detected');
	return null;
}

function getVersion() {
	const { source, extractedVersion } = getPossibleVersion();

	if (!extractedVersion) {
		error(`
			talend-scripts can't determine your project version. Possible reasons : 
				* no package.json or pom.xml in this directory
				* no version in package.json or pom.xml
		`);
	}

	printSuccess(`Version extracted from ${source}: ${extractedVersion}`);
	return extractedVersion;
}

module.exports = {
	getPossibleVersion,
	getVersion,
};
