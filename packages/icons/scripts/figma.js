#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const files = {};

const camelize = s => s.replace(/-./g, x => x[1].toUpperCase());
const getTshirtSize = size => {
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

fs.readdirSync('../src/icon')
	.filter(folder => fs.lstatSync(`../src/icon/${folder}`).isDirectory())
	.forEach(folder => {
		files[folder] = [];
		fs.readdirSync(`../src/icon/${folder}`).forEach(file => {
			files[folder].push(file);
		});
	});

const componentNames = [];

fs.writeFileSync(
	path.join('../src/icon', 'index.js'),
	`
${Object.entries(files)
	.map(([size, names]) =>
		names
			.filter(name => !name.includes(' '))
			.map(name => {
				const componentName = `${camelize(name.split('.svg')[0])}${size}`;
				componentNames.push(componentName);
				return `import ${camelize(name.split('.svg')[0])}${size} from './${size}/${name}';`;
			})
			.join('\n'),
	)
	.join('\n\n')}

export default {
${Object.entries(files).map(
	([size, names]) =>
		`${getTshirtSize(size)} : {${names
			.filter(name => !name.includes(' '))
			.map(name => `'${name.split('.svg')[0]}': ${camelize(name.split('.svg')[0])}${size}`)
			.join(',\n')}}\n`,
)},
${componentNames.map(componentName => `  ${componentName}`).join(',\n')}
};
`,
);
