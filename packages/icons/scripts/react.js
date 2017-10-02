#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const lib = require('../src');

const buff = Object.keys(lib.svgs).map((key) => {
	const svg = `${lib.svgs[key]}`
		.replace(/class/g, 'className')
		.replace(/fill-rule/g, 'fillRule');
	return `icons['talend-${key}'] = (${svg});`;
});
buff.unshift('');
buff.unshift("const icons = {};");
buff.unshift("import React from 'react';");
buff.push('');
buff.push('export default icons');

const dist = path.join(__dirname, '../dist/');
mkdirp.sync(dist);
const options = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));
const code = require("babel-core").transform(buff.join('\n'), options);
fs.writeFileSync(path.join(dist, 'react.js'), code.code);

const styleSrc = path.join(__dirname, '../src/talendicons.css');
const styleDist = path.join(__dirname, '../dist/talendicons.css');
fs.createReadStream(styleSrc).pipe(fs.createWriteStream(styleDist));
