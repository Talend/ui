/**
 * Codemod to replace imports from old npm packages to new @talend scoped ones
 */

function replaceTalendUiLibs(value) {
	return value &&
		value.replace('talend-icons', '@talend/icons')
			.replace('talend-log', '@talend/log')
			.replace('react-cmf', '@talend/react-cmf')
			.replace('react-talend-components', '@talend/react-components')
			.replace('react-talend-containers', '@talend/react-containers')
			.replace('react-talend-forms', '@talend/react-forms');
}

export default function transformer(file, api) {
	const j = api.jscodeshift;

	return j(file.source)
		.find(j.ImportDeclaration)
		.find(j.Literal)
		.forEach((path) => {
			const value = path && path.value && path.value.value;
			const replacedValue = replaceTalendUiLibs(value);
			if(value !== replacedValue) {
				j(path).replaceWith(j.literal(replacedValue));
			}
		})
		.toSource({ quote: 'single' });
}
