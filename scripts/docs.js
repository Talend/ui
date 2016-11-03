#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const lib = require('../src');

const BODY_TPL = (icons) => `
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Talend SVG Icons demo</title>
		<style>
			ul {
				list-style-type: none;
			}
			li {
				margin: 20px;
				float: left;
				width: 200px;
			}
			li > svg {
				display: block;
			}
			li > span {
				display: block;
				margin-top: 10px;
			}
		</style>
	</head>
	<body>
		<h1>Talend SVG icons demo</h1>
		<ul>
			${icons}
		</li>
	</body>
</html>
`;

const buff = Object.keys(lib.svgs).map((key) => {
	let svg = `<li><svg width="3em" height="3em">${lib.svgs[key]}</svg> <span>${key}</span></li>`;
	return `${svg}`;
});

const dist = path.join(__dirname, '../docs/');
mkdirp.sync(dist);

const icons = buff.join('\n');
fs.writeFileSync(path.join(dist, 'index.html'), BODY_TPL(icons));
