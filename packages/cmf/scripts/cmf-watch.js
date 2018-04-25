#!/usr/bin/env node
const path = require('path'); // eslint-disable-line
const chokidar = require('chokidar'); // eslint-disable-line
const Prompt = require('prompt-checkbox'); // eslint-disable-line

const {
	getCmfConfig,
	handleFileChange,
	buildAndCopyJS,
	rebuildSettings,
} = require('./cmf-watch.utils');

const defaultConf = {
	buildCommand: 'yarn run prepublish',
	libFolder: 'lib',
	srcFolder: 'src',
	hasCmfConf: false,
};

/**
 * This function scan the current folder to search for cmf.json file
 * & return the content of this file
 */

const configuration = getCmfConfig();
const choices = {};
const deps = {};
Object.keys(configuration.copylib).forEach(category => {
	choices[category] = [];
	Object.keys(configuration.copylib[category]).forEach(dep => {
		choices[category].push(dep);
		deps[dep] = { ...defaultConf, ...configuration.copylib[category][dep] };
	});
});

const prompt = new Prompt({
	limit: 20,
	name: 'libs',
	message: 'What lib do you want to copylib ?',
	choices,
});

/**
 * this function launch the file watcher
 * @param {array} libs list of libs we want to follow
 */
const launchWatchers = libs => {
	const mapJs = libs.map(lib => `${deps[lib].path}/${deps[lib].srcFolder}/**/*.js`);
	const mapScss = libs.map(lib => `${deps[lib].path}/${deps[lib].srcFolder}/**/*.scss`);
	const mapJson = libs
		.filter(lib => deps[lib].hasCmfConf)
		.map(lib => `${deps[lib].path}/${deps[lib].srcFolder}/**/*.json`);

	const allWatchers = [].concat(mapJs, mapScss, mapJson);

	console.log('Launching watchers');
	chokidar
		.watch(allWatchers, {
			ignoreInitial: true,
		})
		.on('all', (event, file) => {
			handleFileChange(deps, event, file);
		});
};

const handleAnswers = answers => {
	prompt.ui.close();
	const libs = answers.filter(item => !Object.keys(choices).includes(item));

	const builds = libs.map(lib => buildAndCopyJS(lib, deps[lib]));
	Promise.all(builds).then(() => {
		console.log('all builded');
		rebuildSettings();
		launchWatchers(libs);
	});
};

prompt.run().then(handleAnswers);
