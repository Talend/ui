/**
 * Replace old talend module names within a string
 */
function replaceTalendUiLibs(value) {
	if (typeof value !== 'string') {
		return value;
	}

	return value &&
		value.replace('bootstrap-talend-theme', '@talend/bootstrap-theme')
			.replace('talend-icons', '@talend/icons')
			.replace('talend-log', '@talend/log')
			.replace('react-cmf', '@talend/react-cmf')
			.replace('react-talend-components', '@talend/react-components')
			.replace('react-talend-containers', '@talend/react-containers')
			.replace('react-talend-forms', '@talend/react-forms')
			.replace('react-talend-', '@talend/');
}

/**
 * Replace AST string path with a new path from replaced module names string.
 * @param j jscodeshift method
 * @param path The path object
 */
function replaceString(j, path) {
	const value = path && path.value && path.value.value;
	const replacedValue = replaceTalendUiLibs(value);
	if (value !== replacedValue) {
		j(path).replaceWith(j.literal(replacedValue));
	}
}

/**
 * Replace AST regex path with a new path from replaced module names regex.
 * @param j
 * @param path
 */
function replaceRegex(j, path) {
	const pattern = path && path.value && path.value.regex.pattern;
	const replacedPattern = replaceTalendUiLibs(pattern);
	if (pattern !== replacedPattern) {
		j(path).replaceWith(j.literal(new RegExp(replacedPattern)));
	}
}

/**
 * Replace AST Literal path (string or regex) with a new Literal path from replaced modules names.
 * @param j
 * @param path
 */
function replaceLiteral(j, path) {
	const isRegex = path && path.value && path.value.regex;
	if (isRegex) {
		replaceRegex(j, path);
	} else {
		replaceString(j, path);
	}
}

/**
 * Replace AST template path with a new template path from replaced module names.
 * @param j
 * @param path
 */
function replaceTemplate(j, path) {
	const { raw, cooked } = path.value.value;
	const tail = path.value.tail;
	const adaptedCooked = replaceTalendUiLibs(cooked);
	const adaptedRaw = replaceTalendUiLibs(raw);
	if (raw !== adaptedRaw || cooked !== adaptedCooked) {
		j(path).replaceWith(j.templateElement(
			{ cooked: adaptedCooked, raw: adaptedRaw },
			tail
		));
	}
}

export default function transformer(file, api) {
	const j = api.jscodeshift;

	// replace all strings
	const result = j(file.source)
		.find(j.Literal)
		.forEach(path => replaceLiteral(j, path))
		.toSource({ quote: 'single' });

	// replace all template strings
	return j(result)
		.find(j.TemplateElement)
		.forEach(path => replaceTemplate(j, path))
		.toSource({ quote: 'single' });
}
