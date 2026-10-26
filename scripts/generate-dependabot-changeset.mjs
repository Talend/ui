import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEPENDENCY_FIELDS = [
	'dependencies',
	'devDependencies',
	'peerDependencies',
	'optionalDependencies',
];

/**
 * Lists dependency specifier changes between two package.json contents.
 * @returns {{ name: string, from: string | undefined, to: string | undefined }[]}
 */
export function diffDependencies(before, after) {
	const changes = new Map();
	for (const field of DEPENDENCY_FIELDS) {
		const previous = before?.[field] ?? {};
		const next = after?.[field] ?? {};
		for (const name of new Set([...Object.keys(previous), ...Object.keys(next)])) {
			if (previous[name] !== next[name]) {
				changes.set(name, { name, from: previous[name], to: next[name] });
			}
		}
	}
	return [...changes.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function describeChange({ name, from, to }) {
	if (from && to) {
		return `bump ${name} from ${from} to ${to}`;
	}
	return to ? `add ${name} ${to}` : `remove ${name}`;
}

/**
 * Builds the changeset markdown, or null when no publishable package is affected.
 * @param {{ name: string, private?: boolean, changes: ReturnType<typeof diffDependencies> }[]} packages
 */
export function buildChangeset(packages) {
	const affected = packages
		.filter(pkg => !pkg.private && pkg.changes.length > 0)
		.sort((a, b) => a.name.localeCompare(b.name));
	if (affected.length === 0) {
		return null;
	}

	const names = new Set(affected.flatMap(pkg => pkg.changes.map(change => change.name)));
	const lines = [...new Map(affected.flatMap(pkg => pkg.changes).map(c => [c.name, c])).values()]
		.sort((a, b) => a.name.localeCompare(b.name))
		.map(change => `- ${describeChange(change)}`);
	const frontmatter = affected.map(pkg => `${JSON.stringify(pkg.name)}: patch`).join('\n');
	const title = `chore(deps): update ${[...names].sort().join(', ')}`;

	return `---\n${frontmatter}\n---\n\n${title}\n\n${lines.join('\n')}\n`;
}

function git(root, ...args) {
	return execFileSync('git', args, {
		cwd: root,
		encoding: 'utf8',
		maxBuffer: 50 * 1024 * 1024,
	});
}

function readJsonAt(root, ref, path) {
	try {
		return JSON.parse(git(root, 'show', `${ref}:${path}`));
	} catch {
		return null;
	}
}

export function generateChangeset({ root, baseRef, pullRequest }) {
	const mergeBase = git(root, 'merge-base', baseRef, 'HEAD').trim();
	const changedManifests = git(
		root,
		'diff',
		'--name-only',
		mergeBase,
		'HEAD',
		'--',
		'*package.json',
	)
		.split('\n')
		.filter(Boolean);

	const packages = [];
	for (const path of changedManifests) {
		const after = existsSync(join(root, path))
			? JSON.parse(readFileSync(join(root, path), 'utf8'))
			: null;
		if (!after?.name) {
			continue;
		}
		packages.push({
			name: after.name,
			private: Boolean(after.private),
			changes: diffDependencies(readJsonAt(root, mergeBase, path), after),
		});
	}

	const content = buildChangeset(packages);
	if (content === null) {
		return null;
	}
	const file = join(root, '.changeset', `dependabot-pr-${pullRequest}.md`);
	writeFileSync(file, content);
	return file;
}

function main() {
	const args = process.argv.slice(2).filter(arg => arg !== '--');
	const pullRequest = args[0];
	if (!/^\d+$/.test(pullRequest ?? '')) {
		throw new Error('Usage: pnpm dependabot:changeset <pull-request-number> [base-ref]');
	}
	const root = git(process.cwd(), 'rev-parse', '--show-toplevel').trim();
	const file = generateChangeset({ root, baseRef: args[1] ?? 'origin/master', pullRequest });
	console.log(file ? `Wrote ${file}` : 'No publishable package affected; no changeset needed.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	try {
		main();
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}
