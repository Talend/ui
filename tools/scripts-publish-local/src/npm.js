/* eslint-disable no-console */
const fs = require('fs');
const os = require('os');
const path = require('path');
const generator = require('generate-password');
const { rimrafSync, rimraf } = require('rimraf');
const cmd = require('./cmd');

const NPMRC = `${os.homedir()}/.npmrc`;
const AUTH_TOKEN_LINE = '//registry.npmjs.org/:_authToken=';
const VERDACCIO_AUTH_TOKEN_LINE = '//localhost:4873/:_authToken=';
const PNPM_STORE_DIR = path.join(process.cwd(), 'TMP_PNPM_STORE');

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
	if (fs.existsSync(npmrc)) {
		console.log(`rm -rf ${npmrc}`);
		rimrafSync(npmrc);
	}
	fs.writeFileSync(npmrc, 'registry=http://localhost:4873/');
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
	await cmd.run('pnpm config set registry http://localhost:4873/');
	try {
		const pnpmstoredir = await cmd.run('pnpm store path');
		cache.pnpmstoredir = pnpmstoredir.trim();
		await cmd.run(`pnpm config set store-dir ${PNPM_STORE_DIR}`);
	} catch (error) {
		console.error(error);
	}

	// ensure there is no npmrc/pnpm-lock.yaml in each repositories
	repositories.forEach(repository => {
		const cwd = repository.path;
		const npmrc = path.join(cwd, '.npmrc');
		const pnpmLock = path.join(cwd, 'pnpm-lock.yaml');
		if (fs.existsSync(npmrc)) {
			console.log(`rm -rf ${npmrc}`);
			rimrafSync(npmrc);
			fs.writeFileSync(npmrc, 'registry=http://localhost:4873/');
		}
		if (fs.existsSync(pnpmLock)) {
			console.log(`rm -rf ${pnpmLock}`);
			rimrafSync(pnpmLock);
		}
	});
	return addUser();
}

function tearDown() {
	console.log('npm.tearDown()');
	try {
		const npmrc = path.join(CWD, '.npmrc');
		if (fs.existsSync(npmrc)) {
			console.log(`rm -rf ${npmrc}`);
			rimrafSync(npmrc);
		}
		rimraf(PNPM_STORE_DIR).then(error => {
			console.error(error);
		});
		cmd.runSync('pnpm config delete store-dir');
	} catch (error) {
		console.error(error);
	}
	cmd.runSync('npm set registry https://registry.npmjs.org');
	cmd.runSync('pnpm config set registry https://registry.npmjs.org');
}

module.exports = {
	beforeSetup,
	setup,
	tearDown,
	getNPMToken,
};
