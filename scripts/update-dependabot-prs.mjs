import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MISSING = Symbol('missing');
const VERSION_PATTERN =
	/^(?:workspace:)?(?:(?:\^|~|=|v)|(?:>=|<=|>|<))?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/;
let repositoryRoot;

function run(command, args, { cwd = repositoryRoot, quiet = false, allowFailure = false } = {}) {
	const result = spawnSync(command, args, {
		cwd,
		encoding: 'utf8',
		maxBuffer: 50 * 1024 * 1024,
		stdio: ['inherit', 'pipe', 'pipe'],
	});

	if (result.error) {
		throw result.error;
	}

	const stdout = result.stdout ?? '';
	const stderr = result.stderr ?? '';
	if (!quiet) {
		process.stdout.write(stdout);
		process.stderr.write(stderr);
	}

	const status = result.status ?? 1;
	if (status !== 0 && !allowFailure) {
		const detail = quiet ? `${stdout}${stderr}`.trim() : '';
		throw new Error(
			`${command} ${args.join(' ')} failed with exit code ${status}${detail ? `: ${detail}` : ''}`,
		);
	}

	return { status, stdout, stderr };
}

function parseVersion(specifier) {
	const match = VERSION_PATTERN.exec(specifier);
	if (!match) {
		return null;
	}

	return {
		major: BigInt(match[1]),
		minor: BigInt(match[2]),
		patch: BigInt(match[3]),
		prerelease: match[4] ? match[4].split('.') : [],
	};
}

function comparePrerelease(left, right) {
	if (left.length === 0) {
		return right.length === 0 ? 0 : 1;
	}
	if (right.length === 0) {
		return -1;
	}

	for (let index = 0; index < Math.max(left.length, right.length); index += 1) {
		const leftPart = left[index];
		const rightPart = right[index];
		if (leftPart === undefined) {
			return -1;
		}
		if (rightPart === undefined) {
			return 1;
		}
		if (leftPart === rightPart) {
			continue;
		}

		const leftNumeric = /^\d+$/.test(leftPart);
		const rightNumeric = /^\d+$/.test(rightPart);
		if (leftNumeric && rightNumeric) {
			const leftNumber = BigInt(leftPart);
			const rightNumber = BigInt(rightPart);
			return leftNumber < rightNumber ? -1 : 1;
		}
		if (leftNumeric !== rightNumeric) {
			return leftNumeric ? -1 : 1;
		}
		return leftPart < rightPart ? -1 : 1;
	}

	return 0;
}

function compareVersions(left, right) {
	for (const part of ['major', 'minor', 'patch']) {
		if (left[part] !== right[part]) {
			return left[part] < right[part] ? -1 : 1;
		}
	}

	return comparePrerelease(left.prerelease, right.prerelease);
}

function isObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function describe(value) {
	return value === MISSING ? '<missing>' : JSON.stringify(value);
}

function mergeValue(base, ours, theirs, location) {
	if (isDeepStrictEqual(ours, theirs)) {
		return ours;
	}
	if (isDeepStrictEqual(ours, base)) {
		return theirs;
	}
	if (isDeepStrictEqual(theirs, base)) {
		return ours;
	}

	if (isObject(ours) && isObject(theirs) && (base === MISSING || isObject(base))) {
		const keys = new Set([
			...(base === MISSING ? [] : Object.keys(base)),
			...Object.keys(ours),
			...Object.keys(theirs),
		]);
		const merged = {};

		for (const key of keys) {
			const baseValue = base !== MISSING && Object.hasOwn(base, key) ? base[key] : MISSING;
			const ourValue = Object.hasOwn(ours, key) ? ours[key] : MISSING;
			const theirValue = Object.hasOwn(theirs, key) ? theirs[key] : MISSING;
			const value = mergeValue(baseValue, ourValue, theirValue, `${location}.${key}`);
			if (value !== MISSING) {
				merged[key] = value;
			}
		}

		return merged;
	}

	if (typeof ours === 'string' && typeof theirs === 'string') {
		const ourVersion = parseVersion(ours);
		const theirVersion = parseVersion(theirs);
		if (ourVersion && theirVersion) {
			// Equal versions keep the Dependabot branch's original specifier.
			return compareVersions(ourVersion, theirVersion) >= 0 ? ours : theirs;
		}
	}

	throw new Error(
		`Cannot automatically resolve package.json conflict at ${location}: ${describe(ours)} vs ${describe(theirs)}`,
	);
}

