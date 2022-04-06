/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
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

function getAssetsImport(importDeclarationPath) {
	const path = importDeclarationPath.node.source.value;
	if (path !== '@talend/assets-api') {
		return undefined;
	}
	const spec = importDeclarationPath.node.specifiers;
	if (spec[0].type !== 'ImportDefaultSpecifier') {
		return undefined;
	}
	return spec[0].local.name;
}

const INJECT_VERSIONS_LAST = ['getURL', 'getJSON'];
const INJECT_PATH_LAST = ['getUMD'];

function getResolver(resolverOrString) {
	let resolverStr = '@talend/module-to-cdn';
	let resolver;
	if (resolverOrString) {
		if (typeof resolverOrString === 'string') {
			resolverStr = resolverOrString;
		} else {
			resolver = resolverOrString;
		}
	}
	if (!resolver) {
		resolver = require(resolverStr);
	}
	return resolver;
}

module.exports = function transform({ types }) {
	return {
		visitor: {
			Program(path, state) {
				const resolver = getResolver(state.opts.resolver);
				const getURLCalls = [];
				const getUMDCalls = [];
				const cache = {};

				path.traverse({
					CallExpression: {
						exit(callExpression) {
							if (!cache.assetDefaultImport) {
								return;
							}
							if (
								INJECT_VERSIONS_LAST.includes(callExpression.node.callee.property?.name) &&
								callExpression.node.callee.object.name === cache.assetDefaultImport
							) {
								if (callExpression.node.arguments.length < 3) {
									getURLCalls.push(callExpression);
								}
							}
							if (
								INJECT_PATH_LAST.includes(callExpression.node.callee.property?.name) &&
								callExpression.node.callee.object.name === cache.assetDefaultImport
							) {
								if (callExpression.node.arguments.length < 3) {
									getUMDCalls.push(callExpression);
								}
							}
						},
					},
					ImportDeclaration: {
						exit(importDeclarationPath) {
							cache.assetDefaultImport =
								cache.assetDefaultImport || getAssetsImport(importDeclarationPath);
						},
					},
				});

				if (cache.assetDefaultImport) {
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
							}
						});
					}
					if (getUMDCalls.length > 0) {
						getUMDCalls.forEach(c => {
							const values = c.node.arguments.map(a => a.value);
							const pkg = values[0]; // required
							const ver = values[1];
							const pkgDef = getPKG(pkg);
							const version = types.stringLiteral(pkgDef.packageJson.version);
							if (!ver) {
								c.node.arguments.push(version);
							}
							const varName = values[2];
							const info = resolver(pkg, pkgDef.packageJson.version, { env: 'production' });
							if (info) {
								if (!varName) {
									c.node.arguments.push(types.stringLiteral(info.var));
								}
								const umdPath = values[3];
								if (!umdPath) {
									c.node.arguments.push(types.stringLiteral(info.path));
								}
							}
						});
					}
				}
			},
		},
	};
};
