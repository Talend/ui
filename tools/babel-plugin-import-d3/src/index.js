const PACKAGES = [
	'd3-array',
	'd3-axis',
	'd3-brush',
	'd3-chord',
	'd3-color',
	'd3-contour',
	'd3-delaunay',
	'd3-dispatch',
	'd3-drag',
	'd3-dsv',
	'd3-ease',
	'd3-fetch',
	'd3-force',
	'd3-format',
	'd3-geo',
	'd3-hierarchy',
	'd3-interpolate',
	'd3-path',
	'd3-polygon',
	'd3-quadtree',
	'd3-random',
	'd3-scale',
	'd3-scale-chromatic',
	'd3-selection',
	'd3-shape',
	'd3-time',
	'd3-time-format',
	'd3-timer',
	'd3-transition',
	'd3-zoom',
];

function findD3RelatedPackageName(importDeclarationPath) {
	const path = importDeclarationPath.node.source.value;
	const found = PACKAGES.find(p => path === p);
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
				const d3Packages = [];
				const requireCalls = [];
				let lastImport;
				let realLastImport;

				path.traverse({
					CallExpression: {
						exit(callExpression) {
							if (callExpression.node.callee.name === 'require') {
								if (PACKAGES.indexOf(callExpression.node.arguments[0].value) !== -1) {
									const mod = callExpression.node.arguments[0].value.replace('d3-', '');
									callExpression.node.arguments[0] = types.stringLiteral('d3');
									// we must wrap callexpression into memberexpression
									requireCalls.push({
										callExpression,
										replace: types.memberExpression(
											callExpression.node,
											types.identifier(mod),
										)
									});
									callExpression.remove();
								}
							}
						}
					},
					ImportDeclaration: {
						exit(importDeclarationPath) {
							realLastImport = importDeclarationPath;
							const packageName = findD3RelatedPackageName(importDeclarationPath);
							if (packageName) {
								d3Packages.push(
									...importDeclarationPath.node.specifiers.map(({ local, imported, type }) => {
										const localName = local.name;
										let importedName = localName;
										if (imported) {
											importedName = imported.name;
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

				requireCalls.forEach(info => {
					info.callExpression.insertAfter(info.replace);
				});
				const packageName = 'd3';
				if (d3Packages.length > 0) {
					const source = types.stringLiteral('d3');
					const imp = types.importDeclaration(
						d3Packages.filter(Boolean).sort(sortImports),
						source,
					);
					if (lastImport) {
						lastImport.insertAfter(imp);
					}
				}
			},
		},
	};
};
