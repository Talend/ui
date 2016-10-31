#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const lib = require('../src');

const buff = Object.keys(lib.svgs).map((key) => {
	let svg = `${lib.svgs[key]}`;
	svg = svg.replace(/class/g, 'className');
	return `icons['talend-${key}'] = (${svg});`;
});
buff.unshift('');
buff.unshift("const icons = {};");
buff.unshift("import React from 'react';");
buff.push('');
buff.push('export default icons');

const dist = path.join(__dirname, '../dist/');
mkdirp.sync(dist);
const options = {
	presets: ["es2015", "react"]
};
const code = require("babel-core").transform(buff.join('\n'), options);
fs.writeFileSync(path.join(dist, 'react.js'), code.code);
