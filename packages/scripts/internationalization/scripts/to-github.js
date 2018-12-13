/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const xmlParser = require('xml2json');
const spawn = require('cross-spawn');

const error = require('../common/error');

function getGithubVariables() {
	const { GITHUB_LOGIN, GITHUB_TOKEN } = process.env;
	if (!GITHUB_LOGIN) {
		error(`
			In order to connect to Github, you need to pass the GITHUB_LOGIN env variable.
			> GITHUB_LOGIN=XXX talend-scripts i18n-to-github
		`);
	}
	if (!GITHUB_TOKEN) {
		error(`
			In order to connect to Github, you need to pass the GITHUB_TOKEN env variable.
			> GITHUB_TOKEN=XXX talend-scripts i18n-to-github
		`);
	}

	return { login: GITHUB_LOGIN, token: GITHUB_TOKEN };
}

const VERSION_REGEX = /^([0-9]+\.[0-9]+).*/;
function getVersion() {
	const lernaJsonPath = path.join(process.cwd(), 'lerna.json');
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const pomXmlPath = path.join(process.cwd(), 'pom.xml');

	if (fs.existsSync(lernaJsonPath)) {
		const { version } = require(lernaJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			return match[1];
		}
	}

	if (fs.existsSync(packageJsonPath)) {
		const { version } = require(packageJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			return match[1];
		}
	}

	if (fs.existsSync(pomXmlPath)) {
		const data = fs.readFileSync(pomXmlPath);
		const { version } = xmlParser.toJson(data);
		const match = version.match(VERSION_REGEX);
		if (match) {
			return match[1];
		}
	}

	error(`
		talend-scripts can't determine your project version. Possible reasons : 
			* no package.json or pom.xml in this directory
			* no version in package.json or pom.xml
	`);
}

function toGithub({ load, github }) {
	const { login, token } = getGithubVariables();
	const { url } = github;
	const { project, target } = load;

	// check if i18n files are here or ask user to perform download
	const i18nFolder = path.join(process.cwd(), target, 'i18n');
	if (
		!fs.existsSync(i18nFolder) || // folder doesn't exist
		!fs.lstatSync(i18nFolder).isDirectory() || // is not a folder
		!fs.readdirSync(i18nFolder).length // folder is empty
	) {
		error(`
			"talend-scripts i18n-to-github" need to consume files from xtm.
			 Please run "talend-scripts download before"
		`);
	}

	// extract version (major.minor)
	const version = getVersion();
	const branch = `${project}/${version}`;
	const githubUrl = url.replace('https://github.com', `https://${login}:${token}@github.com`);

	console.log({
		login,
		token,
		project,
		githubUrl,
		version,
		branch,
	});

	// pull repo using token
	const tmpFolderPath = path.join(process.cwd(), 'tmp');
	const localesRepoPath = path.join(tmpFolderPath, 'locales');
	if (!fs.existsSync(tmpFolderPath)) {
		fs.mkdirSync(tmpFolderPath);
	}
	rimraf.sync(localesRepoPath);
	spawn.sync('git', ['clone', githubUrl, localesRepoPath], { stdio: 'inherit' });
	spawn.sync('cd', [localesRepoPath], { stdio: 'inherit' });

	// pull or create branch
	const branchTestCode = spawn.sync(
		'git',
		['ls-remote', '--exit-code', '--heads', localesRepoPath, branch],
		{ stdio: 'inherit' },
	);
	if (branchTestCode === 2) {
		spawn.sync('git', ['checkout', '-b', branch], { stdio: 'inherit' });
	} else {
		spawn.sync('git', ['checkout', branch], { stdio: 'inherit' });
	}

	// copy files (overwrite)

	// check if there are changes
	// commit / push / tag if there are
}

module.exports = toGithub;
