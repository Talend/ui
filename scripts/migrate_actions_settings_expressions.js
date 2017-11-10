#!/usr/bin/env node

const fs = require('fs');
const pathLib = require('path');
const program = require('commander');

const stack_version = program.stack || require('../lerna.json').version;

program
	.version(stack_version)
	.option('-d, --debug', 'display more info')
	.option('-q, --quiet', 'do not display logs')
	.option('-p, --path [value]', 'path of the settings.json to update')
	.option('-f, --folder [value]', 'path of the folder containain json to update');

program.on('--help', () => {
	console.log('To update your project settings : ');
	console.log('>node bin/version.js --path ../yourapp/settings.json');
	console.log('If your project use a folder with multiple json');
	console.log('>node version.js --folder ../yourapp/settings');
});

program.parse(process.argv);

if (!program.path && !program.folder) {
	throw new Error('You must path either -p or -f');
}

if (program.debug) {
	console.log(`use stack version ${stack_version}`);
}


const JSONs = [];

function readFolderContent(folder) {
	console.log('scan ', folder)
	fs.readdirSync(folder).forEach((path) => {
		const fullpath = pathLib.join(folder, path);
		if (path.endsWith('.json')) {
			JSONs.push(fullpath);
		} else {
			readFolderContent(fullpath);
		}
	});
	console.log('found ', JSONs);
}

if (program.path) {
	JSONs.push(program.path);
} else if (program.folder) {
	readFolderContent(program.folder);
}

const ATTRS = ['active', 'available', 'disabled', 'inProgress'];

/**
 * from version XX to version YY we have introduce the following change:
 * action.available = 'myExpression' was evaluated using cmf expression
 * @param {Object} settings
 */
function getActions(settings) {
	if (!settings || !settings.actions) {
		return {};
	}
	const actions = {};
	Object.keys(settings.actions).map(key => {
		const action = settings.actions[key];
		const newAction = Object.assign({}, action);
		ATTRS.forEach(attr => {
			const value = action[attr];
			if (typeof value === 'string' || typeof value === 'object') {
				console.log('update ', attr);
				newAction[`${attr}Expression`] = value;
				delete newAction[attr];
			}
		});
		if (typeof newAction['labelExpression'] === 'string') {
			console.log('You should use object to set labelExpression');
		}
		actions[key] = newAction;
	});
	return actions;
}

function save(ppath, data) {
	const withLineEnd = data + '\n';
	if (!program.quiet) {
		console.log(`save ${ppath}`);
	}
	fs.open(ppath, 'w', (err, fd) => {
		if (err) {
			throw new Error(`error opening file: ${err}`);
		}

		fs.write(fd, withLineEnd, 0, data.length, null, (err) => {
			if (err) {
				throw new Error(`error writing file: ${err}`);
			}
			fs.close(fd, () => {
				if (!program.quiet) {
					console.log('file written');
				}
			});
		});
	});
}

JSONs.forEach(json => {
	const content = require(`../${json}`);
	if (content.actions) {
		Object.assign(content.actions, getActions(content));
	}

	// save them
	save(json, JSON.stringify(content, null, 2));
});

