const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const mkdirp = require('mkdirp');
const Zip = require('adm-zip');

const error = require('../common/error');

function extractNpmYarn({ script, method, target }) {
	if (!script || !target) {
		error(`
			Extraction method is set to "npm". You need to provide
			- a "script" configuration that is your npm script name
			- a "target" configuration that is the folder that contains your extracted i18n files
			{
				"extract": {
					"method": "npm",
					"script": "extract-i18n",
					"target": "./i18n"
				}
			}
		`);
	}
	spawn.sync(method, ['install'], { stdio: 'inherit', env: process.env });
	spawn.sync(method, ['run', script], { stdio: 'inherit', env: process.env });

	const extractionFolder = path.join(process.cwd(), target);
	if (!fs.existsSync(extractionFolder)) {
		error(`
			You need to provide a path to the extracted files.
			${extractionFolder} doesn't exist after extraction.
		`);
	}
}

function extractFiles({ files, target }) {
	if (!files || !target) {
		error(`
			Extraction method is set to "files". You need to provide
			- a "files" configuration that is an array of file paths
			- a "target" configuration that is the folder that will contain your extracted i18n files
			{
				"extract": {
					"method": "files",
					"files": ['./src/i18n/translation.json', './src/app/other.json'],
					"target": "./i18n"
				}
			}
		`);
	}
	const extractionFolder = path.join(process.cwd(), target);
	files.forEach(srcPath => {
		const filename = path.basename(srcPath);
		const srcFolder = path.dirname(srcPath);
		const targetFolder = path.join(extractionFolder, srcFolder);
		const targetPath = path.join(targetFolder, filename);
		if (!fs.existsSync(targetFolder)) {
			mkdirp.sync(targetFolder);
		}
		fs.copyFileSync(srcPath, targetPath);
	});
}

function runExtract({ extract }) {
	const { method, target } = extract;
	switch (method) {
		case 'npm':
		case 'yarn':
			extractNpmYarn(extract);
			break;
		case 'files':
			extractFiles(extract);
			break;
		default:
			error(
				method
					? `Extraction method ${method} doesn't exist. Please fix your talend-i18n config file.`
					: 'Extraction method is needed, but not provided in your talend-i18n config file.',
			);
	}

	const zip = new Zip();
	zip.addLocalFolder(path.join(process.cwd(), target));
	zip.writeZip(path.join(process.cwd(), 'i18n.zip'));
}

module.exports = runExtract;
