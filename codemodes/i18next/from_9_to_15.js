/* eslint-disable no-param-reassign */
function replaceTranslateImport(file, j) {
	let foundAndReplaced = false;
	const result = j(file.source)
		.find(j.ImportDeclaration, {
			source: {
				value: 'react-i18next',
			},
		})
		.forEach(nodePath => {
			nodePath.value.specifiers = nodePath.value.specifiers.map(specifier => {
				if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'translate') {
					foundAndReplaced = true;
					return j.importSpecifier(j.identifier('withTranslation'));
				}
				return specifier;
			});
		})
		.toSource();

	return foundAndReplaced ? result : null;
}

function replaceTranslateCalls(file, j) {
	return j(file)
		.find(j.CallExpression, { callee: { name: 'translate' } })
		.forEach(nodePath => {
			nodePath.value.callee = j.identifier('withTranslation');
		})
		.toSource({ useTabs: true, quote: 'single', trailingComma: true });
}

export default function transformer(file, api) {
	const j = api.jscodeshift;

	const result = replaceTranslateImport(file, j);
	if (!result) {
		return null;
	}

	return replaceTranslateCalls(result, j);
}
