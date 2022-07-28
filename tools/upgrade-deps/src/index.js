/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint no-console: 0 */
const { exec, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = require('./colors');
const npm = require('./npm');
const yarn = require('./yarn');
const changeset = require('./changeset');
const { upgradeSecurityVersion } = require('./security');

const CWD = process.cwd();

async function executeAll(cmds) {
	console.log('EXECUTE ALL:', cmds);
	for (const cmd of cmds) {
		try {
			console.log('\n##################\n', cmd, '\n##################\n');
			await new Promise((resolve, reject) => {
				const child = exec(cmd, { cwd: CWD });
				child.stdout.on('data', data => {
					console.log(data.toString());
				});
				child.stderr.on('data', data => {
					console.error(colors.red(data.toString()));
				});
				child.on('close', code => {
					if (code === 0) {
						resolve(child.stdout);
					} else {
						reject(code);
						process.exit(code);
					}
				});
			});
		} catch (error) {
			console.error(error);
			process.exit(1);
		}
	}
}

function getOptions(program) {
	const opts = {
		scope: program.scope,
		package: program.package,
		startsWith: program['starts-with'],
		dry: program.dry || false,
		latest: program.latest,
		next: program.next,
		security: program.security,
		message: program.message,
		ignoreScripts: program['ignore-scripts'],
	};
	if (program['talend-major']) {
		opts.scope = '@talend';
		opts.latest = true;
	}
	if (program.check) {
		opts.latest = true;
		opts.dry = true;
	}
	return opts;
}

async function upgradeYarnProject(program) {
	const commands = [];
	const opts = getOptions(program);

	if (program.changeset && changeset.isSetup()) {
		changeset.add(opts);
		return true;
	}

	if (program.security) {
		if (opts.scope) {
			throw new Error('Deps security fix mode is incompatible with "scope" option.');
		}
		if (opts.package) {
			throw new Error('Deps security fix mode is incompatible with "package" option.');
		}
		if (opts.startsWith) {
			throw new Error('Deps security fix mode is incompatible with "starts-with" option.');
		}
		if (opts.dry) {
			throw new Error('Deps security fix mode is incompatible with "dry" option.');
		}
		if (opts.latest) {
			throw new Error('Deps security fix mode is incompatible with "latest" option.');
		}
		if (opts.next) {
			throw new Error('Deps security fix mode is incompatible with "next" option.');
		}

		const securityConfPath = path.join(CWD, program.security);
		if (!fs.existsSync(securityConfPath)) {
			throw new Error(
				`Deps security fix mode requires a configuration file. "${program.security}" does not exist. Check the following link to get the configuration file format: https://github.com/Talend/ui-scripts/tree/master/packages/upgrade//README.md#security-mode`,
			);
		}
		const packageMetadata = require(securityConfPath);
		console.log('Security configuration found', packageMetadata);

		const reportFilePath = path.join(process.cwd(), 'talend-security-report.json');
		if (fs.existsSync(reportFilePath)) {
			fs.rmSync(reportFilePath);
		}

		const { changed, reports } = await upgradeSecurityVersion(packageMetadata);
		fs.writeFileSync(reportFilePath, JSON.stringify(reports, null, 2));
		const reportLog = `echo "Dependency security done. Check the report: ${reportFilePath}"`;

		return changed ? executeAll(['yarn install', reportLog]) : executeAll([reportLog]);
	}

	const changed = await npm.checkPackageJson(`${CWD}/package.json`, opts);
	let yarnOpts = opts.ignoreScripts ? '--ignore-scripts' : '';
	if (!opts.dry) {
		if (!opts.scope && !opts.package && !opts.startsWith) {
			commands.unshift(`yarn upgrade ${yarnOpts}`);
			if (changed) {
				commands.unshift(`yarn install ${yarnOpts}`);
			}
		} else {
			await yarn.removeFromLockFile(opts);
			commands.unshift(`yarn install ${yarnOpts}`);
		}
		spawnSync(yarn.getYarnDedupBin());
		return executeAll(commands);
	}

	return true;
}

async function upgradeNpmProject(program) {
	const commands = [];
	const opts = getOptions(program);
	let changed = await npm.checkPackageJson(`${CWD}/package.json`, opts);
	let npmOpts = opts.ignoreScripts ? '--ignore-scripts' : '';
	if (!opts.dry) {
		if (!opts.scope && !opts.package && !opts.startsWith) {
			commands.unshift(`npm update ${npmOpts}`);
			if (changed) {
				commands.unshift(`npm install ${npmOpts}`);
			}
		} else {
			await npm.removeFromLockFile(opts);
			commands.unshift(`npm install ${npmOpts}`);
		}
		commands.push('npm prune');
		return executeAll(commands);
	}
}

module.exports = {
	upgradeYarnProject,
	upgradeNpmProject,
};
