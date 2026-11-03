import { appendFile, readFile, writeFile } from 'node:fs/promises';

const toolVersionsPath = process.argv[2] ?? '.tool-versions';
const nodeResponse = await fetch('https://nodejs.org/dist/index.json');
if (!nodeResponse.ok) {
	throw new Error(`Failed to fetch Node.js releases: ${nodeResponse.status}`);
}
const nodeReleases = await nodeResponse.json();
const latestLts = nodeReleases.find(release => release.lts);
if (!latestLts) {
	throw new Error('No Node.js LTS release found');
}
const nodeVersion = latestLts.version.replace(/^v/, '');

const pnpmResponse = await fetch('https://registry.npmjs.org/pnpm/latest');
if (!pnpmResponse.ok) {
	throw new Error(`Failed to fetch pnpm release: ${pnpmResponse.status}`);
}
const { version: pnpmVersion } = await pnpmResponse.json();

for (const [name, version] of [
	['nodejs', nodeVersion],
	['pnpm', pnpmVersion],
]) {
	if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
		throw new Error(`Unexpected ${name} version: ${version}`);
	}
}

const content = await readFile(toolVersionsPath, 'utf8');
const counts = new Map([
	['nodejs', 0],
	['pnpm', 0],
]);
const updatedContent = content
	.split(/\r?\n/)
	.map(line => {
		const match = line.match(/^(\s*)(nodejs|pnpm)(\s+)(\S+)(.*)$/);
		if (!match) {
			return line;
		}

		const [, indent, name, separator, , suffix] = match;
		counts.set(name, counts.get(name) + 1);
		const version = name === 'nodejs' ? nodeVersion : pnpmVersion;
		return `${indent}${name}${separator}${version}${suffix}`;
	})
	.join('\n');

for (const [name, count] of counts) {
	if (count !== 1) {
		throw new Error(`Expected exactly one ${name} entry in ${toolVersionsPath}; found ${count}`);
	}
}

const changed = content !== updatedContent;
if (changed) {
	await writeFile(toolVersionsPath, updatedContent);
}

const outputs = `nodejs=${nodeVersion}\npnpm=${pnpmVersion}\nchanged=${changed}\n`;
if (process.env.GITHUB_OUTPUT) {
	await appendFile(process.env.GITHUB_OUTPUT, outputs);
} else {
	process.stdout.write(outputs);
}
