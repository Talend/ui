import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import {
	buildChangeset,
	createWorkspaceManifestMatcher,
	diffDependencies,
	generateChangeset,
} from './generate-dependabot-changeset.mjs';

test('diffDependencies reports bumps, additions and removals across fields', () => {
	const before = {
		dependencies: { a: '^1.0.0', gone: '^1.0.0' },
		devDependencies: { b: '^2.0.0' },
	};
	const after = {
		dependencies: { a: '^1.1.0', added: '^3.0.0' },
		devDependencies: { b: '^2.0.0' },
	};

	assert.deepEqual(diffDependencies(before, after), [
		{ name: 'a', from: '^1.0.0', to: '^1.1.0' },
		{ name: 'added', from: undefined, to: '^3.0.0' },
		{ name: 'gone', from: '^1.0.0', to: undefined },
	]);
});

test('buildChangeset only targets public packages with changes', () => {
	const change = [{ name: 'lib', from: '^1.0.0', to: '^1.1.0' }];
	const content = buildChangeset([
		{ name: '@talend/z', private: false, changes: change },
		{ name: 'root', private: true, changes: change },
		{ name: '@talend/a', private: false, changes: change },
		{ name: '@talend/unchanged', private: false, changes: [] },
	]);

	assert.equal(
		content,
		'---\n"@talend/a": patch\n"@talend/z": patch\n---\n\nchore(deps): update lib\n\n- bump lib from ^1.0.0 to ^1.1.0\n',
	);
});

test('buildChangeset returns null when only private packages changed', () => {
	assert.equal(
		buildChangeset([
			{ name: 'root', private: true, changes: [{ name: 'x', from: '1.0.0', to: '1.0.1' }] },
		]),
		null,
	);
});

test('generateChangeset removes a previous changeset once no dependency change remains', t => {
	const root = mkdtempSync(join(tmpdir(), 'dependabot-changeset-'));
	t.after(() => rmSync(root, { recursive: true, force: true }));
	const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'ignore' });
	const writeManifest = version => {
		writeFileSync(
			join(root, 'package.json'),
			JSON.stringify({ name: '@fixture/pkg', dependencies: { dep: version } }),
		);
	};

	mkdirSync(join(root, '.changeset'));
	writeFileSync(join(root, 'pnpm-workspace.yaml'), "packages:\n  - 'packages/*'\n");
	git('init', '--quiet', '-b', 'master');
	git('config', 'user.name', 'Test User');
	git('config', 'user.email', 'test@example.com');
	writeManifest('^1.0.0');
	git('add', '.');
	git('commit', '--quiet', '-m', 'base');

	git('checkout', '--quiet', '-b', 'dependabot');
	writeManifest('^1.1.0');
	git('commit', '--quiet', '-am', 'bump');
	const options = { root, baseRef: 'master', pullRequest: '9' };
	const file = generateChangeset(options);
	assert.equal(file, join(root, '.changeset', 'dependabot-pr-9.md'));
	assert.ok(existsSync(file));

	writeManifest('^1.0.0');
	git('commit', '--quiet', '-am', 'revert');
	assert.equal(generateChangeset(options), null);
	assert.equal(existsSync(file), false);
});

test('distinct transitions of one dependency survive, identical ones are combined', () => {
	assert.deepEqual(
		diffDependencies(
			{ dependencies: { a: '^1.0.0' }, devDependencies: { a: '^2.0.0' } },
			{ dependencies: { a: '^1.1.0' }, devDependencies: { a: '^2.1.0' } },
		).length,
		2,
	);

	const content = buildChangeset([
		{ name: 'p1', changes: [{ name: 'a', from: '^1.0.0', to: '^1.1.0' }] },
		{ name: 'p2', changes: [{ name: 'a', from: '^1.0.0', to: '^1.1.0' }] },
		{ name: 'p3', changes: [{ name: 'a', from: '^2.0.0', to: '^2.1.0' }] },
	]);
	assert.match(
		content,
		/- bump a from \^1\.0\.0 to \^1\.1\.0\n- bump a from \^2\.0\.0 to \^2\.1\.0\n$/,
	);
});

test('workspace manifest matcher only accepts declared workspace packages', () => {
	const matches = createWorkspaceManifestMatcher(
		"packages:\n  - 'packages/*'\n  - 'tools/*'\n  - 'fork/*'\nlinkWorkspacePackages: true\n",
	);

	assert.equal(matches('package.json'), true);
	assert.equal(matches('packages/utils/package.json'), true);
	assert.equal(matches('tools/scripts-core/package.json'), true);
	assert.equal(matches('tools/scripts-locales/codeshift/package.json'), false);
	assert.equal(matches('packages/utils/node_modules/x/package.json'), false);
});
