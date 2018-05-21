import get from 'lodash/get';

/**
 * import { api } from '@talend/react-cmf';
 * import { api as WHAT } from '@talend/react-cmf';
 * ->
 * import cmf from '@talend/react-cmf';
 *
 * api. -> cmf.
 * WHAT. -> cmf.
 */

function updateImport(j, root) {
	const cmfimports = root.find(j.ImportDeclaration, {
		source: { value: '@talend/react-cmf' },
	});
	if (!cmfimports.length === 0) {
		return undefined;
	}
	let currentName = 'api';
	let newName = 'cmf';
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
			// add cmf import
			// TODO: default
			i.value.specifiers.push(j.importDefaultSpecifier(j.identifier('cmf')));
		}
	});
	return { currentName, newName };
}

function renameIntoCode(j, root, info) {
	console.log('###', info);
	root.find(j.Identifier, { name: info.currentName}).forEach(i => {
		console.log('### ', i.value.name);
		i.value.name = info.newName;
	});
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
