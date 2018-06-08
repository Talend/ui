#!/usr/bin/env node
const path = require('path');
const download = require('download');

/**
 * Download locales
 *
 * Download zip with locales from current ui release on Github
 * This is meant to run when you install this package as a dependency
 */
const packageJson = require(path.join(process.cwd(), './package.json'));
const packageName = packageJson.name.replace('@talend/', '');
const url = `https://github.com/Talend/ui/releases/download/v${packageJson.version}/${packageName}-locales.zip`;
const output = path.join(process.cwd(), 'locales');
const downloadOptions = {
	extract: true,
	options: { timeout: 5000 },
};

console.log('Downloading ui locales...');
download(url, output, downloadOptions)
	.then(data => {
		data.forEach(file => {
			if (file.type === 'file') {
				console.log('Added: ', `${output}/${file.path}`);
			}
		});
	})
	.catch(err => console.error('ERROR: Failed to download ui locales: ', err));
