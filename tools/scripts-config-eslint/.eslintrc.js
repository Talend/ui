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
	delete config.parserOptions;
	const TO_REMOVE = ['plugin:import/recommended'];
	Object.assign(config, {
		parser: '@typescript-eslint/parser',
		extends: config.extends
			.concat([
				'airbnb-typescript',
				'plugin:import/typescript',
				'plugin:@typescript-eslint/recommended',
				'prettier/@typescript-eslint',
			])
			.filter(i => !TO_REMOVE.includes(i)),
		plugins: config.plugins.concat(['@typescript-eslint']),
		parserOptions: {
			project: './tsconfig.json',
			tsconfigRootDir: cwd,
		},
	});
}

console.log('eslintrc.js configuration content: ', JSON.stringify(config, null, 2));
module.exports = config;
