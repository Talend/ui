/* eslint-disable no-console */
/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import template from 'lodash.template';
import { getPreset } from '../utils/preset.js';
import { getUserConfigFile } from '../utils/env.js';

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

const stylelintExtendsTemplate =
	template(`const defaults = require('<%= presetConfigRelativePath %>');

module.exports = {
  ...defaults,

	// add/change default config here
};`);

const prettierExtendsTemplate =
	template(`const defaults = require('<%= presetConfigRelativePath %>');

module.exports = {
  ...defaults,

	// add/change default config here
};`);

const babelExtendsTemplate = template(`{
  "extends": "<%= presetConfigRelativePath %>"
}
`);

const typescriptExtendsTemplate = template(`{
  "extends": "<%= presetConfigRelativePath %>",
  "include": [
    "src"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ],
  "compilerOptions": {}
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

export default async function extend(env, presetApi) {
	const presetName = presetApi.getUserConfig(['preset'], '@talend/scripts-preset-react-lib');
	const preset = await getPreset(presetName);
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
		configFileNames: ['.prettierrc.js'],
		defaultConfigFilePath: path.join(rootPath, '.prettierrc.js'),
		generateContent() {
			const presetConfigPath = preset.getPrettierConfigurationPath(presetApi);
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
			return prettierExtendsTemplate({ presetConfigRelativePath });
		},
	});

	generateConfigFile({
		configFileNames: [
			'.stylelintrc.js',
			'.stylelintrc.yaml',
			'.stylelintrc.yml',
			'.stylelintrc.json',
			'stylelint.config.js',
			'.stylelintrc',
		],
		defaultConfigFilePath: path.join(rootPath, '.stylelintrc'),
		generateContent() {
			const presetConfigPath = preset.getStylelintConfigurationPath(presetApi);
			const presetConfigRelativePath = path.relative(rootPath, presetConfigPath);
			return stylelintExtendsTemplate({ presetConfigRelativePath });
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

	generateConfigFile({
		configFileNames: ['tsconfig.json'],
		defaultConfigFilePath: path.join(rootPath, 'tsconfig.json'),
		generateContent() {
			const presetConfigPath = preset.getTypescriptConfigurationPath(presetApi);
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
			return typescriptExtendsTemplate({ presetConfigRelativePath });
		},
	});

	return { status: 0 };
}
