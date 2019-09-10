const fs = require('fs');
const path = require('path');
const template = require('lodash.template');
const { getPreset } = require('../utils/preset');
const { getUserConfigFile } = require('../utils/env');

const jestExtendsTemplate = template(`const defaults = require('<%= presetConfigRelativePath %>');

module.exports = {
	...defaults,

	// add/change default config here
};
`);

const eslintExtendsTemplate = template(`{
  "extends": "./<%= presetConfigRelativePath %>"
}
`);

const babelExtendsTemplate = template(`{
  "extends": "<%= presetConfigRelativePath %>"
}
`);

function generateConfigFile({ configFileNames, defaultConfigFilePath, generateContent }) {
	const userConfigFilePath = getUserConfigFile(configFileNames);
	if (userConfigFilePath) {
		const fileName = path.basename(userConfigFilePath);
		console.log(`❌ ${fileName} already exists in your project folder. Skip extension creation.`);
		return;
	}

	fs.writeFileSync(defaultConfigFilePath, generateContent());
	const fileName = path.basename(defaultConfigFilePath);
	console.log(`✅ ${fileName} created.`);
}

module.exports = function test(env, presetApi) {
	const presetName = presetApi.getUserConfig(['preset'], 'talend');
	const preset = getPreset(presetName);
	const rootPath = process.cwd();
	const nodeModulesPath = path.join(rootPath, 'node_modules');

	generateConfigFile({
		configFileNames: ['jest.config.js'],
		defaultConfigFilePath: path.join(rootPath, 'jest.config.js'),
		generateContent() {
			const presetConfigPath = preset.getJestConfigurationPath(presetApi);
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
			return jestExtendsTemplate({ presetConfigRelativePath });
		},
	});

	generateConfigFile({
		configFileNames: [
			'.eslintrc.js',
			'.eslintrc.yaml',
			'.eslintrc.yml',
			'.eslintrc.json',
			'.eslintrc',
		],
		defaultConfigFilePath: path.join(rootPath, '.eslintrc'),
		generateContent() {
			const presetConfigPath = preset.getEslintConfigurationPath(presetApi);
			const presetConfigRelativePath = path.relative(rootPath, presetConfigPath);
			return eslintExtendsTemplate({ presetConfigRelativePath });
		},
	});

	generateConfigFile({
		configFileNames: ['.babelrc', '.babelrc.json', 'babel.config.js'],
		defaultConfigFilePath: path.join(rootPath, '.babelrc.json'),
		generateContent() {
			const presetConfigPath = preset.getBabelConfigurationPath(presetApi);
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
			return babelExtendsTemplate({ presetConfigRelativePath });
		},
	});

	return { status: 0 };
};
