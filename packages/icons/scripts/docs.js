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
		<link rel="stylesheet" href="/icons/dist/talend-icons-webfont.css" media="screen">
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

			.grayscale > svg > g {
				filter: url(#talend-grayscale);
			}
			.grayscale:hover > svg > g {
				filter: none;
			}
			.icon {
				display: none;
				font-size: 2.4rem;
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
			function asFont(toggle) {
			    const checked = toggle.checked
			    const svg = document.querySelectorAll('li > svg');
			    const text = document.querySelectorAll('li > i');
			    svg.forEach(s => {
			        if (checked) {
			        	s.style = 'display: none';
			        } else {
			       		s.style = 'display: block';
			        }
			    });
			    text.forEach(i => {
			        if (checked) {
			        	i.style = 'display: block';
			        } else {
			       		i.style = 'display: none';
			        }
			    });
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
					<option value="grayscale">grayscale</option>
				</select>
			</div>
			<div class="form-group">
				<label for="search-icon" class="sr-only">search</label>
				<input id="search-icon" type="text" oninput="filter(this.value)" class="form-control" placeholder="search" style="width: 280px; margin-left: 7px" />
			</div>
			<div class="form-group">
				<div class="checkbox">
					<label>
						<input type="checkbox" onchange="asFont(this)" checked=""><span>Render as font</span>
					</label>
				</div>
			</div>
		</form>
		<ul>
			${icons}
		</ul>
	</body>
</html>
`;

const buff = Object.keys(lib.svgs)
	.map(
		key =>
			`<li class="well well-sm"><svg width="2.4rem" height="2.4rem" id=${key}>${lib.svgs[key]}</svg><i class="icon icon-${key}"></i><span>${key}</span></li>`,
	)
	.concat(Object.keys(lib.filters).map(key => `${lib.filters[key]}`));

const dist = path.join(__dirname, '../docs/');
mkdirp.sync(dist);

const stylePath = path.join(__dirname, '../src/talendicons.css');
const style = fs.readFileSync(stylePath, 'utf8');

const icons = buff.join('\n');
fs.writeFileSync(path.join(dist, 'index.html'), HTML_TPL(icons, style));
