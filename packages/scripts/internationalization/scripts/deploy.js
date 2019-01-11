/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const spawn = require('cross-spawn');
const template = require('lodash.template');

const error = require('../common/error');
const { printInfo, printRunning, printSuccess, printSection } = require('../common/log');

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

function generateNpmModule(options, repoCmdContext, module) {
	const packageJsonPath = path.join(repoCmdContext.cwd, 'package.json');

	if (fs.existsSync(packageJsonPath)) {
		// increment version in package.json
		const packageJson = require(packageJsonPath);
		printInfo(`Package.json found for existing module ${packageJson.name}`);

		const previousVersion = packageJson.version;
		const versionParts = packageJson.version.match(/([0-9]+\.[0-9]+\.)([0-9]+)/);
		const incrementedLast = Number(versionParts[2]) + 1;
		packageJson.version = `${versionParts[1]}${incrementedLast}`;
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

		printSuccess(`${packageJson.name} version: ${previousVersion} --> ${packageJson.version}`);
	} else {
		// generate package.json
		printRunning('Generating package.json');
		const packageJson = {
			name: `@talend/locales-${options.project.toLowerCase()}`,
			version: `${options.version}.0`,
			main: 'index.js',
			license: 'Apache-2.0',
			author: 'Talend Frontend <frontend@talend.com>',
			repository: {
				type: 'git',
				url: options.originalGithubUrl,
			},
		};
		if (module.private) {
			packageJson.private = true;
		}
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
		printSuccess(`Package.json saved to ${packageJsonPath}`);
	}

	// Get languages definitions
	// name: folder name
	// absPath: folder absolute path
	// namespaces: the name of the files it contains
	// 		--> "toto.json tata.json" --> namespaces = ['toto', 'tata']
	const languageDirectories = fs
		.readdirSync(repoCmdContext.cwd)
		.map(name => ({
			name,
			absPath: path.join(repoCmdContext.cwd, name),
		}))
		.filter(({ name }) => name !== '.git')
		.filter(({ absPath }) => fs.lstatSync(absPath).isDirectory())
		.map(directory => ({
			...directory,
			language: directory.name.substr(0, directory.name.indexOf('_')),
			namespaces: fs
				.readdirSync(directory.absPath)
				.map(fileName => fileName.match(/(.*)\.json/)[1]),
		}));

	// generate index.js
	const languageTemplate = template('const <%= language %> = {\n<%= filesRequires %>\n};');
	const requireTemplate = template(
		"	'<%= namespace %>': require('./<%= folderName %>/<%= namespace %>.json'),",
	);
	const exportsTemplate = template('module.exports = { <%= languages %> };\n');

	printRunning('Generating index.js');
	const languagesDefinitions = languageDirectories
		.map(directory => {
			const filesRequires = directory.namespaces
				.map(namespace => requireTemplate({ namespace, folderName: directory.name }))
				.join('\n');
			return languageTemplate({ language: directory.language, filesRequires });
		})
		.join('\n');
	const exportsDefinitions = exportsTemplate({
		languages: languageDirectories.map(({ language }) => language).join(','),
	});

	const indexJsPath = path.join(repoCmdContext.cwd, 'index.js');
	fs.writeFileSync(indexJsPath, `${languagesDefinitions}\n${exportsDefinitions}`);
	printSuccess(`index.js saved to ${indexJsPath}`);
}

function generateModule(options, repoCmdContext, module) {
	printSection('Module generation');

	if (!module) {
		printInfo(
			'No module requested. If it\'s a mistake, please provide the "module" option to talend-i18n.json.',
		);
	}
	switch (module.type) {
		case 'npm':
			generateNpmModule(options, repoCmdContext, module);
			break;
		case 'mvn':
			printInfo('Module mvn is not available yet');
			break;
		default:
			error(
				`You requested a module with the type "${
					module.type
				}" which is not supported. Please fix your talend-i18n.json.`,
			);
			break;
	}
}

function pushI18nFiles(options, repoCmdContext) {
	printSection('Github');
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

function deployModule(options, repoCmdContext, module) {
	if (!module) {
		return;
	}

	printSection('Module deployment');
	switch (module.type) {
		case 'npm':
			printRunning('> npm publish');
			// spawn.sync('npm', ['publish'], repoCmdContext);
			break;
		case 'mvn':
			printRunning('> mvn deploy');
			// spawn.sync('mvn', ['deploy'], repoCmdContext);
			break;
		default:
			break;
	}
}

function toGithub({ load, github, module }) {
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
			originalGithubUrl: url,
			githubUrl,
			i18nFolder: path.join(i18nFolder, version),
			localesRepoPath,
			project,
			version,
		};
		switchToBranch(versionOptions, repoCmdContext);
		generateModule(versionOptions, repoCmdContext, module);
		pushI18nFiles(versionOptions, repoCmdContext);
		deployModule(versionOptions, repoCmdContext, module);
	});
}

module.exports = toGithub;
