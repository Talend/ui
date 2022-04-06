const fs = require('fs');
const path = require('path');
const yarnlock = require('@yarnpkg/lockfile');

const CONTAINER = {};

function addLib(lib, repository, path) {
	let info = CONTAINER[lib.name];
	if (!info) {
		info = { projects: [{ path, repository, versions: [lib.version] }] };
		CONTAINER[lib.name] = info;
	} else {
		let projectInfo = info.projects.find(p => p.path === path && p.repository === repository);
		if (!projectInfo) {
			projectInfo = { path, repository, versions: [lib.version] };
			info.projects.push(projectInfo);
		} else if (!projectInfo.versions.find(v => v === lib.version)) {
			projectInfo.versions.push(lib.version);
		}
	}
}

function getPackageNameFromSlug(slug) {
	// slug === @scope/subname@x.y.z-alpha...
	const splitted = slug.split('@');
	if (slug.startsWith('@')) {
		return {
			name: `@${splitted[1]}`,
		};
	}
	return {
		name: splitted[0],
	};
}

function toFlat(data) {
	return Object.keys(data).reduce((acc, key) => {
		data[key].projects.forEach(project => {
			const multi = project.versions.length;
			project.versions.forEach(version => {
				acc.push({
					id: key,
					repository: project.repository,
					path: project.path,
					version,
					multi,
				});
			});
		});
		return acc;
	}, []);
}

function merge(program) {
	const config = require(path.join(process.cwd(), program.config));
	const output = program.output || 'data';

	Object.keys(config.repository).forEach(owner => {
		Object.keys(config.repository[owner]).forEach(repo => {
			config.repository[owner][repo].forEach(fpath => {
				const savePath = `${output}/${owner}/${repo}${fpath}`;
				if (fpath.endsWith('yarn.lock')) {
					let lockContent;
					try {
						lockContent = fs.readFileSync(savePath, 'utf-8');
					} catch (e) {
						console.error(e);
						return;
					}
					const lock = yarnlock.parse(lockContent);
					Object.keys(lock.object).forEach(key => {
						const lib = getPackageNameFromSlug(key);
						lib.version = lock.object[key].version;
						addLib(lib, `${owner}/${repo}`, fpath);
					});
				} else if (fpath.endsWith('package-lock.json')) {
					// may be fix here when a CLI
					let lockContent;
					try {
						lockContent = JSON.parse(fs.readFileSync(savePath, 'utf-8'));
					} catch (e) {
						console.error(e);
						return;
					}
					Object.entries(lockContent.dependencies).forEach(entry => {
						const lib = {
							name: entry[0],
							version: entry[1].version,
						};
						addLib(lib, `${owner}/${repo}`, fpath);
					});
				}
			});
		});
	});
	console.log(`save the output to ${output}/output.json and ${output}/flatout.json`);
	fs.writeFileSync(`${output}/output.json`, JSON.stringify(CONTAINER));
	fs.writeFileSync(`${output}/flatout.json`, JSON.stringify(toFlat(CONTAINER)));
}

module.exports = merge;
