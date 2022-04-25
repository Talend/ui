#!/usr/bin/env node
/**
 * This script is useful if you want to maintain a CDN.
 */

const { program } = require('commander');
const download = require('./download');
const build = require('./build');
const clean = require('./clean');

program.command('cleanup').option('-v, --verbose', 'output extra debugging').action(clean);

program
	.command('download')
	// filter over packages
	.option('--from <type>', 'exclude modules in the global list until the provided module')
	.option('--exclude <type>', 'exclude modules based on name and scope name')
	.option('-p, --package <type>', 'filter one package')
	.option('--versions <type>', 'path to the file versions')
	.option('-u, --umd <type>', 'path to umd file')
	// global behavior
	.option('-v, --verbose', 'output extra debugging')
	// specific
	.option('-f, --force', 'force re download')
	.option('--cleanup', 'trigger cleanup subcommand at the end')
	.action(download);
program
	.command('build')
	// filter over packages
	.option('--from <type>', 'exclude modules in the global list until the provided module')
	.option('--exclude <type>', 'exclude modules based on name and scope name')
	.option('-p, --package <type>', 'filter one package')
	.option('-u, --umd <type>', 'path to umd file')
	// global behavior
	.option('-v, --verbose', 'output extra debugging')
	// specific
	.option('-f, --force', 'force full rebuild when output already exists')
	.option('-c, --copy', 'copy content of package')
	.option('-w, --webpack', 'build UMD using webpack')
	.action(build);

program.parse(process.argv);
