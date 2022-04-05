const dirname = require('path').dirname;
const fs = require('fs');
const semver = require('semver');
const rules = require('./rules.json');

const PACKAGES = Object.keys(rules);

function getPackageVersion(packageName) {
	let currentPath = require.resolve(packageName);
	let pjson;
	while(!pjson) {
		const pjsonPath = `${currentPath}/package.json`;
		if (fs.existsSync(pjsonPath)) {
			pjson = pjsonPath;
		} else {
			currentPath = dirname(currentPath);
		}
	}
	try {
		return require(pjson).version;
	} catch(error) {
		console.error(`${packageName} NOT FOUND`, error);
	}
}

function find(importDeclarationPath) {
	const path = importDeclarationPath.node.source.value;
	const found = PACKAGES.find(p => path === p || path.startsWith(`${p}/`));
	if (found && rules[found].lib) {
		if (path.replace(found, '').split('/').length > 3) {
			console.error(`ERROR: import too deep: ${path}`);
			return undefined;
		}
	} else if (found && path.replace(found, '').split('/').length > 2) {
		console.error(`ERROR: import too deep in ${path}`);
		return undefined;
	}
	if (found && rules[found]?.version) {
		const version = getPackageVersion(found);
		if (!version) {
			// unittest ?
			return found;
		}
		if (!semver.satisfies(version, rules[found].version)) {
			return undefined;
		}
	}
	return found;
}

function getLastNameInPath(path) {
	const splited = path.split('/');
	if (splited.length === 1) {
		return false;
	}
	return splited.pop();
}

function sortImports(a, b) {
	if (a.type === 'ImportDefaultSpecifier') {
		return -1;
	}
	if (b.type === 'ImportDefaultSpecifier') {
		return 1;
	}
	return 0;
}

module.exports = function transform({ types }) {
	return {
		visitor: {
			Program(path) {
				const importSpecifiers = {};
				let lastImport;
				const addConst = {};
				let realLastImport;

				path.traverse({
					ImportDeclaration: {
						exit(importDeclarationPath) {
							realLastImport = importDeclarationPath;
							const packageName = find(importDeclarationPath);
							const isPackageFrom =
								PACKAGES.includes(importDeclarationPath.node.source.value);
							if (packageName && !importSpecifiers[packageName]) {
								importSpecifiers[packageName] = [];
							}
							if (packageName) {
								importSpecifiers[packageName].push(
									...importDeclarationPath.node.specifiers.map(({ local, imported, type }) => {
										const localName = local.name;
										const lastName = getLastNameInPath(importDeclarationPath.node.source.value);
										if (type === 'ImportDefaultSpecifier' && rules[packageName].named) {
											return types.importDefaultSpecifier(types.identifier(localName));
										}
										if (type === 'ImportNamespaceSpecifier') {
											return types.importNamespaceSpecifier(types.identifier(localName));
										}

										let importedName = localName;
										if (imported) {
											importedName = imported.name;
											if (rules[packageName].named && lastName) {
												let mustBeAdded = false;

												if (!addConst[packageName]) {
													addConst[packageName] = {};
												}

												if (!addConst[packageName][lastName]) {
													mustBeAdded = true;
													addConst[packageName][lastName] = [];
												}

												addConst[packageName][lastName].push(imported.name);

												if (mustBeAdded) {
													return types.importSpecifier(
														types.identifier(`__${lastName}`),
														types.identifier(lastName),
													);
												}

												return false;
											}
										} else if (lastName && lastName !== localName) {
											// fix default import name except if we are at the root of the package
											if (isPackageFrom) {
												return types.importDefaultSpecifier(types.identifier(localName));
											} else {
												importedName = lastName;
											}
										}
										if (isPackageFrom && type === 'ImportDefaultSpecifier') {
											return types.importDefaultSpecifier(types.identifier(localName));
										}
										return types.importSpecifier(
											types.identifier(localName),
											types.identifier(importedName),
										);
									}),
								);
								importDeclarationPath.remove();
							}
							lastImport = importDeclarationPath;
						},
					},
				});
				const keys = Object.keys(importSpecifiers);
				if (keys.length > 0) {
					keys.forEach(packageName => {
						const source = types.stringLiteral(packageName);
						const imp = types.importDeclaration(
							importSpecifiers[packageName].filter(Boolean).sort(sortImports),
							source,
						);

						const extraKeys = Object.keys(addConst[packageName] || {});
						if (extraKeys.length > 0) {
							extraKeys.forEach(extraKey => {
								const properties = addConst[packageName][extraKey].map(n =>
									types.objectProperty(types.identifier(n), types.identifier(n), false, true),
								);
								const pattern = types.objectPattern(properties);
								const declarator = types.variableDeclarator(
									pattern,
									types.identifier(`__${extraKey}`),
								);
								const c = types.variableDeclaration('const', [declarator]);
								realLastImport.insertAfter(c);
							});
						}
						if (lastImport) {
							lastImport.insertAfter(imp);
						}
					});
				}
			},
		},
	};
};
