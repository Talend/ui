/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import path from 'path';
import { open, readdir, writeFile } from 'fs/promises';

const DEFAULT_WORKSPACE = process.argv.includes('--full-workspace')
	? ['tools/*', 'packages/*', 'fork/*']
	: [];

async function getContent(p) {
	let filehandle = null;
	let content;
	try {
		filehandle = await open(p, 'r+');
		content = await filehandle.readFile({ encoding: 'utf-8' });
	} finally {
		await filehandle?.close();
	}
	return content;
}

async function getJSON(p) {
	const content = await getContent(p);
	return content ? JSON.parse(content) : undefined;
}

async function getChangedPackages() {
	const NOT_CHANGESET = ['README.md', 'config.json'];
	const files = await readdir('./.changeset');
	const changesets = files.filter(i => !NOT_CHANGESET.includes(i));
	let pkgs = [];
	for (const changeset of changesets) {
		const content = await getContent(path.join('./.changeset', changeset));
		pkgs = pkgs.concat(
			content
				.split('---')[1]
				.split('\n')
				.map(l => l.replace(/'/g, '').split(':')[0])
				.filter(Boolean),
		);
	}
	return pkgs;
}

const info = await getJSON('./info.json');
function addDependent(pkg, buff) {
	const dependent = [];
	Object.keys(info)
		.filter(i => info[i].workspaceDependencies.includes(pkg) && !buff.includes(i))
		.forEach(i => buff.push(i) && dependent.push(i));

	if (dependent.length > 0) {
		dependent.map(d => addDependent(d, buff));
	}
}

const packageJSON = await getJSON('./package.json');
const modifiedPkgs = await getChangedPackages();
modifiedPkgs.forEach(pkg => addDependent(pkg, modifiedPkgs));

const workspaces = modifiedPkgs.map(p => info[p].location);
console.log(workspaces);
// TODO: if different modified and re trigger the yarn install
packageJSON.workspaces = workspaces.concat(DEFAULT_WORKSPACE);
await writeFile('./package.json', JSON.stringify(packageJSON, null, 2));
