#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const sass = require('sass');
const path = require('path');
const pathToFileURL = require('url').pathToFileURL;

const CWD = process.cwd();
const nodeModulesPath = path.join(CWD, 'node_modules');
const SRC_PATH = process.argv[2]; // /home/user/project/src
const TARGET_PATH = process.argv[3]; // /home/user/project/lib

function getPkgRoot(filename) {
	const dir = path.dirname(filename);
	if (fs.existsSync(path.join(dir, 'package.json'))) {
		return path.join(dir, '/');
	}
	return getPkgRoot(dir);
}

function getInfo(importPath) {
	let scope, name, rest, mainPath;
	if (importPath.startsWith('@')) {
		[scope, name, ...rest] = importPath.split('/');
		mainPath = require.resolve(`${scope}/${name}`);
	} else {
		[name, ...rest] = importPath.split('/');
		mainPath = require.resolve(name);
	}
	const info = {
		base: getPkgRoot(mainPath),
		url: rest.join('/'),
	};
	return info;
}

function transform(filename) {
	const scssFileDirectory = path.dirname(filename);
	let content;
	let target = filename.replace(SRC_PATH, TARGET_PATH);

	if (filename.match(/\/_.*\.scss/) === null) {
		//compile
		// https://sass-lang.com/documentation/js-api/interfaces/Options
		const opts = {
			sourceMap: true,
			loadPaths: [nodeModulesPath, scssFileDirectory, CWD],
			importers: [
				{
					findFileUrl(url) {
						// Load paths only support relative URLs.
						if (url.startsWith('~')) {
							const info = getInfo(url.replace('~', ''));
							// console.log(new URL(info.url, pathToFileURL(info.base)));
							return new URL(info.url, pathToFileURL(info.base));
						}
						return new URL(url, pathToFileURL(loadPath));
					},
				},
			],
		};
		const sassResult = sass.compile(filename, { ...opts });
		content = sassResult.css;
		target = target.replace('.scss', '.css');
		// console.log('transform', filename, target);
	} else {
		content = fs.readFileSync(filename).toString();
		// console.log('copy', filename, target);
	}
	if (!fs.existsSync(path.dirname(target))) {
		fs.mkdirSync(path.dirname(target), { recursive: true });
	}
	fs.writeFileSync(target, content);
}

function findAllSrcFiles(current = SRC_PATH, buff = []) {
	return fs.readdirSync(current, { withFileTypes: true }).reduce((acc, info) => {
		if (info.isDirectory()) {
			return acc.concat(findAllSrcFiles(path.join(current, info.name)));
		}
		if (info.name.endsWith('.scss')) {
			acc.push(path.join(current, info.name));
		}
		return acc;
	}, buff);
}
const result = findAllSrcFiles();

result.forEach(filename => {
	transform(filename);
});
