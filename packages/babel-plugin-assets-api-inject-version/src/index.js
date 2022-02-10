const { sync: readPkgUpSync } = require('read-pkg-up');

function getPKG(pkg) {
	const cwd = require.resolve(pkg);
	return readPkgUpSync({ cwd });
}

function findAssetsImport(importDeclarationPath) {
	const path = importDeclarationPath.node.source.value;
	return path === '@talend/assets-api';
}

module.exports = function transform({ types }) {
	return {
		visitor: {
			Program(path) {
				const getUrlCalls = [];
				let realLastImport;
				const cache = {};

				path.traverse({
					CallExpression: {
						exit(callExpression) {
							if (callExpression.node.callee.property?.name === 'getUrl') {
								console.error('lenght', callExpression.node.arguments.length);
								if (callExpression.node.arguments.length < 3) {
									getUrlCalls.push(callExpression);
								}
							}
						},
					},
					ImportDeclaration: {
						exit(importDeclarationPath) {
							realLastImport = importDeclarationPath;
							cache.found = findAssetsImport(importDeclarationPath);
						},
					},
				});

				if (cache.found) {
					console.error('found !!!', getUrlCalls.length);
					if (getUrlCalls.length > 0) {
						getUrlCalls.forEach(c => {
							let [p, pkg, ver] = c.node.arguments.map(a => a.value);
							const filename = path.container.loc.filename;
							let pkgDef;
							console.log('@@@@ filename', path.container.loc);
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
