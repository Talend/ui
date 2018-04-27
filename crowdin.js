const AdmZip = require('adm-zip');
const program = require('commander');
const request = require('request');
const FormData = require('form-data');
// const http = require('http');
const fs = require('fs');

/* eslint-disable no-console */
// request.debug = true;

function help() {
	console.log('To use crowdin script to get the status: ');
	console.log('>node crowding.js --status');
	console.log('To use crowdin script to upload current catalog: ');
	console.log('>node crowding.js --upload ./i18n/components/tui-components.json');
}

program
	.version('0.0.1')
	.option('-k, --key [value]', 'REQUIRED PROJECT KEY')
	.option('-v, --verbose', 'display debug info')
	.option('-d, --download', 'download all the translations')
	.option('-s, --status', 'get the status of translations')
	.option('-u, --upload [value]', 'upload translation')
	;

program.on('--help', help);

program.parse(process.argv);

function debug(...args) {
	if (program.verbose) {
		console.log(...args);
	}
}

// TODO: prompt for the PROJECT_KEY

const PROJECT_KEY = program.key;
const PROJECT_ID = 'talendui';
const URL = `https://api.crowdin.com/api/project/${PROJECT_ID}`;
const PATHS = [
	__dirname + '/i18n/components/en/tui-components.json',
	// __dirname + '/i18n/forms/en/tui-forms.json'
];

const FILES = [
	{
		name: 'tui-components.json',
		path: `${__dirname}/i18n/components/en/tui-components.json`,
		locales: `${__dirname}/components/locales`,
	},
];

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
	const url = `${URL}/status?json&key=${PROJECT_KEY}`;
	debug(`status send GET , ${url}`);
	request(url, handleStatusRequest);
}

function getDestination(fileEntry) {
	debug(fileEntry.toString());
	const path = fileEntry.entryName;
	if (fileEntry.name === 'tui-components.json') {
		return `packages/components/locales/${path}`; // "ja/tui-components.json"
	} else if (fileEntry.name === 'tui-forms.json') {
		return `packages/forms/locales/${path}`; // "ja/tui-forms.json"
	} else if (fileEntry.isDirectory) {
		debug(`directory found supposed to be a language folder: ${path}`);
		if (!fs.existsSync(`packages/components/locales/${path}`)) {
			fs.mkdirSync(`packages/components/locales/${path}`);
		}
		if (!fs.existsSync(`packages/forms/locales/${path}`)) {
			fs.mkdirSync(`packages/forms/locales/${path}`);
		}
	}
	return undefined;
}

function write(destination, data) {
	console.log(`write ${destination}`);
	fs.writeFileSync(destination, data);
}

function extractAndSave(zipEntry) {
	const dest = getDestination(zipEntry);
	if (!dest) {
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

function cleanUpBeforeDownload() {
	if (!fs.existsSync('packages/components/locales')) {
		debug('create components/locales');
		fs.mkdirSync('packages/components/locales');
	}
	if (!fs.existsSync('packages/forms/locales')) {
		debug('create forms/locales');
		fs.mkdirSync('packages/forms/locales');
	}
}

function download() {
	cleanUpBeforeDownload();
	const options = {
		url: `${URL}/download/all.zip?key=${PROJECT_KEY}`,
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
	console.log(`curl ${files}\n  https://api.crowdin.com/api/project/talendui/update-file?key=${PROJECT_KEY}`);
}

/** ------ main ----- */

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