export function mergePackageJson(base, ours, theirs, filePath = 'package.json') {
	const merged = mergeValue(base, ours, theirs, filePath);
	if (!isObject(merged)) {
		throw new Error(`The ${filePath} root must be an object.`);
	}
	return merged;
}

function currentBranch() {
	return run('git', ['branch', '--show-current'], {
		quiet: true,
	}).stdout.trim();
}

function hasMergeInProgress() {
	return (
		run('git', ['rev-parse', '--quiet', '--verify', 'MERGE_HEAD'], {
			quiet: true,
			allowFailure: true,
		}).status === 0
	);
}

function getConflictedPaths() {
	return run('git', ['diff', '--name-only', '--diff-filter=U'], { quiet: true })
		.stdout.trim()
		.split('\n')
		.filter(Boolean);
}

function readIndexStage(stage, path, root) {
	const result = run('git', ['show', `:${stage}:${path}`], {
		cwd: root,
		quiet: true,
		allowFailure: true,
	});
	return result.status === 0 ? JSON.parse(result.stdout) : MISSING;
}

export function resolveMergeConflicts(paths, root = repositoryRoot) {
	const packageJsonPaths = paths.filter(
		path => path === 'package.json' || path.endsWith('/package.json'),
	);
	const supportedPaths = new Set([...packageJsonPaths, 'pnpm-lock.yaml']);
	const unsupported = paths.filter(path => !supportedPaths.has(path));
	if (unsupported.length > 0) {
		throw new Error(`Unsupported merge conflict(s): ${unsupported.join(', ')}`);
	}

	for (const path of packageJsonPaths) {
		const base = readIndexStage(1, path, root);
		const ours = readIndexStage(2, path, root);
		const theirs = readIndexStage(3, path, root);
		if (ours === MISSING || theirs === MISSING) {
			throw new Error(`Cannot resolve ${path} conflict without both merge sides.`);
		}

		const merged = mergePackageJson(base, ours, theirs, path);
		writeFileSync(resolve(root, path), `${JSON.stringify(merged, null, 2)}\n`);
		run('git', ['add', '--', path], { cwd: root });
	}

	if (paths.includes('pnpm-lock.yaml')) {
		// pnpm install regenerates the lockfile from the reconciled manifests.
		run('git', ['checkout', '--ours', '--', 'pnpm-lock.yaml'], {
			cwd: root,
		});
		run('git', ['add', '--', 'pnpm-lock.yaml'], { cwd: root });
	}
}

function listDependabotPullRequests(repository) {
	const output = run(
		'gh',
		[
			'pr',
			'list',
			'--repo',
			repository,
			'--state',
			'open',
			'--author',
			'dependabot[bot]',
			'--limit',
			'1000',
			'--json',
			'number,headRefName',
		],
		{ quiet: true },
	).stdout;
	return JSON.parse(output);
}

