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

const babelExtendsTemplate = template(`{
  "extends": "./<%= babelConfigRelativePath %>"
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
	if (!fs.existsSync(userEslintPath)) {
		const eslintConfigPath = preset.getEslintConfigurationPath(presetApi);
		const eslintConfigRelativePath = path.relative(rootPath, eslintConfigPath);
		const eslintExtendsCode = eslintExtendsTemplate({ eslintConfigRelativePath });
		fs.writeFileSync(userEslintPath, eslintExtendsCode);
		console.log('✅ .eslintrc created.');
	} else {
		console.log(
			'❌ .eslintrc already exists in your project folder. Skip eslint extension creation.',
		);
	}
	// TODO: make eslint get the one from root if present

	const userBabelrcPath = path.join(process.cwd(), '.babelrc');
	const userBabelrcJsonPath = path.join(process.cwd(), '.babelrc.json');
	const userBabelJsPath = path.join(process.cwd(), 'babel.config.js');
	if (
		!fs.existsSync(userBabelrcPath) &&
		!fs.existsSync(userBabelrcJsonPath) &&
		!fs.existsSync(userBabelJsPath)
	) {
		const babelConfigPath = preset.getBabelConfigurationPath(presetApi);
		const babelConfigRelativePath = path.relative(rootPath, babelConfigPath);
		const babelExtendsCode = babelExtendsTemplate({ babelConfigRelativePath });
		fs.writeFileSync(userBabelrcJsonPath, babelExtendsCode);
		console.log('✅ .babelrc.json created.');
	} else {
		console.log(
			'❌ (.babelrc | .babelrc.json | babel.config.js) already exists in your project folder. Skip babel extension creation.',
		);
	}
	// TODO: move (in fact copy) babelrc resolver to build-lib.js

	return { status: 0 };
};
