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
		rules: {
			...config.rules,
			'@typescript-eslint/indent': 0,
			'@typescript-eslint/no-var-requires': 0, // we have a lot of CJS files to lint
		},
		overrides: [
			...(config.overrides || []),
			{
				// Disable TS rules for JS files if project uses plugin:@typescript-eslint/recommended-requiring-type-checking
				files: ['*.js'],
				rules: {
					'@typescript-eslint/no-unsafe-return': 'off',
					'@typescript-eslint/no-unsafe-call': 'off',
					'@typescript-eslint/no-unsafe-member-access': 'off',
					'@typescript-eslint/no-unsafe-assignment': 'off',
					'@typescript-eslint/no-unsafe-argument': 'off',
					'@typescript-eslint/restrict-template-expressions': 'off',
					'@typescript-eslint/restrict-plus-operands': 'off',
				},
			},
		],
	});
}

module.exports = config;
