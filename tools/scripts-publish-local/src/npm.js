/* eslint-disable no-console */
const fs = require('fs');
const os = require('os');
const path = require('path');
const generator = require('generate-password');
const rimraf = require('rimraf');
const cmd = require('./cmd');

const NPMRC = `${os.homedir()}/.npmrc`;
const AUTH_TOKEN_LINE = '//registry.npmjs.org/:_authToken=';
const VERDACCIO_AUTH_TOKEN_LINE = '//localhost:4873/:_authToken=';
const YARN_CACHE_DIR = path.join(process.cwd(), 'TMP_YARN_CACHE');

const cache = {
	// to be sure the user creation is working every time
	user: generator.generate({
		length: 10,
		uppercase: false,
	}),
	password: generator.generate({
		length: 10,
		numbers: true,
	}),
};

const CWD = process.cwd();

function beforeSetup() {
	const npmrc = path.join(CWD, '.npmrc');
	const yarnrc = path.join(CWD, '.yarnrc');
	if (fs.existsSync(npmrc)) {
		console.log(`rm -rf ${npmrc}`);
		rimraf.sync(npmrc);
	}
	fs.writeFileSync(npmrc, 'registry=http://localhost:4873/');
	if (fs.existsSync(yarnrc)) {
		console.log(`rm -rf ${yarnrc}`);
		rimraf.sync(yarnrc);
	}
	fs.writeFileSync(yarnrc, 'registry "http://localhost:4873/"');
}

function getNPMToken() {
	const npmrcLines = fs.readFileSync(NPMRC).toString().split(os.EOL);
	const npmjsAuth = npmrcLines.find(line => line.startsWith(AUTH_TOKEN_LINE));
	return npmjsAuth.replace(AUTH_TOKEN_LINE, '');
}

function addUser() {
	console.log('addUser');
	return new Promise((resolve, reject) => {
		cmd.run('npm adduser --registry http://localhost:4873/ --always-auth', {
			interactive: npmaddUser => {
				npmaddUser.stdout.on('data', data => {
					if (data.includes('Username:')) {
						npmaddUser.stdin.write(`${cache.user}\n`);
					} else if (data.includes('Password:')) {
						npmaddUser.stdin.write(`${cache.password}\n`);
					} else if (data.includes('Email:')) {
						npmaddUser.stdin.write('local@talend.com\n');
					} else if (data.includes(`Logged in as ${cache.user} on`)) {
						resolve();
					}
				});
				npmaddUser.stderr.on('data', data => {
					reject(data.toString());
				});
			},
		});
	});
}

async function setup(repositories) {
	console.log(`npm.setup(repositories ${repositories?.length})`);
	if (!cache.defaultRegistry) {
		try {
			const registry = await cmd.run('npm get registry');
			cache.defaultRegistry = registry.trim().split(os.EOL)[0];
		} catch (error) {
			console.error(error);
		}
	}
	const npmrcLines = fs.readFileSync(NPMRC).toString().split(os.EOL);
	const verdaccioAuth = npmrcLines.find(line => line.startsWith(VERDACCIO_AUTH_TOKEN_LINE));
	if (verdaccioAuth) {
		const updatedContent = npmrcLines.filter(l => l !== verdaccioAuth).join(os.EOL);
		fs.writeFileSync(NPMRC, updatedContent);
	}
	await cmd.run('npm set registry http://localhost:4873/');
	await cmd.run('yarn config set registry http://localhost:4873/');
	try {
		const yarncachedir = await cmd.run('yarn cache dir');
		cache.yarncachedir = yarncachedir.trim();
		await cmd.run(`yarn config set cache-folder ${YARN_CACHE_DIR}`);
	} catch (error) {
		console.error(error);
	}

	// ensure there is no npmrc/yarnrc in each repositories
	repositories.forEach(repository => {
		const cwd = repository.path;
		const npmrc = path.join(cwd, '.npmrc');
		const yarnrc = path.join(cwd, '.yarnrc');
		const yarnlock = path.join(cwd, 'yarn.lock');
		if (fs.existsSync(npmrc)) {
			console.log(`rm -rf ${npmrc}`);
			rimraf.sync(npmrc);
			fs.writeFileSync(npmrc, 'registry "http://localhost:4873/"');
		}
		if (fs.existsSync(yarnrc)) {
			console.log(`rm -rf ${yarnrc}`);
			rimraf.sync(yarnrc);
			fs.writeFileSync(yarnrc, 'registry "http://localhost:4873/"');
		}
		if (fs.existsSync(yarnlock)) {
			console.log(`rm -rf ${yarnlock}`);
			rimraf.sync(yarnlock);
		}
	});
	return addUser();
}

function tearDown() {
	console.log('npm.tearDown()');
	try {
		const npmrc = path.join(CWD, '.npmrc');
		const yarnrc = path.join(CWD, '.yarnrc');
		if (fs.existsSync(npmrc)) {
			console.log(`rm -rf ${npmrc}`);
			rimraf.sync(npmrc);
		}
		if (fs.existsSync(yarnrc)) {
			console.log(`rm -rf ${yarnrc}`);
			rimraf.sync(yarnrc);
		}
		rimraf(YARN_CACHE_DIR, function (error) {
			console.error(error);
		});
		cmd.runSync('yarn config delete cache-folder');
	} catch (error) {
		console.error(error);
	}
	cmd.runSync('npm set registry https://registry.npmjs.org');
	cmd.runSync('yarn config set registry https://registry.yarnpkg.com');
}

module.exports = {
	beforeSetup,
	setup,
	tearDown,
	getNPMToken,
};
