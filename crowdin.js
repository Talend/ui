const AdmZip = require('adm-zip');
const program = require('commander');
const request = require('request');
const FormData = require('form-data');
// const http = require('http');
const fs = require('fs');

/* eslint-disable no-console */
request.debug = true;

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
	console.log(...args);
}

// TODO: prompt for the PROJECT_KEY

const PROJECT_KEY = program.key;
const PROJECT_ID = 'talendui';
const URL = `https://api.crowdin.com/api/project/${PROJECT_ID}`;
const PATHS = [
	__dirname + '/i18n/components/en/tui-components.json',
	// __dirname + '/i18n/forms/en/tui-forms.json'
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
		return `i18n/components/${path}`; // "ja/tui-components.json"
	} else if (fileEntry.name === 'tui-forms.json') {
		return `i18n/forms/${path}`; // "ja/tui-forms.json"
	} else if (fileEntry.isDirectory) {
		debug(`directory found supposed to be a language folder: ${path}`);
		fs.mkdirSync(`i18n/components/${path}`);
		fs.mkdirSync(`i18n/forms/${path}`);
	}
	return undefined;
}

function write(destination, data) {
	debug(`write to ${destination}`);
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

function download() {
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

function handleUpload(error, response, body) {
	if (error) {
		return console.error('upload failed:', error);
	}
	// const res = response.resume();
	console.log(response.req);
	console.log('Upload successful!  Server responded with:', body);
	// process.exit();
}

function upload() {
	// const files = PATHS.map(path => fs.readFileSync(path).toString());
	// debug(files);
	// const formData = { files };
	// 	files: [
	// 		{
	// 			value: fs.createReadStream(__dirname + '/i18n/components/en/tui-components.json'),
	// 			options: {
	// 				filename: 'tui-components.json',
	// 				'content-type': 'application/json',
	// 			},
	// 		},
	// 		{
	// 			value: fs.createReadStream(__dirname + '/i18n/forms/en/tui-forms.json'),
	// 			options: {
	// 				filename: 'tui-forms.json',
	// 				'content-type': 'application/json',
	// 			},
	// 		}
	// 	]
	// };
	const formData = new FormData();
	PATHS.forEach(path => formData.append('files[]', fs.createReadStream(path))); //{
	// PATHS.forEach(path => formData.append('files[]', {
	// 	value: fs.createReadStream(path),
	// 	options: {
	// 		filename: path.split('/')[4],
	// 		contentType: 'application/json',
	// 	},
	// }));
	// debug('header', formData.getHeaders());
	const options = {
		method: 'POST',
		url: `${URL}/update-file?json&key=${PROJECT_KEY}`,
		// form: {
		// 	files: [
		// 		fs.createReadStream(__dirname + '/i18n/components/en/tui-components.json'),
		// 		fs.createReadStream(__dirname + '/i18n/forms/en/tui-forms.json'),
		// 	]
		// }
		headers: formData.getHeaders(),
		// formData,
		body: formData,
	};
	// debug(options);
	// formData.submit(options.url, handleUpload);
	const req = request.post(options, handleUpload);


	// HANG
	// const form = req.form();
	// PATHS.forEach(path => form.append('files[]', fs.createReadStream(path)));
	// form.submit(url, handleUpload);

	// form.append('files', {
	// 	'tui-components.json': fs.createReadStream(__dirname + '/i18n/components/en/tui-components.json'),
	// 	'tui-forms.json': fs.createReadStream(__dirname + '/i18n/forms/en/tui-forms.json'),
	// });
	// form.append('files', {
	// 	'tui-components.json': fs.createReadStream(__dirname + '/i18n/components/en/tui-components.json'),
	// 	'tui-forms.json': fs.createReadStream(__dirname + '/i18n/forms/en/tui-forms.json'),
	// });
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
