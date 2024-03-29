#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const babel = require('@babel/core');

const defaultOptions = require('@talend/scripts-config-babel/babel.config.js');
const src = require('../src');
const info = require('../src/info').info;
const infoFromFigma = require('../src/info').infoFromFigma;
const extract = require('../src/extract');

const dist = path.join(__dirname, '../dist/');
mkdirp.sync(path.join(dist, 'svg-bundle'));

function transform(lib, output) {
	const options = Object.assign({}, defaultOptions, { filename: output });
	const buff = Object.keys(lib.svgs)
		.map(key => {
			const svg = `${lib.svgs[key]}`
				.replace(/class/g, 'className')
				.replace(/fill-rule/g, 'fillRule')
				.replace(/stop-color/g, 'stopColor');
			return `icons['talend-${key}'] = (${svg});`;
		})
		.concat(
			Object.keys(lib.filters || {}).map(key => {
				const svg = `${lib.filters[key]}`.replace(
					/color-interpolation-filters/g,
					'colorInterpolationFilters',
				);
				return `filters['${key}'] = (${svg});`;
			}),
		);
	buff.unshift('');
	buff.unshift('const icons = {};');
	if (lib.filters) {
		buff.unshift('const filters = {};');
	}
	buff.unshift("import React from 'react';");
	buff.push('');
	buff.push('export default icons;');
	if (lib.filters) {
		buff.push('export { filters };');
	}

	const code = babel.transformSync(buff.join('\n'), options);
	fs.writeFileSync(path.join(dist, output), code.code);
	fs.writeFileSync(path.join(dist, output.replace('.js', '.esm.js')), buff.join('\n'));
}

function createSvgBundles() {
	const bundles = new Set(Object.values(info).map(({ parent }) => parent));
	const save = bundle => {
		const lib = extract.default(`../src/svg/${bundle}`);
		const buff = Object.keys(lib).map(key => `<symbol id="talend-${key}">${lib[key]}</symbol>`);
		buff.unshift('');
		buff.unshift('<svg xmlns="http://www.w3.org/2000/svg" focusable="false" class="sr-only">');
		buff.push('</svg>');
		fs.writeFileSync(path.join(dist, `../dist/svg-bundle/${bundle}.svg`), buff.join(''));
	};
	bundles.forEach(save);
}

function createIconBundles() {
	const bundles = [...new Set(Object.values(infoFromFigma).map(({ parent }) => parent))];
	const save = bundle => {
		const lib = extract.default(`../src/icon/${bundle}`);
		const buff = Object.keys(lib).map(key => `<symbol id="${key}">${lib[key]}</symbol>`);
		buff.unshift('');
		buff.unshift('<svg xmlns="http://www.w3.org/2000/svg" focusable="false" class="sr-only">');
		buff.push('</svg>');
		fs.writeFileSync(path.join(dist, `../dist/svg-bundle/${bundle}.svg`), buff.join(''));
	};
	bundles.forEach(save);
}

function createSvgFilters() {
	const buff = Object.keys(src.filters).map(id => src.filters[id]);
	buff.unshift('<svg xmlns="http://www.w3.org/2000/svg" focusable="false" class="sr-only">');
	buff.push('</svg>');
	fs.writeFileSync(path.join(dist, '../dist/svg-bundle/filters.svg'), buff.join(''));
}

function createAllInOneBundle() {
	let buff = Object.keys(src.filters).map(id => src.filters[id]);
	buff = buff.concat(
		Object.keys(src.svgs).map(id => `<symbol id="talend-${id}">${src.svgs[id]}</symbol>`),
	);
	buff.unshift('<svg xmlns="http://www.w3.org/2000/svg" focusable="false" class="sr-only">');
	buff.push('</svg>');
	fs.writeFileSync(path.join(dist, '../dist/svg-bundle/all.svg'), buff.join(''));
}

function createGetIconHref() {
	const options = Object.assign({}, defaultOptions, { filename: 'info.js' });
	const buff = Object.keys(info).map(key => `  "talend-${key}": "${info[key].parent || ''}",`);
	buff.unshift('export const info = {');
	buff.push('};');
	buff.push('export const infoFromFigma = {');
	buff.push(
		Object.keys(infoFromFigma).map(key => `  "${key}": "${infoFromFigma[key].parent || ''}"`),
	);
	buff.push('};');
	buff.push('export function getIconHref(name) {');
	buff.push('  return info[name] ? `/${info[name]}.svg#${name}` : `#${name}`;');
	buff.push('}');
	const code = babel.transformSync(buff.join('\n'), options);
	fs.writeFileSync(path.join(dist, 'info.js'), code.code);
}

createGetIconHref();
createSvgBundles();
createIconBundles();
createSvgFilters();
createAllInOneBundle();
transform(src, 'react.js');

const styleSrc = path.join(__dirname, '../src/talendicons.css');
const styleDist = path.join(__dirname, '../dist/talendicons.css');
fs.createReadStream(styleSrc).pipe(fs.createWriteStream(styleDist));
