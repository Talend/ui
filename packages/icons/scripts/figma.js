#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const prettier = require('prettier');

const files = {};

const camelize = s => s.replace(/-./g, x => x[1].toUpperCase());

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

const srcFolder = '../src/icon';

fs.readdirSync(srcFolder)
	.filter(folder => fs.lstatSync(`${srcFolder}/${folder}`).isDirectory())
	.forEach(folder => {
		files[folder] = [];
		fs.readdirSync(`${srcFolder}/${folder}`).forEach(file => {
			files[folder].push(file);
		});
	});

const componentNames = [];

fs.writeFileSync(
	path.join(srcFolder, 'index.js'),
	prettier.format(
		`
/* eslint-disable import/no-unresolved,import/no-webpack-loader-syntax */

${Object.entries(files)
	.map(([size, names]) =>
		names
			.filter(name => !name.includes(' '))
			.map(name => {
				const iconName = name.split('.svg')[0];
				const camelizeIconName = camelize(iconName);
				const componentName = `${camelizeIconName}${size}`;
				componentNames.push(componentName);
				return `import ${componentName} from '!!svg-inline-loader!./${size}/${name}';`;
			})
			.join(''),
	)
	.join('')}

/* eslint-enable import/no-unresolved,import/no-webpack-loader-syntax */

export default {
${Object.entries(files).map(
	([size, names]) =>
		`'${getTShirtSize(size)}': {${names
			.filter(name => !name.includes(' '))
			.map(name => `'${name.split('.svg')[0]}': ${camelize(name.split('.svg')[0])}${size}`)
			.join(',')}}`,
)},
${componentNames.join(',')},
}
`,
		{ singleQuote: true, parser: 'babel' },
	),
);
