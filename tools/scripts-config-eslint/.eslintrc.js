const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const isTS = fs.existsSync(path.join(cwd, 'tsconfig.json'));
const commentsRegex = /\/\/.*/g;
const content = fs
	.readFileSync(path.join(__dirname, '.eslintrc'))
	.toString()
	.replace(commentsRegex, '');
const config = JSON.parse(content);

if (isTS) {
	delete config.parserOptions;
	const TO_REMOVE = ['plugin:import/recommended'];
	Object.assign(config, {
		parser: '@typescript-eslint/parser',
		extends: config.extends
			.concat([
				'airbnb-typescript',
				'plugin:import/typescript',
				'plugin:@typescript-eslint/recommended',
			])
			.filter(i => !TO_REMOVE.includes(i)),
		plugins: config.plugins.concat(['@typescript-eslint']),
		parserOptions: {
			project: './tsconfig.json',
			tsconfigRootDir: cwd,
		},
	});
}

module.exports = config;
