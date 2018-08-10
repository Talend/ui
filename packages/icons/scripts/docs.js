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
			form {
				margin-left: 47px;
			}
			${style}
			.colormapping > svg > g {
				filter: url(#colormapping);
			}
			.colormapping:hover > svg > g {
				filter: none;
			}

			.gammacolormapping {
				filter: url(#gamma-color-mapping);
			}
			.gammacolormapping:hover {
				filter: none;
			}
		</style>
		<script>
			function setSize(size) {
				var elements = document.querySelectorAll('li svg');
				for (var i = 0; i < elements.length; i++) {
					var icon = elements[i];
					icon.setAttribute('width', size);
					icon.setAttribute('height', size);
				}
			}
			function setFilter(filter) {
				var elements = document.querySelectorAll('li > svg');
				for (var i = 0; i < elements.length; i++) {
					var icon = elements[i];
					icon.setAttribute('class', filter);
				}
			}
			function filter(term) {
				var hiddens = document.querySelectorAll('.hidden');
				for (var i = 0; i < hiddens.length; i++) {
					var icon = hiddens[i];
					icon.className = "well well-sm";
				}
				if (term) {
					var elements = document.querySelectorAll('li svg');
					for (var i = 0; i < elements.length; i++) {
						var icon = elements[i];
						if (icon.id.indexOf(term) === -1) {
							icon.parentElement.className += " hidden";
						}
					}
				}
			}
		</script>
	</head>
	<body>
		<h1>Talend SVG icons demo</h1>
		<form class="form-inline">
			<div class="form-group">
				<label for="select-size" class="sr-only">Icon size</label>
				<select id="select-size" class="form-control" onchange="setSize(this.value)" style="width:135px">
					<option value="0.8rem">xs</option>
					<option value="1.2rem">sm</option>
					<option value="1.6rem">md</option>
					<option value="2.4rem" selected>lg</option>
				</select>
			</div>
			<div class="form-group">
				<label for="select-filter" class="sr-only">Select filter</label>
				<select id="select-filter" class="form-control" onChange="setFilter(this.value)">
					<option value="no-filter">No filter</option>
					<option value="colormapping">Color mapping</option>
					<option value="gammacolormapping">Gamma color mapping</option>
				</select>
			</div>
			<div class="form-group">
				<label for="search-icon" class="sr-only">search</label>
				<input id="search-icon" type="text" oninput="filter(this.value)" class="form-control" placeholder="search" style="width: 280px; margin-left: 7px" />
			</div>
		</form>
		<ul>
			${icons}
		</ul>
		<svg>
			<filter id="colormapping" color-interpolation-filters="sRGB">
				<feColorMatrix in="SourceGraphic" type="saturate" values="0" result="grayscale" />
				<feColorMatrix in="grayscale" type="matrix" values="0.64 0 0 0 0.36
					0.47 0 0 0 0.53
					0.33 0 0 0 0.67
					0 0 0 1 0" />
			</filter>
		</svg>
	</body>
</html>
`;

let buff = Object.keys(lib.svgs).map(
	key =>
		`<li class="well well-sm"><svg width="2.4rem" height="2.4rem" id=${key}>${
			lib.svgs[key]
		}</svg><span>${key}</span></li>`,
);

buff = buff.concat(Object.keys(lib.filters).map(key => `${lib.filters[key]}`));

const dist = path.join(__dirname, '../docs/');
mkdirp.sync(dist);

const stylePath = path.join(__dirname, '../src/talendicons.css');
const style = fs.readFileSync(stylePath, 'utf8');

const icons = buff.join('\n');
fs.writeFileSync(path.join(dist, 'index.html'), HTML_TPL(icons, style));
