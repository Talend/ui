#!/usr/bin/env node

const fs = require('fs');
const mod = require('../src');

const CWD = process.cwd();
const { upgradeYarnProject, upgradeNpmProject } = mod;

const HELP_MSG = `talend-scripts upgrade [options]

--package=* to limit the upgrade to this package. For example --package=react
--scope=* to limit the check done in package.json and lock file. For example --scope=@talend
--starts-with=* to limit the check done in package.json and lock file. For example --scope=@talend/scripts-
--dry changes are not applied
--latest to force update regardeless of the package.json
--security=* the dependency security configuration. This mode is not compatible with any other option. For example --security=./security-conf.json
--message=* the message you want in the changeset
--ignore-scripts Do not run script on yarn/npm install and upgrade commands

ALIASES:
--talend-major: equal to --filter=@talend --latest
--check: equal to --latest --dry

Without any options you will upgrade your package.json respecting the current condition (so this is safe)
So only the lock file should be changed after this command.`;

function upgradeDeps(options) {
	if (!fs.existsSync(`${CWD}/package.json`)) {
		console.error("Can't upgrade a project without package.json file");
		process.exit(1);
	}
	const program = options
		.filter(opt => opt.startsWith('-'))
		.reduce((acc, key) => {
			if (key.startsWith('--')) {
				const split = key.split('=');
				const optKey = split[0].replace('--', '');
				acc[optKey] = split[1] || true;
			}
			if (key.startsWith('-')) {
				const optKey = key.replace('-', '');
				acc[optKey] = true;
			}
			return acc;
		}, {});

	if (program.help || program.h) {
		// eslint-disable-next-line no-console
		console.log(HELP_MSG);
		process.exit(0);
	}

	if (fs.existsSync(`${CWD}/yarn.lock`)) {
		upgradeYarnProject(program).then(() => process.exit(0));
	} else if (fs.existsSync(`${CWD}/package-lock.json`)) {
		upgradeNpmProject(program).then(() => process.exit(0));
	} else {
		throw new Error('Update project without yarn.lock is not supported');
	}
}

upgradeDeps(process.argv);
