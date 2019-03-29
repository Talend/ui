const fs = require('fs');
const path = require('path');
const template = require('lodash.template');
const { getPreset } = require('../utils/preset');

const jestExtendsTemplate = template(`const { defaults } = require('<%= jestConfigRelativePath %>');

module.exports = {
	...defaults,

	// add/change default config here
};`);

const eslintExtendsTemplate = template(`{
  "extends": "./<%= eslintConfigRelativePath %>"
}`);

module.exports = function test(env, presetApi) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const rootPath = process.cwd();
	const nodeModulesPath = path.join(rootPath, 'node_modules');

	const userJestPath = path.join(rootPath, 'jest.config.js');
	if (!fs.existsSync(userJestPath)) {
		const jestConfigPath = preset.getJestConfigurationPath(presetApi);
		const jestConfigRelativePath = path.relative(nodeModulesPath, jestConfigPath);
		const jestExtendsCode = jestExtendsTemplate({ jestConfigRelativePath });
		fs.writeFileSync(userJestPath, jestExtendsCode);
		console.log('✅ jest.config.js created.');
	} else {
		console.log(
			'❌ jest.config.js already exists in your project folder. Skip jest extension creation.',
		);
	}
	// TODO: make jest get the one from root if present

	const userEslintPath = path.join(rootPath, '.eslintrc');
	console.log({ userEslintPath });
	if (!fs.existsSync(userEslintPath)) {
		const eslintConfigPath = preset.getEslintConfigurationPath(presetApi);
		console.log(eslintConfigPath);
		const eslintConfigRelativePath = path.relative(rootPath, eslintConfigPath);
		console.log(eslintConfigRelativePath);
		const eslintExtendsCode = eslintExtendsTemplate({ eslintConfigRelativePath });
		console.log(eslintExtendsCode);
		fs.writeFileSync(userEslintPath, eslintExtendsCode);
		console.log('✅ .eslintrc created.');
	} else {
		console.log(
			'❌ .eslintrc already exists in your project folder. Skip eslint extension creation.',
		);
	}
	// TODO: make eslint get the one from root if present

	return { status: 0 };
};
