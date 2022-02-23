const { sync: readPkgUpSync } = require('read-pkg-up');

function getPKG(pkg) {
	const cwd = require.resolve(pkg);
	return readPkgUpSync({ cwd });
}

function findAssetsImport(importDeclarationPath) {
	const path = importDeclarationPath.node.source.value;
	return path === '@talend/assets-api';
}

const FUNCTIONS = ['getUrl', 'getJSON'];

module.exports = function transform({ types }) {
	return {
		visitor: {
			Program(path) {
				const getUrlCalls = [];
				const cache = {};

				path.traverse({
					CallExpression: {
						exit(callExpression) {
							if (FUNCTIONS.includes(callExpression.node.callee.property?.name)) {
								if (callExpression.node.arguments.length < 3) {
									getUrlCalls.push(callExpression);
								}
							}
						},
					},
					ImportDeclaration: {
						exit(importDeclarationPath) {
							cache.found = findAssetsImport(importDeclarationPath);
						},
					},
				});

				if (cache.found) {
					if (getUrlCalls.length > 0) {
						getUrlCalls.forEach(c => {
							let [_, pkg, ver] = c.node.arguments.map(a => a.value);
							const filename = path.container.loc.filename;
							let pkgDef;
							if (!pkg && filename) {
								// TODO: find current package.json
								pkgDef = readPkgUpSync(filename);
								pkg = pkgDef.name;
								c.node.arguments.push(types.stringLiteral(pkg));
							}
							const version = types.stringLiteral(
								pkgDef?.version || getPKG(pkg).packageJson.version,
							);
							if (!ver) {
								c.node.arguments.push(version);
							} else {
								c.node.arguments[2] = version;
							}
							if (filename) {
							}
						});
					}
				}
			},
		},
	};
};
