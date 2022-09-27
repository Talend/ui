#!/usr/bin/env node

// https://babeljs.io/docs/en/babel-parser
const babelParser = require('@babel/parser');
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();

const scssRE = /import.*from\ \'(\..*\.scss)\'\;/;

function transform(filename) {
	console.log(filename);
	const fileContent = fs.readFileSync(filename).toString();
	if (!fileContent.includes('.scss')) {
		console.log(filename, 'scss module not found');
		return;
	}
	console.log(filename, 'scss module found !');
	const newLines = fileContent.split('\n').map(line => {
		const match = line.match(scssRE);
		if (match === null) {
			return line;
		}
		if (line.includes('.module.')) {
			return line;
		}
		const scssFileName = match[1];
		const scssFilePath = path.join(path.dirname(filename), scssFileName);
		if (fs.existsSync(scssFilePath)) {
			fs.renameSync(scssFilePath, scssFilePath.replace('.scss', '.module.scss'));
		}
		return line.replace('.scss', '.module.scss');
	});

	//TODO rename this file
	fs.writeFileSync(filename, newLines.join('\n'));
}

const EXTENSIONS = /\.(js|ts|tsx)$/;

function findAllSrcFiles(
	current = path.join(CWD, process.argv[process.argv.length - 1]),
	buff = [],
) {
	return fs.readdirSync(current, { withFileTypes: true }).reduce((acc, info) => {
		if (info.isDirectory()) {
			return acc.concat(findAllSrcFiles(path.join(current, info.name)));
		}
		if (info.name.match(EXTENSIONS)) {
			acc.push(path.join(current, info.name));
		}
		return acc;
	}, buff);
}
const result = findAllSrcFiles();

result.forEach(filename => {
	transform(filename);
});
