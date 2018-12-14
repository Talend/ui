/* eslint-disable global-require,no-console */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const xmlParser = require('xml2json');
const spawn = require('cross-spawn');

const error = require('../common/error');

function printSection(title) {
	console.log('\n------------------------------');
	console.log(`-- ${title}`);
	console.log('------------------------------');
}

function printSuccess(text) {
	console.log(`✔ ${text}`);
}

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

function checkI18nFolder(i18nFolder) {
	printSection('Check i18n files');
	if (
		!fs.existsSync(i18nFolder) || // folder doesn't exist
		!fs.lstatSync(i18nFolder).isDirectory() || // is not a folder
		!fs.readdirSync(i18nFolder).length // folder is empty
	) {
		error(`
			"talend-scripts i18n-to-github" need to consume files from xtm.
			 Please run "talend-scripts download before"
		`);
	} else {
		printSuccess(`${i18nFolder} found and contains files to add.`);
	}
}

function getVersion() {
	printSection('Extract version');
	const lernaJsonPath = path.join(process.cwd(), 'lerna.json');
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const pomXmlPath = path.join(process.cwd(), 'pom.xml');
	const VERSION_REGEX = /^([0-9]+\.[0-9]+).*/;

	let extractedVersion;
	let source;
	if (fs.existsSync(lernaJsonPath)) {
		const { version } = require(lernaJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			source = 'lerna.json';
			extractedVersion = match[1];
		}
	} else if (!extractedVersion && fs.existsSync(packageJsonPath)) {
		const { version } = require(packageJsonPath);
		const match = version.match(VERSION_REGEX);
		if (match) {
			source = 'package.json';
			extractedVersion = match[1];
		}
	} else if (!extractedVersion && fs.existsSync(pomXmlPath)) {
		const data = fs.readFileSync(pomXmlPath);
		const { version } = xmlParser.toJson(data);
		const match = version.match(VERSION_REGEX);
		if (match) {
			source = 'pom.xml';
			extractedVersion = match[1];
		}
	}

	if (!extractedVersion) {
		error(`
			talend-scripts can't determine your project version. Possible reasons : 
				* no package.json or pom.xml in this directory
				* no version in package.json or pom.xml
		`);
	}

	printSuccess(`Version extracted from ${source}: ${extractedVersion}`);
	return extractedVersion;
}

function cloneLocalesRepo(githubUrl, localesRepoPath) {
	printSection('Cloned repository');
	rimraf.sync(localesRepoPath);
	const { status } = spawn.sync('git', ['clone', githubUrl, localesRepoPath], { stdio: 'inherit' });
	if (status !== 0) {
		error(`Pull repository failed: git clone ${githubUrl} ${localesRepoPath}`);
	} else {
		printSuccess(`Repositiory cloned to ${localesRepoPath}`);
	}
}

function toGithub({ load, github }) {
	const { login, token } = getGithubVariables();
	const { url } = github;
	const { project, target } = load;

	// check if i18n files are here or ask user to perform download
	const i18nFolder = path.join(process.cwd(), target, 'i18n');
	checkI18nFolder(i18nFolder);

	// extract version (major.minor)
	const version = getVersion();
	const tagName = `${project}/${version}`;
	const branchName = `release/${tagName}`;

	// pull repo using token
	const githubUrl = url.replace('https://github.com', `https://${login}:${token}@github.com`);
	const tmpFolderPath = path.join(process.cwd(), 'tmp');
	const localesRepoPath = path.join(tmpFolderPath, 'locales');
	cloneLocalesRepo(githubUrl, localesRepoPath);
	const repoCmdContext = { stdio: 'inherit', cwd: localesRepoPath };

	// pull or create branch
	const branchTestCode = spawn.sync(
		'git',
		['ls-remote', '--exit-code', '--heads', githubUrl, branchName],
		{ stdio: 'inherit' },
	);
	if (branchTestCode.status === 2) {
		spawn.sync('git', ['checkout', '-b', branchName], repoCmdContext);
	} else {
		spawn.sync('git', ['checkout', branchName], repoCmdContext);
	}

	// copy files (overwrite)
	spawn.sync('cp', ['-r', `${i18nFolder}/.`, localesRepoPath], { stdio: 'inherit' });

	// commit / tag / push
	console.log('git add .');
	spawn.sync('git', ['add', '.'], repoCmdContext);
	console.log(`git commit -m 'feat(${project}): update locales files for ${version}'`);
	spawn.sync(
		'git',
		['commit', '-m', `feat(${project}): update locales files for ${version}`],
		repoCmdContext,
	);
	console.log(`git tag ${tagName} -f`);
	spawn.sync('git', ['tag', tagName, '-f'], repoCmdContext);
	console.log(`git push origin ${branchName}`);
	spawn.sync('git', ['push', 'origin', branchName], repoCmdContext);
	console.log(`git push origin :refs/tags/${tagName}`);
	spawn.sync('git', ['push', 'origin', `:refs/tags/${tagName}`], repoCmdContext);
	console.log('git push --tags');
	spawn.sync('git', ['push', '--tags'], repoCmdContext);
}

module.exports = toGithub;
