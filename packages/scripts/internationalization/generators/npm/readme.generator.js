const fs = require('fs');
const path = require('path');
const template = require('lodash.template');

const { printInfo, printRunning, printSuccess } = require('../../common/log');

const readmeTemplate = template(`
# <%= project %> locales

This module contains i18n files for <%= project %> project.

## How to install
\`\`\`
yarn install @talend/locales-<%= normalizedName %>
\`\`\`

## How to use with i18next

### Synchronous use

i18n.js
\`\`\`javascript
import i18n from 'i18next';

import merge from 'lodash.merge';

import {
	namespaces as <%= minimalName %>Namespaces,
	locales as <%= minimalName %>Locales,
} from '@talend/locales-<%= normalizedName %>';

i18n
	.init({
		ns: [
			...<%= minimalName %>Namespaces,
			...myProjectNamespaces
		],
		resources: merge(<%= minimalName %>Locales, myProjectLocales),
	});

export default i18n;
\`\`\`

### Asynchronous use
For async load, you need to copy the i18n files to the location you want to serve them

webpack.config.js
\`\`\`javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	plugins: [
		new CopyWebpackPlugin([
			{ from: 'node_modules/@talend/locales-<%= normalizedName %>/locales', to: 'assets/locales' },
		]),
	]
}
\`\`\`

i18n.js
\`\`\`javascript
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

import {
	namespaces as <%= minimalName %>Namespaces,
	locales as <%= minimalName %>Locales,
} from '@talend/locales-<%= normalizedName %>';

i18n
	.use(XHR)
	.init({
		ns: [
			...<%= minimalName %>Namespaces,
			...myProjectNamespaces
		],
		backend: {
			loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
		},
	});

export default i18n;
\`\`\`
`);

module.exports = function generateReadme(options) {
	const readmePath = path.join(options.localesRepoPath, 'README.md');

	if (fs.existsSync(readmePath)) {
		printInfo('README already exists --> skip README generation');
		return;
	}

	printRunning('Generating README.md');
	fs.writeFileSync(
		readmePath,
		readmeTemplate({
			...options,
			minimalName: options.normalizedName.replace(/\W/g, ''),
		}),
	);
	printSuccess(`README.md saved to ${readmePath}`);
};
