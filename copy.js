#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const cpx = require('cpx2');

// todo take args
const projectPath = process.argv[process.argv.length - 1];

if (!fs.existsSync(projectPath)) {
	console.error('you must give an existing path as argument');
	return 0;
}

function onError(err) {
	if (err) {
		console.error(err);
	}
}

const packages = [
	// {
	//     dir: './packages/cmf',
	//     sources: [
	//         'lib/**',
	//         'dist/*.js',
	//     ],
	// },
	{
		dir: './packages/components',
		sources: ['lib/**', 'dist/*.js'],
	},
	{
		dir: './packages/icons',
		sources: ['dist/**'],
	},
	{
		dir: './packages/theme',
		sources: ['src/**', 'dist/**'],
	},
	// {
	//     dir: './packages/datagrid',
	//     sources: [
	//         'lib/**',
	//         'dist/*.js',
	//     ],
	// },
	// {
	//     dir: './packages/containers',
	//     sources: [
	//         'lib/**',
	//         'dist/*.js',
	//     ],
	// },
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
