#!/usr/bin/env node
const fs = require('fs');
const pathLib = require('path');
const mkdirp = require('mkdirp'); // eslint-disable-line import/no-extraneous-dependencies
const deepmerge = require('deepmerge'); // eslint-disable-line import/no-extraneous-dependencies
const program = require('commander'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils');

program
	.version('0.0.1')
	.option('-d, --dev', 'dev sources instead of sources')
	.option('-q, --quiet', 'display nothing')
	// .option('-w, --watch', 'watch files')
	.parse(process.argv);

// 1 - Init some stuff to use next
const findJsonInFolder = utils.findJsonInFolder;
const concatMerge = utils.concatMerge;
const overrideRoutes = utils.overrideRoutes;
const overrideActions = utils.overrideActions;
const log = utils.getLogger(program.quiet);
const configurations = [];
const cmfconfig = utils.getCmfConfig();

// 2 - Get sources & destination paths
const sources = program.dev
	? cmfconfig['cmf-settings']['dev-sources']
	: cmfconfig['cmf-settings'].sources;
const destination = pathLib.join(process.cwd(), cmfconfig['cmf-settings'].destination);

// 3 - Extract json from sources
log('\nExtracting configuration from : \n');
sources.forEach(source => {
	findJsonInFolder(pathLib.join(process.cwd(), source)).forEach(filePath => {
		log(filePath);
		configurations.push(require(`${filePath}`)); // eslint-disable-line global-require
	});
});
log('\n');

// 4 - merge json stuff in one object / settings
const settings = deepmerge.all(configurations, { arrayMerge: concatMerge });

// 5 - overrides actions & routes
if (settings.overrideRoutes) {
	Object.keys(settings.overrideRoutes).forEach(route => {
		overrideRoutes(route, settings);
	});
}
if (settings.overrideActions) {
	Object.keys(settings.overrideActions).forEach(id => {
		overrideActions(id, settings);
	});
}

// 6 - Write the merged file
log(`Merge to ${destination}`);
mkdirp(pathLib.dirname(destination), () => {
	fs.writeFile(destination, JSON.stringify(settings), () => {
		console.log('Merged');
	});
});
