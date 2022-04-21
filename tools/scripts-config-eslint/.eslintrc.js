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
				'airbnb-typescript',
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
} else {
	// support our babel config file
	config.parserOptions.babelOptions = {
		extends: '@talend/scripts-config-babel/.babelrc.json',
	};
}

module.exports = config;
