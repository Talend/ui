import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { mergePackageJson, resolveMergeConflicts } from './update-dependabot-prs.mjs';

test('keeps the newest version for each dependency and retains one-sided additions', () => {
	const base = {
		dependencies: {
			'@fixture/ours-newer': '^1.0.0',
			'@fixture/theirs-newer': '^2.0.0',
			'@fixture/unchanged': '^3.0.0',
		},
	};
	const ours = {
		dependencies: {
			'@fixture/ours-newer': '^1.2.0',
			'@fixture/theirs-newer': '^2.1.0',
			'@fixture/unchanged': '^3.0.0',
			'@fixture/pr-only': '^4.0.0',
		},
	};
	const theirs = {
		dependencies: {
			'@fixture/ours-newer': '^1.1.0',
			'@fixture/theirs-newer': '^2.2.0',
			'@fixture/unchanged': '^3.0.0',
			'@fixture/main-only': '^5.0.0',
		},
	};

	assert.deepEqual(mergePackageJson(base, ours, theirs), {
		dependencies: {
			'@fixture/ours-newer': '^1.2.0',
			'@fixture/theirs-newer': '^2.2.0',
			'@fixture/unchanged': '^3.0.0',
			'@fixture/pr-only': '^4.0.0',
			'@fixture/main-only': '^5.0.0',
		},
	});
});

test('treats a stable release as newer than its prerelease', () => {
	const base = { devDependencies: { fixture: '^1.2.0-beta.2' } };
	const ours = { devDependencies: { fixture: '^1.2.0-beta.10' } };
	const theirs = { devDependencies: { fixture: '^1.2.0' } };

	assert.deepEqual(mergePackageJson(base, ours, theirs), {
		devDependencies: { fixture: '^1.2.0' },
	});
});

test('rejects conflicting values that are not comparable versions', () => {
	const base = { scripts: { check: 'old command' } };
	const ours = { scripts: { check: 'Dependabot-side command' } };
	const theirs = { scripts: { check: 'main-side command' } };

	assert.throws(
		() => mergePackageJson(base, ours, theirs),
		/Cannot automatically resolve package\.json conflict at package\.json\.scripts\.check/,
	);
});

test('does not pick between upper-bound ranges automatically', () => {
	assert.throws(
		() =>
			mergePackageJson(
				{ dependencies: { fixture: '>=1.0.0' } },
				{ dependencies: { fixture: '>=2.0.0' } },
				{ dependencies: { fixture: '<3.0.0' } },
			),
		/Cannot automatically resolve/,
	);
});

function setupConflictRepo(t) {
	const cwd = mkdtempSync(join(tmpdir(), 'dependabot-manifest-conflict-'));
	t.after(() => rmSync(cwd, { recursive: true, force: true }));
	const git = (...args) => execFileSync('git', args, { cwd, stdio: 'ignore' });
	const writePackageJson = (path, dependency, version) => {
		const filePath = join(cwd, path);
		mkdirSync(dirname(filePath), { recursive: true });
		writeFileSync(
			filePath,
			`${JSON.stringify({ dependencies: { [dependency]: version } }, null, 2)}\n`,
		);
	};

	git('init', '--quiet');
	git('config', 'user.name', 'Test User');
	git('config', 'user.email', 'test@example.com');
	git('checkout', '-b', 'main');
	writePackageJson('package.json', '@fixture/root', '^1.0.0');
	writePackageJson('qlik-trial/fixture/package.json', '@fixture/workspace', '^2.0.0');
	git('add', '.');
	git('commit', '--quiet', '-m', 'base');

	git('checkout', '-b', 'dependabot');
	writePackageJson('package.json', '@fixture/root', '^1.2.0');
	writePackageJson('qlik-trial/fixture/package.json', '@fixture/workspace', '^2.2.0');
	git('add', '.');
	git('commit', '--quiet', '-m', 'Dependabot versions');

	git('checkout', 'main');
	writePackageJson('package.json', '@fixture/root', '^1.3.0');
	writePackageJson('qlik-trial/fixture/package.json', '@fixture/workspace', '^2.4.0');
	git('add', '.');
	git('commit', '--quiet', '-m', 'main versions');
	git('checkout', 'dependabot');

	const merge = spawnSync('git', ['merge', '--no-commit', '--no-ff', 'main'], {
		cwd,
		stdio: 'ignore',
	});
	assert.notEqual(merge.status, 0, 'fixture must have manifest conflicts');

	const conflictedPaths = execFileSync('git', ['diff', '--name-only', '--diff-filter=U'], {
		cwd,
		encoding: 'utf8',
	})
		.trim()
		.split('\n')
		.sort();

	assert.deepEqual(conflictedPaths, ['package.json', 'qlik-trial/fixture/package.json']);
	return { cwd, conflictedPaths };
}

test('resolves simultaneous root and workspace package.json conflicts', t => {
	const { cwd, conflictedPaths } = setupConflictRepo(t);

	resolveMergeConflicts(conflictedPaths, cwd);

	assert.equal(
		JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')).dependencies['@fixture/root'],
		'^1.3.0',
	);
	assert.equal(
		JSON.parse(readFileSync(join(cwd, 'qlik-trial/fixture/package.json'), 'utf8')).dependencies[
			'@fixture/workspace'
		],
		'^2.4.0',
	);
	assert.equal(
		execFileSync('git', ['diff', '--name-only', '--diff-filter=U'], {
			cwd,
			encoding: 'utf8',
		}).trim(),
		'',
	);
});
