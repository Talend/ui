/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const xmlParser = require('xml2json');

const { error, printSection, printSuccess } = require('./log');

module.exports = function getVersion() {
	printSection('Extract version');
	const lernaJsonPath = path.join(process.cwd(), 'lerna.json');
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const pomXmlPath = path.join(process.cwd(), 'pom.xml');
	const VERSION_REGEX = /^([0-9]+\.[0-9]+).*/;

	let extractedVersion;
	let source;
	if (fs.existsSync(lernaJsonPath)) {
		const { version } = require(lernaJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			source = 'lerna.json';
			extractedVersion = match[1];
		}
	} else if (!extractedVersion && fs.existsSync(packageJsonPath)) {
		const { version } = require(packageJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			source = 'package.json';
			extractedVersion = match[1];
		}
	} else if (!extractedVersion && fs.existsSync(pomXmlPath)) {
		const data = fs.readFileSync(pomXmlPath);
		const { version } = xmlParser.toJson(data);
		const match = version.match(VERSION_REGEX);
		if (match) {
			source = 'pom.xml';
			extractedVersion = match[1];
		}
	}

	if (!extractedVersion) {
		error(`
			talend-scripts can't determine your project version. Possible reasons : 
				* no package.json or pom.xml in this directory
				* no version in package.json or pom.xml
		`);
	}

	printSuccess(`Version extracted from ${source}: ${extractedVersion}`);
	return extractedVersion;
};
