/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const { printRunning, printSuccess, printInfo } = require('../common/log');

/**
 * Increment last version in package.json
 */
function incrementPackageJsonVersion(packageJsonPath) {
	const packageJson = require(packageJsonPath);
	printInfo(`Package.json found for existing module ${packageJson.name}`);

	const previousVersion = packageJson.version;
	const versionParts = packageJson.version.match(/([0-9]+\.[0-9]+\.)([0-9]+)/);
	const incrementedLast = Number(versionParts[2]) + 1;
	packageJson.version = `${versionParts[1]}${incrementedLast}`;
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

	printSuccess(`${packageJson.name} version: ${previousVersion} --> ${packageJson.version}`);
}

/**
 * Generate package.json
 */
function generatorPackageJson(projectPath, options) {
	const packageJsonPath = path.join(projectPath, 'package.json');

	if (fs.existsSync(packageJsonPath)) {
		incrementPackageJsonVersion(packageJsonPath);
		return;
	}

	printRunning('Generating package.json');
	const packageJson = {
		name: `@talend/locales-${options.project.toLowerCase()}`,
		version: `${options.version}.0`,
		main: 'index.js',
		license: 'Apache-2.0',
		author: 'Talend Frontend <frontend@talend.com>',
		repository: {
			type: 'git',
			url: options.originalGithubUrl,
		},
	};
	if (options.private) {
		packageJson.private = true;
	}
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
	printSuccess(`Package.json saved to ${packageJsonPath}`);
}

module.exports = generatorPackageJson;
