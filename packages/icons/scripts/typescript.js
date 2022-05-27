#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const prettier = require('prettier');

const src = require('../src');

const dist = path.join(__dirname, '../dist/');
mkdirp.sync(dist);

const files = {};

const icons = Object.keys(src.svgs)
	.map((key, index) => `    ${index > 0 ? '|' : ''} 'talend-${key}'`)
	.join('\n');

const getTShirtSize = size => {
	switch (size) {
		case '8':
			return 'XS';
		case '12':
			return 'S';
		case '16':
			return 'M';
		case '24':
			return 'L';
		default:
			return 'XL';
	}
};

const srcFolder = path.join(__dirname, '../src');
const iconSrcFolder = path.join(srcFolder, 'icon');

fs.readdirSync(iconSrcFolder)
	.filter(folder => fs.lstatSync(`${iconSrcFolder}/${folder}`).isDirectory())
	.forEach(folder => {
		files[folder] = [];
		fs.readdirSync(`${iconSrcFolder}/${folder}`).forEach(file => {
			files[folder].push(file);
		});
	});

fs.writeFileSync(
	path.join(dist, 'index.d.ts'),
	prettier.format(
		`
/// <reference types="typescript" />

export declare type IconName =
${icons}
    | string;

export declare type LegacyIcon = { name: IconName };

export const icons = { ${Object.entries(files)
			.map(
				([size, names]) =>
					`${getTShirtSize(size)} : ${JSON.stringify(
						names.filter(name => !name.includes(' ')).map(name => name.split('.svg')[0]),
					)}`,
			)
			.join(',')} } as const;

export declare type IconSize = ${Object.keys(files)
			.map(k => `'${getTShirtSize(k)}'`)
			.join(' | ')};

export declare type IconNameWithSize<S extends IconSize> = keyof typeof icons[S];

export declare type Icon<S extends IconSize> = {
    size: S;
    name: IconNameWithSize<S>;
};
`,
		{ singleQuote: true, parser: 'typescript' },
	),
);