function processPullRequest(pullRequest, repository, originalBranch) {
	try {
		run('gh', ['pr', 'checkout', String(pullRequest.number), '--repo', repository]);
		const checkedOutBranch = currentBranch();
		if (checkedOutBranch !== pullRequest.headRefName) {
			throw new Error(
				`Expected branch ${pullRequest.headRefName}, checked out ${checkedOutBranch || 'detached HEAD'}.`,
			);
		}

		try {
			run('git', ['merge', '--no-commit', '--no-ff', 'origin/master']);
		} catch (mergeError) {
			const conflicts = getConflictedPaths();
			if (conflicts.length === 0) {
				throw mergeError;
			}
			resolveMergeConflicts(conflicts);
		}

		const remainingConflicts = getConflictedPaths();
		if (remainingConflicts.length > 0) {
			throw new Error(`Unresolved merge conflict(s): ${remainingConflicts.join(', ')}`);
		}

		run('pnpm', ['dedupe']);
		run('pnpm', ['install', '--no-frozen-lockfile']);
		run('git', ['add', '-u']);

		const hasStagedChanges =
			run('git', ['diff', '--cached', '--quiet'], {
				quiet: true,
				allowFailure: true,
			}).status !== 0;
		if (hasMergeInProgress()) {
			run('git', ['commit', '--no-edit']);
		} else if (hasStagedChanges) {
			run('git', ['commit', '-m', 'chore(deps): update Dependabot lockfile']);
		}

		// Generated after the merge commit so the diff against master only holds the PR's own changes.
		run('node', ['./scripts/generate-dependabot-changeset.mjs', String(pullRequest.number)]);
		run('git', ['add', '--', '.changeset']);
		if (
			run('git', ['diff', '--cached', '--quiet'], { quiet: true, allowFailure: true }).status !== 0
		) {
			run('git', ['commit', '-m', 'chore(deps): add changeset']);
		}

		run('git', ['push']);
		console.log(`Updated Dependabot PR #${pullRequest.number}.`);
	} catch (error) {
		if (hasMergeInProgress()) {
			run('git', ['merge', '--abort']);
		}
		throw error;
	} finally {
		if (currentBranch() !== originalBranch) {
			run('git', ['switch', originalBranch]);
		}
	}
}

function parseOptions(args) {
	const options = { dryRun: false, help: false };
	for (const arg of args) {
		if (arg === '--') {
			continue;
		}
		if (arg === '--dry-run') {
			options.dryRun = true;
		} else if (arg === '--help' || arg === '-h') {
			options.help = true;
		} else {
			throw new Error(`Unknown option: ${arg}`);
		}
	}
	return options;
}

function main() {
	const options = parseOptions(process.argv.slice(2));
	if (options.help) {
		console.log(
			'Usage: pnpm dependabot:update [--dry-run]\n\n' +
				'Merge origin/master into every open Dependabot PR, reconcile package.json ' +
				'version conflicts, run pnpm dedupe and pnpm install, then push each branch.',
		);
		return;
	}

	const root = run('git', ['rev-parse', '--show-toplevel'], {
		cwd: process.cwd(),
		quiet: true,
	}).stdout.trim();
	repositoryRoot = root;

	const originalBranch = currentBranch();
	if (!originalBranch) {
		throw new Error('Run this script from a checked-out branch, not detached HEAD.');
	}

	const dirtyFiles = run('git', ['status', '--porcelain', '--untracked-files=all'], {
		quiet: true,
	}).stdout.trim();
	if (!options.dryRun && dirtyFiles) {
		throw new Error('Refusing to switch branches with a dirty worktree.');
	}

	const repository = run(
		'gh',
		['repo', 'view', '--json', 'nameWithOwner', '--jq', '.nameWithOwner'],
		{ quiet: true },
	).stdout.trim();
	const pullRequests = listDependabotPullRequests(repository);
	console.log(`Found ${pullRequests.length} open Dependabot pull request(s) in ${repository}.`);

	if (options.dryRun) {
		for (const pullRequest of pullRequests) {
			console.log(
				`Would merge origin/master into PR #${pullRequest.number} (${pullRequest.headRefName}), run pnpm dedupe and pnpm install, and push.`,
			);
		}
		return;
	}

	if (pullRequests.length === 0) {
		return;
	}

	run('git', ['fetch', 'origin', 'master']);
	let failures = 0;
	for (const pullRequest of pullRequests) {
		try {
			processPullRequest(pullRequest, repository, originalBranch);
		} catch (error) {
			failures += 1;
			console.error(`Failed to update Dependabot PR #${pullRequest.number}: ${error.message}`);
			if (currentBranch() !== originalBranch) {
				throw new Error(
					'Could not restore the original branch; stopping to avoid further changes.',
				);
			}
			const remainingChanges = run('git', ['status', '--porcelain', '--untracked-files=all'], {
				quiet: true,
			}).stdout.trim();
			if (remainingChanges) {
				throw new Error(
					'The failed PR left a dirty worktree; stopping before processing more PRs.',
				);
			}
		}
	}

	if (failures > 0) {
		throw new Error(`${failures} Dependabot PR(s) failed; see errors above.`);
	}
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : '';
if (invokedPath === fileURLToPath(import.meta.url)) {
	try {
		main();
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}
