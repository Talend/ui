#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const src = require('../src');

const files = {};

const icons = Object.keys(src.svgs)
	.map((key, index) => `    ${index > 0 ? '|' : ''} 'talend-${key}'`)
	.join('\n');

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
	path.join(srcFolder, 'Figma.ts'),
	prettier.format(
		`
export declare type IconName =
${icons}
    | string;

export declare type LegacyIcon = { name: IconName };

export const sizes = ${JSON.stringify(Object.keys(files))} as const;

export const icons = { ${Object.entries(files)
			.map(
				([size, names]) =>
					`${size} : ${JSON.stringify(
						names.filter(name => !name.includes(' ')).map(name => name.split('.svg')[0]),
					)}`,
			)
			.join(',')} } as const;

export declare type IconSize = ${Object.keys(files)
			.map(k => `'${k}'`)
			.join(' | ')};

export declare type IconNameWithSize<S extends IconSize> = typeof icons[S][number];

export declare type Icon<S extends IconSize> = {
    size: S;
    name: IconNameWithSize<S>;
};
`,
		{ singleQuote: true, parser: 'typescript' },
	),
);
