/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const { incrementVersion } = require('../../common/version');
const { printRunning, printSuccess, printInfo } = require('../../common/log');

/**
 * Increment last version in package.json
 */
function incrementPackageJsonVersion(packageJsonPath) {
	const packageJson = require(packageJsonPath);
	printInfo(`Package.json found for existing module ${packageJson.name}`);

	const previousVersion = packageJson.version;
	packageJson.version = incrementVersion(previousVersion);
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

	printSuccess(`${packageJson.name} version: ${previousVersion} --> ${packageJson.version}`);
}

/**
 * Generate package.json
 */
function generatorPackageJson(options) {
	const packageJsonPath = path.join(options.localesRepoPath, 'package.json');

	if (fs.existsSync(packageJsonPath)) {
		incrementPackageJsonVersion(packageJsonPath);
		return;
	}

	printRunning('Generating package.json');
	const packageJson = {
		name: `@talend/locales-${options.normalizedName}`,
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
