#!/usr/bin/env node

const program = require('commander'); // eslint-disable-line import/no-extraneous-dependencies
const merge = require('./cmf-settings.merge');

program
	.version('0.0.2')
	.option('-d, --dev', 'dev sources instead of sources')
	.option('-q, --quiet', 'display nothing')
	.option('-r, --recursive', 'allow recursive search for json files')
	.parse(process.argv);

merge(program, null, null, process.exit);
