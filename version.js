#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cpx = require('cpx');
const program = require('commander');

program
	.version('0.0.1')
	.option('-d, --debug', 'display more info')
	.option('-q, --quiet', 'display nothing')
	.parse(process.argv);

const REACT_VERSION = '15.5.0';
const JEST_VERSION = '20.0.3';

const VERSIONS = {
	// deps
    classnames: '2.2.5',
    lodash: '4.17.4',
    immutable: '3.8.1',
    invariant: '2.2.2',
	react: REACT_VERSION,
    'react-addons-test-utils': REACT_VERSION,
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
};

const files = [
	'./packages/cmf/package.json',
	'./packages/components/package.json',
	'./packages/containers/package.json',
	'./packages/forms/package.json',
	'./packages/generator/package.json',
	'./packages/icons/package.json',
	'./packages/logging/package.json',
	'./packages/theme/package.json',
];

function check(source, dep, version) {
	if (source && source[dep] && source[dep] !== version) {
		console.log(`update ${dep}: '${version}' from ${source[dep]}`);
		source[dep] = version;
	}
}

function checkAll(source, dep) {
	const version = VERSIONS[dep];
	const devDeps = source.devDependencies;
	const deps = source.dependencies;
	const peer = source.peerDependencies;
	check(devDeps, dep, version);
	check(deps, dep, version);
	check(peer, dep, version);
}

function save(path, data) {
    fs.open(path, 'w', function(err, fd) {
        if (err) {
                throw 'error opening file: ' + err;
        }

        fs.write(fd, data, 0, data.length, null, function(err) {
                if (err) throw 'error writing file: ' + err;
                fs.close(fd, function() {
                        console.log('file written');
                })
        });
    });
}

files.forEach((path) => {
	const packageJSON = require(path);
	console.log(`=== check ${packageJSON.name} ===`);

	Object.keys(VERSIONS).forEach((dep) => {
		checkAll(packageJSON, dep);
	});
	save(path, JSON.stringify(packageJSON, null, 2));
});
