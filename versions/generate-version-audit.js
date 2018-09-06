#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const auditFolderPath = path.join(process.cwd(), 'npm-audit');
const auditPackageJSONPath = path.join(auditFolderPath, 'package.json');

// create package.json content withthe dependencies
const packageJSON = {
	engines: { node: '>=10.0.0' },
	version: '0.0.0',
	// eslint-disable-next-line global-require
	dependencies: require('./dependencies'),
};

// create audit folder
if (!fs.existsSync(auditFolderPath)) {
	fs.mkdirSync(auditFolderPath);
}

// write package.json into folder
fs.writeFile(auditPackageJSONPath, JSON.stringify(packageJSON, null, 2), function(err) {
	if (err) {
		return console.log(err);
	}

	console.log('Audit package.json file has been saved!');
});
