#!/usr/bin/env node
/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const program = require('commander');
const semver = require('semver');
const colors = require('colors');

program
	.version('0.0.1')
	.option('-d, --debug', 'display more info')
	.option('-q, --quiet', 'display nothing')
	.option(
		'-p, --path [value]',
		'[optional] path of the package.json to update by default local package',
	)
	.option(
		'-s, --stack [value]',
		'[optional] stack version to use, by default the last published one',
	)
	.option('-f, --force');

program.on('--help', () => {
	console.log('To update your project dependencies : ');
	console.log('>node version.js --path ../yourapp/package.json');
	console.log('To update your project dependencies to a specif stack version :');
	console.log('>node version.js --path ../yourapp/package.json --stack=0.114.0');
	console.log("Don't forget to use yarn after the package json update");
	console.log('so you lockfile is updated !');
});

program.parse(process.argv);

const stackVersion = program.stack || require('../lerna.json').version;

if (program.debug) {
	console.log(`use stack version ${stackVersion}`);
}

const STACK_VERSION = {
	'@talend/bootstrap-theme': stackVersion,
	'@talend/react-cmf': stackVersion,
	'@talend/react-cmf-cqrs': stackVersion,
	'@talend/react-cmf-webpack-plugin': stackVersion,
	'@talend/react-sagas': stackVersion,
	'@talend/react-components': stackVersion,
	'@talend/react-containers': stackVersion,
	'@talend/react-datagrid': stackVersion,
	'@talend/react-stepper': stackVersion,
	'@talend/react-forms': stackVersion,
	'@talend/icons': stackVersion,
	'@talend/log': stackVersion,
};

const VERSIONS = require('./dependencies');

const REACT_VERSION_PEER = '^16.8.6';

const files = [
	path.join(__dirname, '../packages/cmf/package.json'),
	path.join(__dirname, '../packages/cmf-cqrs/package.json'),
	path.join(__dirname, '../packages/cmf-webpack-plugin/package.json'),
	path.join(__dirname, '../packages/components/package.json'),
	path.join(__dirname, '../packages/containers/package.json'),
	path.join(__dirname, '../packages/datagrid/package.json'),
	path.join(__dirname, '../packages/stepper/package.json'),
	path.join(__dirname, '../packages/forms/package.json'),
	path.join(__dirname, '../packages/generator/package.json'),
	path.join(__dirname, '../packages/generator/generators/app/templates/package.json'),
	path.join(__dirname, '../packages/html-webpack-plugin/package.json'),
	path.join(__dirname, '../packages/icons/package.json'),
	path.join(__dirname, '../packages/router/package.json'),
	path.join(__dirname, '../packages/sagas/package.json'),
	path.join(__dirname, '../packages/storybook-cmf/package.json'),
	path.join(__dirname, '../packages/theme/package.json'),
];

const templates = [
	path.join(__dirname, '../packages/generator/generators/react-cmf/templates/package.json'),
];

if (program.debug) {
	console.log(`will update ${files}`);
}

/**
 * @param {Object<dependency, version>} source actual dependencies and their versions
 * will be mutated and provided to caller by reference
 * mutation include update of version and added modified properties as boolean
 * @param {String} dep one dep from `versions`
 * @param {String} version version of the `dep` above
 * @param {String = 'dep'|'peer'|'dev' } category for each category a different behavior is expected
 * node `dev` category has no special behavior
 */
function check(source, dep, version, category = 'dep') {
	let safeVersion = version;
	if (category === 'peer' && dep === 'react') {
		safeVersion = REACT_VERSION_PEER;
	}
	if (category === 'peer' && dep === 'react-dom') {
		safeVersion = REACT_VERSION_PEER;
	}
	let modified = false;
	if (source && source[dep] && source[dep] !== safeVersion) {
		if (dep === 'react' && category === 'dep') {
			console.warn(
				'WARNING: react and react-dom should always be added as peer dependencies in library',
			);
		}
		if (!program.quiet) {
			const willDowngrade = semver.gt(source[dep].replace('^', ''), safeVersion.replace('^', ''));
			const message = `update ${dep}: '${safeVersion}' from ${source[dep]}`;

			if (willDowngrade) {
				console.log(colors.yellow(message));
				console.log(colors.yellow(`Feel free to propose a version upgrade on Talend/UI : ${dep} -> ${source[dep]}`));
			} else {
				console.log(message);
			}
		}
		// eslint-disable-next-line no-param-reassign
		source[dep] = safeVersion;
		modified = true;
	}
	return modified;
}

/**
 * @param {Object<dependency, version>} versions - target versions
 * @param {Object<dependency, version>} source - actual dependencies and their versions
 * will be mutated and provided to caller by reference
 * mutation include update of version and added modified properties as boolean
 * @param {String} dep one dep from `versions`
 */
function checkAll(versions, source, dep) {
	const version = versions[dep];
	const devDeps = source.devDependencies;
	const deps = source.dependencies;
	const peer = source.peerDependencies;
	const isModDevDeps = check(devDeps, dep, version, 'dev');
	const isModDeps = check(deps, dep, version);
	const isModPeers = check(peer, dep, version, 'peer');
	if (isModDevDeps || isModDeps || isModPeers) {
		// eslint-disable-next-line no-param-reassign
		source.modified = true;
	}
}

function save(ppath, data) {
	if (!program.quiet) {
		console.log(`save ${ppath}`);
	}
	fs.open(ppath, 'w', (err, fd) => {
		if (err) {
			throw new Error(`error opening file: ${err}`);
		}

		fs.write(fd, data, 0, data.length, error => {
			if (error) {
				throw new Error(`error writing file: ${error}`);
			}
			fs.close(fd, () => {
				if (!program.quiet) {
					console.log('file written');
				}
			});
		});
	});
}

/**
 * for each file three steps
 * - load the file
 * - transform dependencies versions
 * - write new dependencies version into file
 * @param {Array<String>} filesList
 * @param {Object<dependency, version>} versions
 */
function updateFiles(filesList, versions) {
	filesList.forEach(ppath => {
		// eslint-disable-next-line global-require
		const packageJSON = require(ppath);
		if (!program.quiet) {
			console.log(`=== check ${packageJSON.name} ===`);
		}

		Object.keys(versions).forEach(dep => {
			checkAll(versions, packageJSON, dep);
		});
		if (packageJSON.modified || program.force) {
			delete packageJSON.modified;
			save(ppath, `${JSON.stringify(packageJSON, null, 2)}\n`);
			const yarnLock = path.join(path.dirname(ppath), 'yarn.lock');
			if (fs.existsSync(yarnLock)) {
				if (!program.quite) {
					console.log(`you have to update ${yarnLock} yourself`);
				}
			}
		}
	});
}

if (program.path) {
	let filePath = program.path;
	if (!path.isAbsolute(filePath)) {
		filePath = path.join(process.cwd(), filePath);
	}
	const filesList = [filePath];
	updateFiles(filesList, Object.assign({}, VERSIONS, STACK_VERSION));
} else {
	updateFiles(files, Object.assign(VERSIONS));
	updateFiles(templates, Object.assign({}, VERSIONS, STACK_VERSION));
}
