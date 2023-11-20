/* eslint-disable no-console */
import { spawn } from 'child_process';

/* eslint-disable no-param-reassign */
import fs from 'fs';

import { getEnv } from '../utils/env.js';
import { getPresetApi } from '../utils/preset.js';

const reports = ['eslint-report.json', 'stylelint-report.json'];

let buff = [];

async function run(cmd, opts = {}) {
	if (opts.verbose) {
		console.log(`\n#### RUNNER: ${cmd.name} ${cmd.args.join(' ')}`);
	}
	const start = Date.now();
	return new Promise(async (resolve, reject) => {
		const out = spawn(cmd.name, cmd.args);
		let stdout = '';
		let stderr = '';
		out.on('error', error => {
			console.error(error);
			reject(error);
		});
		out.on('close', () => {
			resolve(stdout);
		});
		out.on('exit', code => {
			if (opts.verbose && stderr) {
				console.error(`#### RUNNER: Child Process STDERR: ${stderr}`);
			}
			if (opts.verbose && stdout) {
				console.error(`#### RUNNER: Child Process STDOUT: ${stdout}`);
			}
			if (code > 0) {
				run.exitCode += 1;
				console.error(`#### RUNNER: ${cmd.name} ${cmd.args.join(' ')} exit code ${code}`);
				reject(`STDOUT: ${stdout}\n\nSTDERR: ${stderr}`);
				return;
			}
			const end = Date.now();
			console.log(
				`#### RUNNER: ${cmd.name} ${cmd.args.join(' ')} exit code ${code} in ${
					(end - start) / 1000
				} seconds`,
			);
			resolve(stdout);
		});
		out.stdout.on('data', data => {
			const datastr = data.toString();
			if (data && datastr) {
				stdout += datastr;
			}
		});

		out.stderr.on('data', data => {
			const datastr = data.toString();
			if (data && datastr) {
				stderr += datastr;
			}
		});
	});
}

function transform(item) {
	if (item.source && !item.filePath) {
		item.filePath = item.source;
		delete item.source;
	}
	if (item.warnings && !item.messages) {
		item.messages = item.warnings.map(w => ({
			...w,
			severity: 1,
			message: w.text,
			ruleId: w.rule,
		}));
		item.warningCount = item.warnings.length;
		delete item.warning;
	} else if (item.messages) {
		item.messages = item.messages.map(w => ({ ...w, severity: 1 }));
		item.warningCount += item.errorCount;
		item.errorCount = 0;
	}
	return item;
}

function getPackages(packageDirs = []) {
	return packageDirs.flatMap(dir =>
		fs.readdirSync(dir).map(subDir => ({
			name: subDir,
			location: `${dir}/${subDir}`,
		})),
	);
}

export default function mergeReport(options) {
	// current env vars and talend scripts configuration in <project-folder>/talend-scripts.(js/json)
	const env = getEnv(options);
	env.TALEND_MODE = 'production';
	console.log(`Talend scripts mode : ${env.TALEND_MODE}`);
	if (env.TALEND_SCRIPTS_CONFIG) {
		console.log('Talend scripts configuration file found and loaded');
	} else {
		console.log('Talend scripts configuration file not found');
	}
	const presetApi = getPresetApi(env);
	const rootPackageDirs = presetApi.getUserConfig('lintMergeReport', {})?.packageDirs || [];
	const packages = getPackages(rootPackageDirs);

	if (packages.length === 0) {
		throw new Error(
			'No packages has been retrieved, check if the talend-scripts.json is well configured',
		);
	}

	// https://stackoverflow.com/questions/65944700/how-to-run-git-diff-in-github-actions
	const diff = run({
		name: 'git',
		args: ['diff', '--name-only', `origin/${options[0]}`, `origin/${options[1]}`],
	})
		.then(out =>
			out
				.split('\n')
				.map(str => str.trim())
				.filter(Boolean),
		)
		.catch(e => console.error(e));

	diff.then(files => {
		function onlyIfInDiff(lint) {
			return !!files.find(f => lint.filePath.endsWith(`/${f}`));
		}

		packages.forEach(pkg => {
			reports.forEach(report => {
				const fpath = `${pkg.location}/${report}`;
				if (fs.existsSync(fpath)) {
					try {
						buff = buff.concat(
							JSON.parse(fs.readFileSync(fpath)).map(transform).filter(onlyIfInDiff),
						);
					} catch (e) {
						console.error(e);
					}
				}
			});
		});
		const target = `${process.cwd()}/eslint-report.json`;

		// eslint-disable-next-line no-console
		console.log(`report merge into ${target}`);
		fs.writeFileSync(target, JSON.stringify(buff, null, 2));
	});
}
