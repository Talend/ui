const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const spawn = require('cross-spawn');

const { error, printSection, printSuccess, printRunning } = require('../common/log');

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
			No folder found at ${i18nFolder} or the folder is empty.
			Are you sure you run "talend-scripts download" before ?
		`);
	} else {
		printSuccess(`${i18nFolder} found and contains files to add.`);
	}
}

function cloneLocalesRepo(githubUrl, localesRepoPath) {
	rimraf.sync(localesRepoPath);
	const { status } = spawn.sync('git', ['clone', githubUrl, localesRepoPath], { stdio: 'inherit' });
	if (status !== 0) {
		error(`Pull repository failed: git clone ${githubUrl} ${localesRepoPath}`);
	} else {
		printSuccess(`Repositiory cloned to ${localesRepoPath}`);
	}
}

function switchToBranch({ githubUrl, branchName }, repoCmdContext) {
	const branchTestCode = spawn.sync(
		'git',
		['ls-remote', '--exit-code', '--heads', githubUrl, branchName],
		{ stdio: 'inherit' },
	);

	const { status } =
		branchTestCode.status === 2
			? spawn.sync('git', ['checkout', '-b', branchName], repoCmdContext)
			: spawn.sync('git', ['checkout', branchName], repoCmdContext);

	if (status !== 0) {
		error('Error while switching branch');
	} else {
		printSuccess(`Branch set to ${branchName}`);
	}
}

function pushI18nFiles(options, repoCmdContext) {
	const { branchName, i18nFolder, localesRepoPath, project, version } = options;

	printRunning(`Copy ${i18nFolder}/ files into locales repository ${localesRepoPath}`);
	spawn.sync('cp', ['-r', `${i18nFolder}/.`, localesRepoPath], { stdio: 'inherit' });

	printRunning('git add .');
	spawn.sync('git', ['add', '.'], repoCmdContext);

	printRunning(`git commit -m 'feat(${project}): update locales files for ${version}'`);
	spawn.sync(
		'git',
		['commit', '-m', `feat(${project}): update locales files for ${version}`],
		repoCmdContext,
	);

	printRunning(`git push origin ${branchName}`);
	const { status } = spawn.sync('git', ['push', 'origin', branchName], repoCmdContext);
	if (status !== 0) {
		error('Error while pushing');
	}
	printSuccess(`Version ${version} pushed to repository on branch ${branchName}`);
}

function toGithub({ load, github }) {
	const { login, token } = getGithubVariables();
	const { url } = github;
	const { project, target } = load;

	// check if i18n files are here or ask user to perform download
	const i18nFolder = path.join(process.cwd(), target);
	checkI18nFolder(i18nFolder);

	const localesRepoPath = path.join(process.cwd(), 'tmp', 'locales');
	const githubUrl = url.replace('https://github.com', `https://${login}:${token}@github.com`);
	const repoCmdContext = { stdio: 'inherit', cwd: localesRepoPath };

	// clone locales repo to commit the i18n files
	printSection('Clone repo');
	cloneLocalesRepo(githubUrl, localesRepoPath);
	printSuccess(`Locales repository cloned to ${localesRepoPath}`);

	// for each version folder, push the files to github
	const i18nContent = fs.readdirSync(i18nFolder);
	i18nContent.forEach(version => {
		printSection(`Version ${version}`);
		const versionOptions = {
			branchName: `${project}/${version}`,
			githubUrl,
			i18nFolder: path.join(i18nFolder, version),
			localesRepoPath,
			project,
			version,
		};
		switchToBranch(versionOptions, repoCmdContext);
		pushI18nFiles(versionOptions, repoCmdContext);
	});
}

module.exports = toGithub;
