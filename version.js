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
	.option('-s, --stack [value]', 'stack version used in combination with -p')
	.option('-f, --force')
	.parse(process.argv);

const REACT_VERSION = '15.5.4';
const JEST_VERSION = '20.0.3';

const ADDONS = {
	'babel-polyfill': '6.20.0',
	'date-fns': '1.27.2',
	'focus-outline-manager': '1.0.2',
	'immutablediff': '0.4.4',
	'normalize.css': '5.0.0',
	'path-to-regexp': '1.7.0',
	'prettier': '1.6.1',
	'redux-batched-subscribe': '0.1.6',
	'redux-undo': 'beta',
	'redux-saga': '0.15.4',
	'react-addons-perf': '15.4.2',
	'react-autowhatever': '7.0.0',
	'react-debounce-input': '2.4.2',
	'react-immutable-proptypes': '2.1.0',
	'react-jsonschema-form': '0.42.0',
	'react-tap-event-plugin': '2.0.0',
	'react-virtualized': '9.3.0',
	'slugify': '1.1.0',
	'whatwg-fetch': '2.0.3',
};

const VERSIONS = Object.assign({}, ADDONS, {
	// deps
	'bootstrap-sass': '3.3.7',
	'bson-objectid': '1.1.5',
	classnames: '2.2.5',
	keycode: '2.1.9',
	lodash: '4.17.4',
	immutable: '3.8.1',
	invariant: '2.2.2',
	'prop-types': '15.5.10',
	react: REACT_VERSION,
	'react-ace': '5.2.0',
	'react-addons-test-utils': '15.5.1',
	'react-addons-css-transition-group': '15.5.2',
	'react-bootstrap': '0.31.0',
	'react-dom': REACT_VERSION,
	'i18next': '^9.0.0',
	'react-i18next': '^5.2.0',
	'react-redux': '5.0.5',
	'react-router': '3.0.5',
	'react-router-redux': '4.0.8',
	'react-test-renderer': REACT_VERSION,
	'react-virtualized': '^9.7.0',
	reselect: '^2.5.4',

	redux: '3.6.0',
	'redux-batched-actions': '0.2.0',
	'redux-logger': '3.0.6',
	'redux-mock-store': '1.2.3',
	'redux-thunk': '2.2.0',
	uuid: '3.0.1',  // prefer bson-objectid

	// dev deps
	'@kadira/react-storybook-addon-info': '^3.3.0',
	'@kadira/storybook': '^2.35.0',
	'@storybook/react': '3.1.9',
	'@storybook/addon-storyshots': '^3.2.0',
	'@storybook/addon-actions': '^3.2.0',
	'@storybook/addon-info': '^3.2.0',
	'@storybook/addon-knobs': '^3.2.0',
	'@storybook/addons': '^3.2.0',
	'autoprefixer': '^6.7.7',
	'babel-cli': '6.24.1',
	'babel-core': '6.24.1',
	'babel-eslint': '7.2.3',
	'babel-jest': JEST_VERSION,
	'babel-loader': '6.4.1',
	'babel-plugin-transform-class-properties': '6.23.0',
	'babel-plugin-transform-export-extensions': '6.22.0',
	'babel-plugin-transform-object-assign': '6.22.0',
	'babel-plugin-transform-object-rest-spread': '6.20.2',
	'babel-preset-es2015': '6.18.0',
	'babel-preset-react': '6.16.0',
	cpx: '1.5.0',
	enzyme: '^2.7.1',
	eslint: '^3.6.1',
	'eslint-config-airbnb': '^11.1.0',
	'eslint-plugin-import': '^1.16.0',
	'eslint-plugin-jsx-a11y': '^2.2.2',
	'eslint-plugin-react': '^6.3.0',
	jest: JEST_VERSION,
	'jest-cli': JEST_VERSION,
	'react-storybook-cmf': '^0.1.3',
	'react-stub-context': '^0.7.0',
	rimraf: '^2.6.1',
	storyshots: '3.2.2',

	// webpack
	'copy-webpack-plugin': '4.0.1',
	'css-loader': '0.28.2',
	'extract-text-webpack-plugin': '2.1.0',
	'file-loader': '^0.10.0',
	'fontgen-loader': '0.2.1',
	'node-sass': '4.5.3',
	'postcss-loader': '1.3.1',
	'sass-loader': '6.0.5',
	'style-loader': '0.16.1',
	'url-loader': '0.5.8',
	webpack: '^2.5.1',
	'webpack-bundle-analyzer': '2.8.2',
	'webpack-dashboard': '0.4.0',
	'webpack-dev-server': '2.4.5',
});

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
	files = [program.path];
	const stack_version = program.stack || require('./lerna.json').version;
	if (program.debug) {
		console.log(`use stack version ${stack_version}`);
	}
	const STACK_VERSION = {
		'bootstrap-talend-theme': stack_version,
		'react-cmf': stack_version,
		'react-talend-components': stack_version,
		'react-talend-containers': stack_version,
		'react-talend-forms': stack_version,
		'talend-icons': stack_version,
		'talend-log': stack_version,
	};
	Object.assign(
		VERSIONS,
		STACK_VERSION
	);
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
	const isModDevDeps = check(devDeps, dep, version);
	const isModDeps = check(deps, dep, version);
	const isModPeers = check(peer, dep, version);
	if (isModDevDeps || isModDeps || isModPeers) {
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
			if (err) {
				throw 'error writing file: ' + err;
			}
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
	if (packageJSON.modified || program.force) {
		delete packageJSON.modified;
		save(ppath, JSON.stringify(packageJSON, null, 2) + '\n');
		const yarnLock = path.join(path.dirname(ppath), 'yarn.lock');
		if (fs.existsSync(yarnLock)) {
			if (!program.quite) {
				console.log(`you have to update ${yarnLock} yourself`);
			}
		}
	}
});
