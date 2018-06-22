/* eslint-disable no-param-reassign */

/**
 * import { api } from '@talend/react-cmf';
 * ->
 * import api from '@talend/react-cmf';
 *
 * import { api as WHAT } from '@talend/react-cmf';
 * ->
 * import WHAT from '@talend/react-cmf';
 */

function updateImport(j, root) {
	const cmfimports = root.find(j.ImportDeclaration, {
		source: { value: '@talend/react-cmf' },
	});
	if (!cmfimports.length === 0) {
		return undefined;
	}
	let currentName = 'api';
	let newName = 'api';
	cmfimports.forEach(i => {
		let foundAPI = false;
		let foundCMF = false;
		i.value.specifiers = i.value.specifiers.filter(spec => {
			if (!spec.imported && spec.type === 'ImportDefaultSpecifier') {
				foundCMF = true;
				newName = spec.local.name;
			} else if (spec.type === 'ImportSpecifier' && spec.imported.name === 'api') {
				currentName = spec.local.name;
				foundAPI = true;
				return false;
			}
			return true;
		});
		if (foundAPI && !foundCMF) {
			i.value.specifiers.push(j.importDefaultSpecifier(j.identifier(newName)));
		}
	});
	return { currentName, newName };
}

function renameIntoCode(j, root, info) {
	if (info.currentName !== info.newName) {
		// only if import cmf, { api } from '@talend/react-cmf';
		root.find(j.Identifier, { name: info.currentName }).forEach(i => {
			i.value.name = info.newName;
		});
	}
}

module.exports = function transform(fileInfo, api) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);
	const info = updateImport(j, root);
	if (info) {
		renameIntoCode(j, root, info);
	}
	return root.toSource();
};
