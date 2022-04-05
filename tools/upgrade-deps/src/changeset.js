/* eslint-disable no-param-reassign */
const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const semver = require('semver');
const fs = require('fs');
const uuid = require('uuid');

const reDiff = new RegExp(/^[+,-] {4}"/);

function isSetup() {
	return fs.existsSync(path.join(process.cwd(), '.changeset'));
}

function getModifiedPackage() {
	let output;
	try {
		output = execSync('git status -s --untracked-files=no');
		// we try to keep only lines with
		// M packages/cmf/package.json
		return (
			output
				.toString()
				.split(os.EOL)
				.filter(l => l.endsWith('package.json'))
				// keep only the path
				.map(l => l.split(' ').pop())
				// filter
				.map(p => {
					const def = require(path.join(process.cwd(), p));
					def.talend = { path: p };
					return def;
				})
				.filter(p => p.name && !p.private && !p.workspaces)
				.map(def => {
					const changes = execSync(`git diff ${def.talend.path}`)
						.toString()
						.split(os.EOL)
						.filter(l => reDiff.test(l));
					def.talend.diff = {};
					changes.forEach(change => {
						const splited = change.split('"');
						const pkgName = splited[1];
						const isDep = def.dependencies?.[pkgName];
						const isDev = def.devDependencies?.[pkgName];
						const isPeer = def.peerDependencies?.[pkgName];
						if (isDev && isPeer) {
							const minVersion = semver.minVersion(def.devDependencies[pkgName]).version;
							if (!semver.satisfies(minVersion, def.peerDependencies[pkgName])) {
								throw new Error(
									`${def.talend.path} peerDependencies.${pkgName} change in devDependencies is not compatible with peerDependencies`,
								);
							}
						}
						if (isDep) {
							if (!def.talend.diff[pkgName]) {
								def.talend.diff[pkgName] = {};
							}
							if (splited[0] === '-    ') {
								def.talend.diff[pkgName].old = splited[3];
							} else {
								def.talend.diff[pkgName].newV = splited[3];
							}
							def.talend.changeset = 'patch';
						}
					});
					return def;
				})
				.filter(p => !!p.talend.changeset)
		);
	} catch (e) {
		console.error(e);
	}
	return [];
}

function add(opts) {
	const pkgs = getModifiedPackage();
	pkgs.forEach(pkg => {
		const diffContent = Object.entries(pkg.talend.diff)
			.map(
				([name, diff]) => `-    "${name}": "${diff.old}"
+    "${name}": "${diff.newV}"`,
			)
			.join(os.EOL);

		const content = `---
'${pkg.name}': ${pkg.talend.changeset}
---

${opts.message || 'chore(dependencies): auto update for maintenance purpose'}

\`\`\`diff
${diffContent}
\`\`\`
`;
		fs.writeFileSync(
			path.join(process.cwd(), '.changeset', `ci-dependencies-${uuid.v4().split('-')[0]}.md`),
			content,
		);
	});
}

module.exports = {
	add,
	isSetup,
};
