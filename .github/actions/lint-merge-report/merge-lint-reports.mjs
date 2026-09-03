#!/usr/bin/env node
/* eslint-disable no-console */
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const [baseBranch, headBranch] = process.argv.slice(2);

if (!baseBranch || !headBranch) {
	console.error('Usage: merge-lint-reports.mjs <base-branch> <head-branch>');
	process.exit(1);
}

const reports = ['eslint-report.json', 'stylelint-report.json'];

function getPackageDirs() {
	const configPath = path.join(process.cwd(), 'talend-scripts.json');
	if (fs.existsSync(configPath)) {
		const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
		return config?.lintMergeReport?.packageDirs ?? [];
	}
	return [];
}

function getPackages(packageDirs) {
	return packageDirs.flatMap(dir =>
		fs.readdirSync(dir).map(subDir => ({
			name: subDir,
			location: `${dir}/${subDir}`,
		})),
	);
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

function runGitDiff(base, head) {
	return new Promise((resolve, reject) => {
		const proc = spawn('git', ['diff', '--name-only', `origin/${base}`, `origin/${head}`]);
		let stdout = '';
		let stderr = '';
		proc.stdout.on('data', data => {
			stdout += data.toString();
		});
		proc.stderr.on('data', data => {
			stderr += data.toString();
		});
		proc.on('close', code => {
			if (code !== 0) {
				reject(new Error(`git diff failed (exit ${code}): ${stderr}`));
			} else {
				resolve(
					stdout
						.split('\n')
						.map(s => s.trim())
						.filter(Boolean),
				);
			}
		});
	});
}

const packageDirs = getPackageDirs();
const packages = getPackages(packageDirs);

if (packages.length === 0) {
	console.error('No packages found. Check lintMergeReport.packageDirs in talend-scripts.json');
	process.exit(1);
}

const files = await runGitDiff(baseBranch, headBranch);
const onlyIfInDiff = lint => files.some(f => lint.filePath.endsWith(`/${f}`));

const buff = [];
for (const pkg of packages) {
	for (const report of reports) {
		const fpath = `${pkg.location}/${report}`;
		if (fs.existsSync(fpath)) {
			try {
				const items = JSON.parse(fs.readFileSync(fpath, 'utf-8'));
				buff.push(...items.map(transform).filter(onlyIfInDiff));
			} catch (e) {
				console.error(`Failed to read ${fpath}:`, e.message);
			}
		}
	}
}

const target = path.join(process.cwd(), 'eslint-report.json');
console.log(`Merged ${buff.length} lint result(s) → ${target}`);
fs.writeFileSync(target, JSON.stringify(buff, null, 2));
