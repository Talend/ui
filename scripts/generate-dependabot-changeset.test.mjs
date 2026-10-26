import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildChangeset, diffDependencies } from './generate-dependabot-changeset.mjs';

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
