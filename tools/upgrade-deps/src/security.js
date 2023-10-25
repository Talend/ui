/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import path from 'path';
import semver from 'semver';
import yarn from './yarn.js';
import npm from './npm.js';
import https from './https.js';

function checkVulnerability(vulnerableVersions, version) {
	return vulnerableVersions.find(({ range }) =>
		Array.isArray(range)
			? semver.gte(version, range[0]) && semver.lte(version, range[1])
			: version === range,
	);
}

export async function upgradeSecurityVersion(packageMetadata) {
	// yarn.lock management
	const yarnLock = yarn.createYarnLockManager(path.join(process.cwd(), 'yarn.lock'));

	// package.json management
	const pkgJson = npm.createPackageJsonManager(path.join(process.cwd(), 'package.json'));

	// Filter packages from yarn.lock, that has the vulnerability
	const packageMetadatas = Object.entries(yarnLock.content)
		.filter(([key]) => key.startsWith(`${packageMetadata.name}@`))
		.map(([key, metadata]) => ({
			key,
			metadata,
			vulnerability: checkVulnerability(packageMetadata.vulnerableVersions, metadata.version),
		}))
		.filter(({ vulnerability }) => vulnerability)
		.map(dep => ({
			...dep,
			hierarchies: yarnLock.why(dep.key),
		}));

	const reports = {};
	for (const nextPackage of packageMetadatas) {
		const { key, metadata, hierarchies, vulnerability } = nextPackage;
		const report = {
			installed: metadata.version,
			fixVersion: vulnerability.fixVersion,
			details: [],
		};

		const { name, version: requestedVersion } = yarn.parseKey(key);

		const fixVersionCompatible = semver.satisfies(vulnerability.fixVersion, requestedVersion);

		// Easy case: requested version is compatible with vulnerability-fix-version
		if (fixVersionCompatible) {
			if (
				// direct dep: upgrade in package.json
				pkgJson.content.dependencies[name] === requestedVersion ||
				pkgJson.content.devDependencies[name] === requestedVersion
			) {
				const details = pkgJson.change(name, vulnerability.fixVersion);
				report.details.push(details);
				report.depType = 'Direct';
				report.fixed = '✅';
			} else {
				// transitive dep: remove entry in yarn.lock
				const details = yarnLock.remove(key);
				report.details.push(details);
				report.depType = 'Transitive';
				report.fixed = '✅';
			}
		} else {
			// Hard case: upgrade transitive deps top to down, check at the end that the resulting version is compatible with fix
			const unresolvedHierarchies = new Set();
			const resolvedHierarchies = new Set();
			for (const hierarchy of hierarchies) {
				const breadcrumb = [];
				for (const step of hierarchy) {
					const parent = breadcrumb.length > 0 && breadcrumb[breadcrumb.length - 1];
					let stepRequestedVersion = step.requestedVersion;

					// parent has been removed
					if (parent && parent.isDeleted) {
						stepRequestedVersion = undefined;
					} else if (parent && parent.hasChanged) {
						const unpkgPackageJsonUrl = `https://unpkg.com/${parent.name}@${parent.latestMatchingVersion}/package.json`;
						try {
							const fetchResult = await https.get(unpkgPackageJsonUrl);
							const packageJson = JSON.parse(fetchResult.data);
							console.log('### parsing ok', packageJson);
							stepRequestedVersion = packageJson.dependencies[step.name];
						} catch (e) {
							throw new Error(
								`Unpkg: An error occurred while requesting ${unpkgPackageJsonUrl}. Details: \n${e.message}`,
							);
						}
					}

					const newStep = {
						originalKey: step.key, // original requested key
						name: step.name, // package name
						originalVersion: step.version, // original fixed version from yarn.lock
						requestedVersion: stepRequestedVersion, // new semver version from parent or same semver version if not changed by parent
						isDeleted: !stepRequestedVersion, // new version of parent doesn't depend on this dep anymore
					};
					if (stepRequestedVersion) {
						try {
							const latestMatchingVersion = await npm.getUpdate(step.name, stepRequestedVersion);
							newStep.latestMatchingVersion = latestMatchingVersion; // latest version that matches the semver stepRequestedVersion
							newStep.hasChanged = latestMatchingVersion !== step.version; // latest semver version doesn't match the fixed version form yarn.lock
						} catch (e) {
							throw new Error(
								`NPM: An error occurred while getting last version matching ${step.name}@${stepRequestedVersion}. Details: \n${e.message}`,
							);
						}
					}
					breadcrumb.push(newStep);
				}
				const targetPackage = breadcrumb[breadcrumb.length - 1];
				const fixed =
					targetPackage.isDeleted ||
					(targetPackage.hasChanged &&
						!checkVulnerability(
							packageMetadata.vulnerableVersions,
							targetPackage.latestMatchingVersion,
						));

				if (fixed) {
					breadcrumb.forEach((step, index) => {
						let details;
						if (index === 0 && step.hasChanged) {
							details = pkgJson.change(step.name, step.latestMatchingVersion);
						} else if (step.hasChanged) {
							details = yarnLock.remove(step.originalKey);
						}
						if (details) {
							report.details.push(details);
						}
					});
					resolvedHierarchies.add(hierarchy.map(step => step.key).join(' > '));
				} else {
					unresolvedHierarchies.add(hierarchy.map(step => step.key).join(' > '));
				}
			}

			report.depType = 'Transitive';
			report.fixed = unresolvedHierarchies.size ? '❌' : '✅';
			report.resolved = Array.from(resolvedHierarchies);
			report.unresolved = Array.from(unresolvedHierarchies);
		}

		reports[key] = report;
	}

	yarnLock.write();
	pkgJson.write();

	return { changed: pkgJson.hasChanged || yarnLock.hasChanged, reports };
}
