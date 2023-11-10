const fs = require('fs');
const path = require('path');
const readPkgUp = require('read-pkg-up');
const semver = require('semver');

function findPackage(info) {
	let name = info.name;
	let scope;
	if (name.startsWith('@')) {
		[scope, name] = info.name.split('/');
	}
	// eslint-disable-next-line no-use-before-define
	return findPackages(scope, name).find(cwd => {
		const {
			packageJson: { version },
		} = readPkgUp.sync({ cwd });
		// check we are at least upper or equal using caret range syntax
		let range = `^${info.version}`;
		if (info.peerDependency) {
			range += `|| ${info.peerDependency}`;
		}
		return semver.satisfies(version, range);
	});
}

function findPackagesFromScopeFolder(scope, name, scopeFolderPath) {
	const isWantedScope = scopeFolderPath.endsWith(`${path.sep}${scope}`);
	return fs
		.readdirSync(scopeFolderPath, { withFileTypes: true })
		.filter(f => f.isDirectory() || f.isSymbolicLink())
		.reduce((accu, subFolder) => {
			const subFolderPath = path.join(scopeFolderPath, subFolder.name);
			if (isWantedScope && subFolder.name === name) {
				// the scope and package name are the ones we look for
				// just add the path to the found list
				return accu.concat(subFolderPath);
			}

			// the scope or package name is not the one we look for
			// if there is a nested node modules folder, we dive into it for the search
			const nestedNodeModulesPath = path.join(subFolderPath, 'node_modules');
			if (fs.existsSync(nestedNodeModulesPath)) {
				// eslint-disable-next-line no-use-before-define
				return accu.concat(findPackagesFromNonScopeFolder(scope, name, nestedNodeModulesPath, []));
			}
			return accu;
		}, []);
}

function findPackagesFromNonScopeFolder(scope, name, nonScopeFolderPath) {
	return fs
		.readdirSync(nonScopeFolderPath, { withFileTypes: true })
		.filter(f => f.isDirectory() || f.isSymbolicLink())
		.reduce((accu, subFolder) => {
			if (subFolder.name === '.bin') {
				return accu;
			}
			// TODO NOT COMPATIBLE WITH PNPM WHEN deps is @talend/scripts-...
			if (
				subFolder.name.startsWith('@') &&
				!subFolder?.path?.endsWith('tools/scripts-core/node_modules') &&
				!subFolder?.path?.endsWith('@talend/scripts-yarn-workspace/node_modules') &&
				!subFolder?.path?.endsWith('tools/eslint-config/node_modules')
			) {
				// for scope folders, we need a special treatment to avoid getting scoped packages when we don't want a scoped one.
				// ex: search for `classnames`, we don't want to find `@types/classnames` in the result
				return accu.concat(
					findPackagesFromScopeFolder(scope, name, path.join(nonScopeFolderPath, subFolder.name)),
				);
			} else if (!scope && subFolder.name === name) {
				// we want a NON scoped package, we are in a non scoped folder, and the names match
				return accu.concat(path.join(nonScopeFolderPath, subFolder.name));
			}
			const nestedNodeModulesPath = path.join(nonScopeFolderPath, subFolder.name, 'node_modules');
			if (fs.existsSync(nestedNodeModulesPath)) {
				return accu.concat(findPackagesFromNonScopeFolder(scope, name, nestedNodeModulesPath));
			}
			return accu;
		}, []);
}

function findPackages(scope, name, buff = []) {
	// https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_require_resolve_paths_request
	const roots = require.resolve.paths(name).filter(p => fs.existsSync(p));
	if (roots === null) {
		return buff;
	}
	const result = buff.concat(
		...roots.map(root => findPackagesFromNonScopeFolder(scope, name, root)),
	);
	// Return a new Set to remove duplicate values: case possible with PNPM in GHA, due to pnpm/action-setup
	// With the action, a folder setup-pnpm is created to manage the store and the script see it and try to scan it, and this generate duplicate entry
	// TODO: Manage pnpm installation manually (not repoduce the issue in this case but need to find solution to install global dep like surge)
	// Before we returned directly result of buff.concat...
	return [...new Set(result)];
}

module.exports = {
	findPackage,
	findPackages,
};
