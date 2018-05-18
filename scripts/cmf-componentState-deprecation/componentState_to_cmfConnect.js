import get from 'lodash/get';

function updateImport(j, root) {
	const cmfimports = root.find(j.ImportDeclaration, {
		source: { value: '@talend/react-cmf' },
	});
	if (!cmfimports.length === 0) {
		return;
	}
	let currentName = 'componentState';
	cmfimports.forEach(i => {
		let foundCState = false;
		let foundCMFConnect = false;
		let length = i.value.specifiers.length;
		i.value.specifiers = i.value.specifiers.filter(spec => {
			if (spec.imported.name === 'componentState') {
				currentName = spec.local.name;
				foundCState = true;
				return false;
			} else if (spec.imported.name === 'cmfConnect') {
				foundCMFConnect = true;
			}
			return true;
		});
		if (foundCState && !foundCMFConnect) {
			// add { cmfConnect }
			i.value.specifiers.push(j.importSpecifier(j.identifier('cmfConnect')));
		}
	});
	return currentName;
}

function renameIntoClass(j, root, name) {
	root.find(j.SpreadElement)
	.filter(property => get(property, 'value.argument.property.name') === 'propTypes')
	.filter(property => get(property, 'value.argument.object.name') === name)
	.forEach(property => {
		property.value.argument.object.name = 'cmfConnect';
	});
}

module.exports = function transform(fileInfo, api, options) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);
	const name = updateImport(j, root);
	if (name) {
		renameIntoClass(j, root, name);
	}
	return root.toSource();
};
