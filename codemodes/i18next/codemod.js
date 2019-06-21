function replaceName(j, nodePath) {
	// eslint-disable-next-line no-param-reassign
	nodePath.value.specifiers = nodePath.value.specifiers.map(specifier => {
		if (specifier.type === 'ImportSpecifier' && specifier.imported.name === 'translate') {
			return j.importSpecifier(j.identifier('withTranslation'));
		}
		return specifier;
	});
}

export default function transformer(file, api) {
	const j = api.jscodeshift;

	return j(file.source)
		.find(j.ImportDeclaration, {
			source: {
				value: 'react-i18next',
			},
		})
		.forEach(nodePath => replaceName(j, nodePath))
		.toSource();
}
