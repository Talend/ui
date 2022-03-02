/* eslint-disable no-param-reassign */
const { sync: readPkgUpSync } = require('read-pkg-up');

function getPKG(pkg) {
	if (!pkg) {
		return readPkgUpSync();
	}
	try {
		const cwd = require.resolve(pkg);
		return readPkgUpSync({ cwd });
	} catch {
		// it fails when we are in the middle to build our own package.
		return readPkgUpSync();
	}
}

function findAssetsImport(importDeclarationPath) {
	const path = importDeclarationPath.node.source.value;
	return path === '@talend/assets-api';
}

const INJECT_VERSIONS_LAST = ['getURL', 'getJSON'];
const INJECT_PATH_LAST = ['getUMD'];

module.exports = function transform({ types }) {
	return {
		visitor: {
			Program(path) {
				const getURLCalls = [];
				const getUMDCalls = [];
				const cache = {};

				path.traverse({
					CallExpression: {
						exit(callExpression) {
							if (INJECT_VERSIONS_LAST.includes(callExpression.node.callee.property?.name)) {
								if (callExpression.node.arguments.length < 3) {
									getURLCalls.push(callExpression);
								}
							}
							if (INJECT_PATH_LAST.includes(callExpression.node.callee.property?.name)) {
								if (callExpression.node.arguments.length < 3) {
									getUMDCalls.push(callExpression);
								}
							}
						},
					},
					ImportDeclaration: {
						exit(importDeclarationPath) {
							cache.found = findAssetsImport(importDeclarationPath) || cache.found;
						},
					},
				});

				if (cache.found) {
					if (getURLCalls.length > 0) {
						getURLCalls.forEach(c => {
							const values = c.node.arguments.map(a => a.value);
							let pkg = values[1];
							const ver = values[2];
							const pkgDef = getPKG(pkg);
							if (!pkg) {
								// TODO: find current package.json
								pkg = pkgDef.packageJson.name;
								c.node.arguments.push(types.stringLiteral(pkg));
							}
							const version = types.stringLiteral(pkgDef.packageJson.version);
							if (!ver) {
								c.node.arguments.push(version);
							} else {
								c.node.arguments[2] = version;
							}
						});
					}
				}
			},
		},
	};
};
