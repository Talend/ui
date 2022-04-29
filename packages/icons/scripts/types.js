#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const prettier = require('prettier');

const files = {};
const legacyFiles = {};

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
const legacyIconsSrcFolder = path.join(srcFolder, 'svg');

fs.readdirSync(iconSrcFolder)
	.filter(folder => fs.lstatSync(`${iconSrcFolder}/${folder}`).isDirectory())
	.forEach(folder => {
		files[folder] = [];
		fs.readdirSync(`${iconSrcFolder}/${folder}`).forEach(file => {
			files[folder].push(file);
		});
	});

fs.readdirSync(legacyIconsSrcFolder)
	.filter(folder => fs.lstatSync(`${legacyIconsSrcFolder}/${folder}`).isDirectory())
	.forEach(folder => {
		legacyFiles[folder] = [];
		fs.readdirSync(`${legacyIconsSrcFolder}/${folder}`).forEach(file => {
			legacyFiles[folder].push(file);
		});
	});

fs.writeFileSync(
	path.join(srcFolder, 'icon.ts'),
	prettier.format(
		`export const icons = { ${Object.entries(files)
			.map(
				([size, names]) =>
					`${getTShirtSize(size)} : ${JSON.stringify(
						names.filter(name => !name.includes(' ')).map(name => name.split('.svg')[0]),
					)}`,
			)
			.join(',')} } as const;
export const legacyIcons = ${JSON.stringify(
			Object.keys(legacyFiles).reduce((acc, key) => {
				acc[key] = Object.values(legacyFiles[key]).map(v => v.split('.svg')[0]);
				return acc;
			}, {}),
		)} as const;
export type IconSize = ${Object.keys(files)
			.map(k => `'${getTShirtSize(k)}'`)
			.join(' | ')};
` +
			'export type IconName<S extends IconSize> = keyof typeof icons[S];' +
			'export type NewIcon<S extends IconSize> = { size: S; name: IconName<S> };' +
			'export type LegacyIcon = { name: keyof typeof legacyIcons };' +
			'export type Icon<S extends IconSize> = NewIcon<S> | LegacyIcon;',
		{ singleQuote: true, parser: 'typescript' },
	),
);
