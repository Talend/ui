#! /usr/bin/env node
const { program } = require('commander');
require('dotenv').config();
const ingest = require('./ingest');
const merge = require('./merge');

if (!process.env.GITHUB_TOKEN) {
	console.error(
		'You must provide a GITHUB_TOKEN env var to use this script (we support .env file)',
	);
	process.exit(1);
}

function all(options) {
	let q;
	try {
		q = ingest(options);
	} catch (e) {
		console.error(e);
	}
	return new Promise(resolve => {
		q.on('end', err => {
			resolve(merge(options));
		});
	});
}

program.version('0.0.1');

program
	.command('ingest')
	.option('-c, --config <type>', 'config file')
	.option('-v, --verbose', 'log for debugging')
	.option('-o, --output <type>', 'output path')
	.action(args => ingest(args));
program
	.command('merge')
	.option('-c, --config <type>', 'config file')
	.option('-v, --verbose', 'log for debugging')
	.option('-o, --output <type>', 'output path')
	.action(merge);
program
	.command('all')
	.option('-c, --config <type>', 'config file')
	.option('-v, --verbose', 'log for debugging')
	.option('-o, --output <type>', 'output path')
	.action(all);

program.parse(process.argv);
