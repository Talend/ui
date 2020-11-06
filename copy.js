#!/usr/bin/env node

/**
 * This script let you test in place a branch of ui-script without release it.
 * It copies all plugin, config, preset, ... only if they are installed
 *
 * How to use it:
 * ./copy.js ../ui
 *
 * The only argument is a path to a folder which contains a node_modules
 */

const path = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const cpx = require('cpx2');

const projectPath = process.argv[process.argv.length - 1];

if (!fs.existsSync(projectPath)) {
	console.error('you must give an existing path as argument');
	process.exit(1);
}

function onError(err) {
	if (err) {
		console.error(err);
	}
}

const packages = [
	{
		dir: './packages/cmf',
		sources: ['dist/*'],
	},
	{
		dir: './packages/cmf-cqrs',
		sources: ['dist/*'],
	},
	{
		dir: './packages/components',
		sources: ['dist/*'],
	},
	{
		dir: './packages/containers',
		sources: ['dist/*'],
	},
	{
		dir: './packages/datagrid',
		sources: ['dist/*'],
	},
	{
		dir: './packages/forms',
		sources: ['dist/*'],
	},
	{
		dir: './packages/router',
		sources: ['dist/*'],
	},
	{
		dir: './packages/sagas',
		sources: ['dist/*'],
	},
];

packages.forEach(p => {
	const packagePath = p.dir;
	const npm = require(`${packagePath}/package.json`).name;
	const packageTargetPath = `${projectPath}/node_modules/${npm}`;
	if (!fs.existsSync(packageTargetPath)) {
		return;
	}
	p.sources.forEach(source => {
		const absoluteSource = `${packagePath}/${source}`;
		const absoluteTargetPath = `${packageTargetPath}/${path.dirname(source)}`;
		// if (fs.lstatSync(absoluteSource).isFile()) {
		cpx.copy(absoluteSource, absoluteTargetPath, onError);
	});
});
