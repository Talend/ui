const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const isTS = fs.existsSync(path.join(cwd, 'tsconfig.json'));
const removeComment = /\/\/.*/g;
const content = fs
	.readFileSync(path.join(__dirname, '.eslintrc'))
	.toString()
	.replace(removeComment, '');
const config = JSON.parse(content);

if (isTS) {
	const TO_REMOVE = ['plugin:import/recommended'];
	Object.assign(config, {
		parser: '@typescript-eslint/parser',
		extends: config.extends
			.concat([
				'plugin:import/typescript',
				'plugin:@typescript-eslint/recommended',
				'prettier/@typescript-eslint',
			])
			.filter(i => !TO_REMOVE.includes(i)),
		plugins: config.plugins.concat(['@typescript-eslint']),
		parserOptions: {
			project: ['./tsconfig.json'],
			tsconfigRootDir: cwd,
		},
	});
}

module.exports = config;
