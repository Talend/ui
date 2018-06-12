#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const download = require('download');

/**
 * Get ui locales
 *
 * Get locales for all installed ui packages that need it
 */
program
	.option('-o, --output <path>', 'Output path, your locales folder')
	.parse(process.argv);

if (!program.output) {
	throw new Error('You have to specify an output path with -o or --output');
}

const dependenciesWithLocales = [
	'@talend/react-components',
	'@talend/react-containers',
	'@talend/react-forms',
];
const packageJson = require(path.join(process.cwd(), './package.json'));
const locales = [];
const output = path.join(process.cwd(), program.output);
const downloadOptions = {
	extract: true,
	options: { timeout: 5000 },
};

function hasDependency(name) {
	if (packageJson.dependencies && packageJson.dependencies[name]) {
		return true;
	} else if (packageJson.devDependencies && packageJson.devDependencies[name]) {
		return true;
	}

	return false;
}

function getDependencyVersion(name) {
	if (packageJson.dependencies[name]) {
		return packageJson.dependencies[name];
	} else if (packageJson.devDependencies[name]) {
		return packageJson.devDependencies[name];
	} else {
		throw new Error(`Cannot find version of missing package '${name}'`);
	}
}

function downloadLocale(url) {
	download(url, output, downloadOptions)
		.then(data => {
			data.forEach(file => {
				if (file.type === 'file') {
					console.log('Added: ', `${output}/${file.path}`);
				}
			});
		})
		.catch(err => console.error('ERROR: Failed to download ui locales: ', err));
}

dependenciesWithLocales.forEach(dependency => {
	if (hasDependency(dependency, packageJson)) {
		const name = dependency.replace('@talend/', '');
		const version = getDependencyVersion(dependency);
		locales.push(
			`https://github.com/Talend/ui/releases/download/v${version}/${name}-locales.zip`
		);
	}
});

if (locales.length === 0) {
	console.log('No packages installed that needs locales');
	return;
}

console.log('Downloading ui locales...');
locales.forEach(url => {
	downloadLocale(url);
});
