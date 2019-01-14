const fs = require('fs');
const path = require('path');
const template = require('lodash.template');

const { printInfo, printRunning, printSuccess } = require('../../common/log');

const readmeTemplate = template(`
# <%= project %> locales

This module contains i18n files for <%= project %> project.

## How to install
\`\`\`
yarn install @talend/locales-<%= projectLowerCase %>
\`\`\`

## How to use with i18next
\`\`\`javascript
// i18n.js
import i18n from 'i18next';

import merge from 'lodash.merge';

import {
	namespaces as <%= projectNormalized %>Namespaces,
	locales as <%= projectNormalized %>Locales,
} from '@talend/locales-<%= projectLowerCase %>';

i18n
	.init({
		ns: [
			...<%= projectNormalized %>Namespaces,
			...myProjectNamespaces
		],
		resources: merge(<%= projectNormalized %>Locales, myProjectLocales),
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
			projectLowerCase: options.project.toLowerCase(),
			projectNormalized: options.project.replace(/\W/g, ''),
		}),
	);
	printSuccess(`README.md saved to ${readmePath}`);
};
