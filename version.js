#!/usr/bin/env node
/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const program = require('commander');

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

const stackVersion = program.stack || require('./lerna.json').version;

if (program.debug) {
	console.log(`use stack version ${stackVersion}`);
}

const REACT_VERSION = '^16.0.0';
const JEST_VERSION = '20.0.3';

const STACK_VERSION = {
	'@talend/bootstrap-theme': stackVersion,
	'@talend/react-cmf': stackVersion,
	'@talend/react-cmf-cqrs': stackVersion,
	'@talend/react-cmf-webpack-plugin': stackVersion,
	'@talend/react-sagas': stackVersion,
	'@talend/react-components': stackVersion,
	'@talend/react-containers': stackVersion,
	'@talend/react-datagrid': stackVersion,
	'@talend/react-forms': stackVersion,
	'@talend/icons': stackVersion,
	'@talend/log': stackVersion,
};

const ADDONS = {
	'babel-polyfill': '6.26.0',
	'date-fns': '1.27.2',
	'focus-outline-manager': '^1.0.2',
	immutablediff: '0.4.4',
	'normalize.css': '5.0.0',
	'path-to-regexp': '2.0.0',
	prettier: '1.6.1',
	'redux-batched-subscribe': '0.1.6',
	'redux-undo': 'beta',
	'redux-saga': '0.15.4',
	'react-addons-perf': '15.4.2',
	'react-autowhatever': '10.1.0',
	'react-debounce-input': '3.1.0',
	'react-immutable-proptypes': '2.1.0',
	'react-jsonschema-form': '0.51.0',
	'react-tap-event-plugin': '2.0.0',
	'react-virtualized': '9.10.1',
	slugify: '1.1.0',
	'whatwg-fetch': '2.0.3',
};

const VERSIONS = Object.assign({}, ADDONS, {
	// deps
	ajv: '^6.2.1',
	'bootstrap-sass': '3.3.7',
	'bson-objectid': '1.1.5',
	classnames: '2.2.5',
	'd3-shape': '1.2.0',
	keycode: '2.2.0',
	lodash: '4.17.4',
	immutable: '3.8.1',
	invariant: '2.2.2',
	'prop-types': '15.5.10',
	react: REACT_VERSION,
	'react-ace': '5.2.0',
	'react-bootstrap': '0.31.5',
	'react-dom': REACT_VERSION,
	i18next: '^9.0.0',
	'i18next-parser': '^0.13.0',
	'rc-slider': '8.4.1',
	'rc-tooltip': '3.7.0',
	'react-i18next': '^7.6.1',
	'react-redux': '5.0.5',
	'react-router': '3.2.0',
	'react-router-redux': '4.0.8',
	'react-test-renderer': REACT_VERSION,
	'react-transition-group': '^2.3.1',
	'react-virtualized': '9.10.1',
	reselect: '^2.5.4',

	redux: '3.6.0',
	'redux-batched-actions': '0.2.0',
	'redux-logger': '3.0.6',
	'redux-mock-store': '1.2.3',
	'redux-thunk': '2.2.0',
	uuid: '3.0.1', // prefer bson-objectid
	tv4: '^1.3.0',

	// script dep
	deepmerge: '1.5.1',

	// dev deps
	'@storybook/react': '^3.3.14',
	'@storybook/addon-storyshots': '^3.3.14',
	'@storybook/addon-actions': '^3.3.14',
	'@storybook/addon-info': '^3.3.14',
	'@storybook/addon-knobs': '^3.3.14',
	'@storybook/addons': '^3.3.14',
	autoprefixer: '^7.1.4',
	'babel-cli': '^6.26.0',
	'babel-core': '^6.26.0',
	'babel-eslint': '8.0.1',
	'babel-jest': JEST_VERSION,
	'babel-plugin-transform-class-properties': '^6.24.1',
	'babel-plugin-transform-export-extensions': '^6.22.0',
	'babel-plugin-transform-object-assign': '^6.22.0',
	'babel-plugin-transform-object-rest-spread': '^6.26.0',
	'babel-preset-env': '^1.6.0',
	'babel-preset-react': '^6.24.1',
	cpx: '1.5.0',
	enzyme: '^3.1.0',
	'enzyme-adapter-react-15': '^1.0.1',
	'enzyme-adapter-react-16': '^1.1.1',
	'enzyme-to-json': '^3.0.0',
	eslint: '^3.6.1',
	'eslint-config-airbnb': '^11.1.0',
	'eslint-plugin-import': '^1.16.0',
	'eslint-plugin-jsx-a11y': '^2.2.2',
	'eslint-plugin-react': '^6.3.0',
	jest: JEST_VERSION,
	'jest-cli': JEST_VERSION,
	'jest-in-case': '^1.0.2',
	'react-storybook-cmf': '^0.4.0',
	'react-stub-context': '^0.7.0',
	rimraf: '^2.6.1',
	storyshots: '3.2.2',

	// webpack
	'babel-loader': '^7.1.2',
	'copy-webpack-plugin': '4.1.1',
	'css-loader': '0.28.7',
	'extract-text-webpack-plugin': '3.0.2',
	'file-loader': '1.1.5',
	'fontgen-loader': '0.2.1',
	'node-sass': '4.7.2',
	'postcss-loader': '2.0.8',
	'sass-loader': '6.0.6',
	'style-loader': '0.19.0',
	'url-loader': '0.6.2',
	webpack: '3.8.1',
	'webpack-bundle-analyzer': '2.9.0',
	'webpack-dashboard': '1.0.0-7',
	'webpack-dev-server': '2.9.3',
});

const files = [
	'./packages/cmf/package.json',
	'./packages/cmf-cqrs/package.json',
	'./packages/cmf-webpack-plugin/package.json',
	'./packages/components/package.json',
	'./packages/containers/package.json',
	'./packages/forms/package.json',
	'./packages/generator/package.json',
	'./packages/icons/package.json',
	'./packages/logging/package.json',
	'./packages/sagas/package.json',
	'./packages/theme/package.json',
	'./packages/datagrid/package.json',
];

const templates = ['./packages/generator/generators/react-cmf/templates/package.json'];

if (program.debug) {
	console.log(`will update ${files}`);
}

function check(source, dep, version) {
	let modified = false;
	if (source && source[dep] && source[dep] !== version) {
		if (!program.quiet) {
			console.log(`update ${dep}: ${source[dep]} to '${version}'`);
		}
		// eslint-disable-next-line no-param-reassign
		source[dep] = version;
		modified = true;
	}
	return modified;
}

function checkAll(versions, source, dep) {
	const version = versions[dep];
	const devDeps = source.devDependencies;
	const deps = source.dependencies;
	const peer = source.peerDependencies;
	const isModDevDeps = check(devDeps, dep, version);
	const isModDeps = check(deps, dep, version);
	const isModPeers = check(peer, dep, version);
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

		fs.write(fd, data, 0, data.length, null, err => {
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
	const filesList = [program.path];
	updateFiles(filesList, Object.assign({}, VERSIONS, STACK_VERSION));
} else {
	updateFiles(files, Object.assign(VERSIONS));
	updateFiles(templates, Object.assign({}, VERSIONS, STACK_VERSION));
}
