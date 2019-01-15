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
\`\`\`javascript
// i18n.js
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

`);

module.exports = function generateReadme(projectPath, options) {
	const readmePath = path.join(projectPath, 'README.md');

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
