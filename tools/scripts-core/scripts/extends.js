/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { getUserConfigFile } from '../utils/env.js';

const { template } = _;
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
	const rootPath = process.cwd();
	const nodeModulesPath = path.join(rootPath, 'node_modules');
	generateConfigFile({
		configFileNames: ['jest.config.js'],
		defaultConfigFilePath: path.join(rootPath, 'jest.config.js'),
		generateContent() {
			const configPath = utils.path.getPkgRootPath('@talend/scripts-config-jest');
			const presetConfigPath = path.join(configPath, 'jest.config.js');
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
			return jestExtendsTemplate({ presetConfigRelativePath });
		},
	});

	generateConfigFile({
		configFileNames: ['.prettierrc.js'],
		defaultConfigFilePath: path.join(rootPath, '.prettierrc.js'),
		generateContent() {
			const configPath = utils.path.getPkgRootPath('@talend/scripts-config-prettier');
			const presetConfigPath = path.join(configPath, '.prettierrc.js');
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
			const configPath = utils.path.getPkgRootPath('@talend/scripts-config-stylelint');
			const presetConfigPath = path.join(configPath, '.stylelintrc');
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
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
			const configPath = utils.path.getPkgRootPath('@talend/eslint-config');
			const presetConfigPath = path.join(configPath, '.eslintrc.js');
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
			return eslintExtendsTemplate({ presetConfigRelativePath });
		},
	});

	generateConfigFile({
		configFileNames: ['.babelrc', '.babelrc.json', 'babel.config.js'],
		defaultConfigFilePath: path.join(rootPath, '.babelrc.json'),
		generateContent() {
			const configPath = utils.path.getPkgRootPath('@talend/scripts-config-babel');
			const presetConfigPath = path.join(configPath, '.babelrc.json');
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
			return babelExtendsTemplate({ presetConfigRelativePath });
		},
	});

	generateConfigFile({
		configFileNames: ['tsconfig.json'],
		defaultConfigFilePath: path.join(rootPath, 'tsconfig.json'),
		generateContent() {
			const configPath = utils.path.getPkgRootPath('@talend/scripts-config-typescript');
			const presetConfigPath = path.join(configPath, 'tsconfig.json');
			const presetConfigRelativePath = path.relative(nodeModulesPath, presetConfigPath);
			return typescriptExtendsTemplate({ presetConfigRelativePath });
		},
	});

	return { status: 0 };
}
