const fs = require('fs');
const { merge } = require('lodash');
const path = require('path');

const { fixWindowsPaths } = require('./utils');

const cwd = process.cwd();

function getFolderGlob(folderName) {
	return path.join(cwd, folderName, '**/*.@(stories.js|stories.jsx|stories.tsx|mdx)');
}

function getStoriesFolders() {
	const storiesFolders = [getFolderGlob('src')];
	if (fs.existsSync(path.join(cwd, 'stories'))) {
		storiesFolders.push(getFolderGlob('stories'));
	}
	return storiesFolders;
}

const defaultMain = {
	framework: {
		name: '@storybook/react-vite',
	},
	typescript: {
		reactDocgen: false,
		check: false,
	},
	core: {
		enableCrashReports: false,
		disableTelemetry: true,
	},
	features: {
		buildStoriesJson: true,
	},
	stories: getStoriesFolders(),
	staticDirs: [path.join(__dirname, 'msw'), require.resolve('@talend/icons').replace('index.js', '').replace('/dist/TalendIcons.js', '/dist/svg-bundle')],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-links',
	],
};

const temp_userMain = <%  if(userFilePath) { %> require(String.raw`<%= userFilePath %>`); <% } else { %> {}; <% } %>

const userMain = temp_userMain.default || {};

let stories = fixWindowsPaths([...(userMain.stories || defaultMain.stories)]);

module.exports  = {
	...defaultMain,
	features: merge(defaultMain.features, userMain.features),
	stories,
	addons: [...defaultMain.addons, ...(userMain.addons || [])],
	core: merge(defaultMain.core, userMain.core),
	typescript: merge(defaultMain.typescript, userMain.typescript),
	staticDirs: fixWindowsPaths([...(defaultMain.staticDirs|| []), ...(userMain.staticDirs || [])]),
};

