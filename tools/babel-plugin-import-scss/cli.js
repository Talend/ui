#!/usr/bin/env node
const fs = require('fs');
const sass = require('sass');
const path = require('path');
const pathToFileURL = require('url').pathToFileURL;

const CWD = process.cwd();
const nodeModulesPath = path.join(CWD, 'node_modules');
const srcPath = path.join(CWD, 'src');

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
	console.log(info);
	return info;
}

function transform(filename) {
	const scssFileDirectory = path.dirname(filename);
	let content;
	if (!filename.match(/\/_.*\.scss/)) {
		console.log('transform', filename);
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
		// TODO: better find target based on config or sth ?
		const sassResult = sass.compile(filename, { ...opts });
		content = sassResult.css;
	} else {
		console.log('copy', filename);
		content = fs.readFileSync(filename).toString();
	}
	const endPath = filename.replace(CWD, '').replace('src', 'lib');
	const target = path.join(CWD, endPath).replace('.scss', '.css');
	console.log(target);
	fs.writeFileSync(target, content);
}

function findAllSrcFiles(current = srcPath, buff = []) {
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
