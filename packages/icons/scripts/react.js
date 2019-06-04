#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const babel = require('@babel/core');
const src = require('../src');
const brands = require('../src/brands');
const components = require('../src/components');
const core = require('../src/core');
const files = require('../src/files');
const flows = require('../src/flows');
const processors = require('../src/products');
const products = require('../src/products');
const defaultOptions = require('../../../babel.config')();

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
}

function toSVG(lib, output) {
	const buff = Object.keys(lib.svgs).map(key => `<symbol id="${key}">${lib.svgs[key]}<symbol>`);
	buff.unshift('');
	buff.unshift('<svg xmlns="http://www.w3.org/2000/svg" focusable="false" className="sr-only">');
	buff.push('<svg>');
	fs.writeFileSync(path.join(dist, output), buff.join('\n'));
}

transform(src, 'react.js');
toSVG(brands, 'svg-bundle/brands.svg');
toSVG(components, 'svg-bundle/components.svg');
toSVG(core, 'svg-bundle/core.svg');
toSVG(files, 'svg-bundle/files.svg');
toSVG(flows, 'svg-bundle/flows.svg');
toSVG(processors, 'svg-bundle/processors.svg');
toSVG(products, 'svg-bundle/products.svg');

const styleSrc = path.join(__dirname, '../src/talendicons.css');
const styleDist = path.join(__dirname, '../dist/talendicons.css');
fs.createReadStream(styleSrc).pipe(fs.createWriteStream(styleDist));
