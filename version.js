#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cpx = require('cpx');
const program = require('commander');

program
	.version('0.0.1')
	.option('-d, --debug', 'display more info')
	.option('-q, --quiet', 'display nothing')
	.option('-p, --path [value]', 'path of the package.json to update')
	.parse(process.argv);

const REACT_VERSION = '15.5.4';
const JEST_VERSION = '20.0.3';

const VERSIONS = {
	// deps
	classnames: '2.2.5',
	lodash: '4.17.4',
	immutable: '3.8.1',
	invariant: '2.2.2',
	react: REACT_VERSION,
	'react-addons-test-utils': '15.5.1',
	'react-dom': REACT_VERSION,
	'react-redux': '5.0.5',
	'react-router': '3.0.5',
	'react-router-redux': '4.0.8',
	'react-test-renderer': REACT_VERSION,
	redux: '3.6.0',
	'redux-batched-actions': '0.2.0',
	'redux-logger': '3.0.6',
	'redux-mock-store': '1.2.3',
	'redux-thunk': '2.2.0',

	// dev deps
	'babel-cli': '6.24.1',
	'babel-core': '6.24.1',
	'babel-eslint': '7.2.3',
	'babel-jest': JEST_VERSION,
	'babel-loader': '6.2.5',
	'babel-plugin-transform-class-properties': '6.18.0',
	'babel-plugin-transform-object-rest-spread': '6.16.0',
	'babel-preset-es2015': '6.14.0',
	'babel-preset-react': '6.11.1',
	jest: JEST_VERSION,
	'jest-cli': JEST_VERSION,
	rimraf: '^2.6.1',
	storyshots: '3.2.2',
};

let files = [
	'./packages/cmf/package.json',
	'./packages/components/package.json',
	'./packages/containers/package.json',
	'./packages/forms/package.json',
	'./packages/generator/package.json',
	'./packages/icons/package.json',
	'./packages/logging/package.json',
	'./packages/theme/package.json',
];

if (program.path) {
	files = [program.path]
	// TODO: read the current latest stack version and update to it
}

if (program.debug) {
	console.log(`will update ${files}`);
}


function check(source, dep, version) {
	let modified = false;
	if (source && source[dep] && source[dep] !== version) {
		if (!program.quiet) {
			console.log(`update ${dep}: '${version}' from ${source[dep]}`);
		}
		source[dep] = version;
		modified = true;
	}
	return modified;
}

function checkAll(source, dep) {
	const version = VERSIONS[dep];
	const devDeps = source.devDependencies;
	const deps = source.dependencies;
	const peer = source.peerDependencies;
	const mDevDeps = check(devDeps, dep, version);
	const mDeps = check(deps, dep, version);
	const mPeers = check(peer, dep, version);
	if (mDevDeps || mDeps || mPeers) {
		source.modified = true;
	}
}

function save(ppath, data) {
	if (!program.quiet) {
		console.log(`save ${ppath}`);
	}
	fs.open(ppath, 'w', function(err, fd) {
		if (err) {
				throw 'error opening file: ' + err;
		}

		fs.write(fd, data, 0, data.length, null, function(err) {
			if (err) throw 'error writing file: ' + err;
			fs.close(fd, function() {
				if (!program.quiet) {
					console.log('file written');
				}
			})
		});
	});
}

files.forEach((ppath) => {
	const packageJSON = require(ppath);
	if (!program.quiet) {
		console.log(`=== check ${packageJSON.name} ===`);
	}

	Object.keys(VERSIONS).forEach((dep) => {
		checkAll(packageJSON, dep);
	});
	if (packageJSON.modified) {
		delete packageJSON.modified;
		save(ppath, JSON.stringify(packageJSON, null, 2));
		console.log(path.join(path.dirname(ppath), 'yarn.lock'));
		fs.unlink(path.join(path.dirname(ppath), 'yarn.lock'));
	}
});
