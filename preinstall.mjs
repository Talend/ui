/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import path from 'path';
import { open, readdir, writeFile } from 'fs/promises';
const postcommand = 'node workspace-run.js build:lib';

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
const packageJSON = await getJSON('./package.json');
const modifiedPkgs = await getChangedPackages();
const workspaces = modifiedPkgs.map(p => info[p].location);
// TODO: if different modified and re trigger the yarn install
packageJSON.workspaces = workspaces;
await writeFile('./package.json', JSON.stringify(packageJSON, null, 2));
