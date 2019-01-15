const fs = require('fs');
const path = require('path');
const xmlParser = require('xml2json');
const template = require('lodash.template');

const { incrementVersion } = require('../../common/version');
const { printRunning, printSuccess } = require('../../common/log');

const pomTemplate = template(
	`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.talend.locales</groupId>
    <artifactId>locales-<%= normalizedName %></artifactId>
    <version><%= nextVersion %></version>

    <distributionManagement>
        <repository>
            <id><%= repository.id %></id>
            <url><%= repository.url %></url>
        </repository>
    </distributionManagement>
</project>
`,
);

/**
 * Increment last version in pom.xml
 */
function getPomXmlVersion(pomXmlPath) {
	const data = fs.readFileSync(pomXmlPath);
	const { version } = JSON.parse(xmlParser.toJson(data)).project;
	return incrementVersion(version);
}

/**
 * Generate pom.xml.
 * If it exists, the version is incremented
 */
function generatePomXml(projectPath, options) {
	const pomXmlPath = path.join(projectPath, 'pom.xml');

	const nextVersion = fs.existsSync(pomXmlPath)
		? getPomXmlVersion(pomXmlPath)
		: `${options.version}.0`;

	printRunning('Generating pom.xml');
	const pomXml = pomTemplate({ ...options, nextVersion });
	fs.writeFileSync(pomXmlPath, pomXml);
	printSuccess(`Pom.xml saved to ${pomXmlPath}`);
}

module.exports = generatePomXml;
