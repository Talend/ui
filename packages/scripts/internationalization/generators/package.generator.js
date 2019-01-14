const fs = require('fs');
const { printRunning, printSuccess } = require('../common/log');

module.exports = function generatorPackageJson(packageJsonPath, options) {
	// generate package.json
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
};
