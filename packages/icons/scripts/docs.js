#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const lib = require('../src');

const HTML_TPL = (icons, style) => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Talend SVG icons</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<link rel="stylesheet" href="/theme/dist/bootstrap.css" media="screen">
		<style>
			ul {
				display: flex;
				flex-wrap: wrap;
				list-style-type: none;
			}
			li {
				flex-basis: 10%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 5px;
			}
			li > span {
				margin-top: 10px;
			}
			${style}
		</style>
	</head>
	<body>
		<h1>Talend SVG icons demo</h1>
		<ul>
			${icons}
		</ul>
	</body>
</html>
`;

const buff = Object.keys(lib.svgs).map(key => `<li class="well well-sm"><svg width="3em" height="3em">${lib.svgs[key]}</svg><span>${key}</span></li>`);

const dist = path.join(__dirname, '../docs/');
mkdirp.sync(dist);

const stylePath = path.join(__dirname, '../src/talendicons.css');
const style = fs.readFileSync(stylePath, 'utf8');

const icons = buff.join('\n');
fs.writeFileSync(path.join(dist, 'index.html'), HTML_TPL(icons, style));
