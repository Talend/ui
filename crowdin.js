const AdmZip = require('adm-zip');
const program = require('commander');
const request = require('request');
const fs = require('fs');

/* eslint-disable no-console */

function help() {
	console.log('To use crowdin script you need API key. You can set this key under .crowdin.json file { "key": "..." } or use -k');
	console.log('To use crowdin script to get the status: ');
	console.log('>node crowding.js --status');
	console.log('To use crowdin script to download current locales: ');
	console.log('>node crowding.js --download');
}

program
	.version('0.0.1')
	.option('-k, --key [value]', 'Required API key (or use .crowdin.json)')
	.option('-v, --verbose', 'display debug info')
	.option('-p, --project [value]', 'PROJECT_ID to set API URL. Default talendui')
	.option('-d, --download', 'download all the translations')
	.option('-s, --status', 'get the status of translations')
	.option('-u, --upload', 'upload translation')
	;

program.on('--help', help);

program.parse(process.argv);

function debug(...args) {
	if (program.verbose) {
		console.log(...args);
	}
}

// TODO: prompt for the API_KEY

let API_KEY = program.key;
let CROWDIN;
if (fs.existsSync('.crowdin.json')) {
	// eslint-disable-next-line
	CROWDIN = require('./.crowdin.json');
	if (CROWDIN.key) {
		API_KEY = CROWDIN.key;
	}
}

const PROJECT_ID = program.project || CROWDIN.project || 'talendui';
const URL = `https://api.crowdin.com/api/project/${PROJECT_ID}`;

if (!API_KEY) {
	throw new Error('you must set -k or put a key in .crowdin config file');
}

const FILES = [
	{
		name: 'tui-components.json',
		path: `${__dirname}/packages/components/locales/template/tui-components.json`,
		target: path => `${__dirname}/packages/components/locales/${path}`,
		locales: `${__dirname}/packages/components/locales`,
	},
	{
		name: 'tui-forms.json',
		path: `${__dirname}/packages/forms/locales/template/tui-forms.json`,
		target: path => `${__dirname}/packages/forms/locales/${path}`,
		locales: `${__dirname}/packages/forms/locales`,
	},
];
const BY_NAME = FILES.reduce((acc, file) => {
	acc[file.name] = file;
	return acc;
}, {});

function onError(error) {
	if (error) {
		throw error;
	}
}

function handleStatusRequest(error, response, body) {
	onError(error);
	console.log('---------- status ---------');
	console.log(body);
}

function status() {
	const url = `${URL}/status?json&key=${API_KEY}`;
	debug(`status send GET , ${url}`);
	request(url, handleStatusRequest);
}

function getDestination(fileEntry) {
	debug(fileEntry.toString());
	const path = fileEntry.entryName;
	const config = BY_NAME[fileEntry.name];
	if (config) {
		return config.target(path); // "ja/tui-components.json"
	}
	return undefined;
}

function write(destination, data) {
	console.log(`write ${destination}`);
	fs.writeFileSync(destination, data);
}

function extractAndSave(zipEntry) {
	const dest = getDestination(zipEntry);
	if (!dest && zipEntry.isDirectory) {
		FILES.forEach(file => {
			const target = file.target(zipEntry.entryName)
			if (!fs.existsSync(target)) {
				debug(`create missing directory: ${target}`);
				fs.mkdirSync(target);
			}
		});
		return;
	}
	const data = zipEntry.getData().toString('utf8');
	// write to dest
	write(dest, data);
}

function handleDownloadRequest(error, response, body) {
	onError(error);
	const zip = new AdmZip(body);
	zip.getEntries().forEach(extractAndSave);
}

function ensureLocalesExists() {
	FILES.forEach(file => {
		if (!fs.existsSync(file.locales)) {
			debug(`create ${file.locales}`);
			fs.mkdirSync(file.locales);
		}
	});
}

function download() {
	ensureLocalesExists();
	const options = {
		url: `${URL}/download/all.zip?key=${API_KEY}`,
		headers: {
			'Accept-Encoding': 'gzip, deflate',
		},
		encoding: null,
	};
	debug(`download url OPTIONS ${options}`);
	request(options, handleDownloadRequest);
}

function upload() {
	console.log('please use curl');
	const files = FILES.map(file => `\n  -F "files[/${file.name}]=@${file.path}"`);
	console.log(`curl ${files}\n  ${URL}/update-file?key=${API_KEY}`);
}

/** ------ main ----- */

if (program.verbose) {
	request.debug = true;
}

if (program.download) {
	download();
}

if (program.upload) {
	upload();
}

if (program.status) {
	status();
}

if (!program.download && !program.status && !program.upload) {
	help();
}
