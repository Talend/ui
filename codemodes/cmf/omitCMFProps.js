/**
 * This function return names that let you access to cmfConnect.
 * The source file can be of the following shapes
@example
import { cmfConnect } from '@talend/react-cmf';
import { cmfConnect as connect } from '@talend/react-cmf';
import cmf from '@talend/react-cmf'; cmf.connect;
 */
function getCMFConnectImport(j, root) {
	const cmfimports = root.find(j.ImportDeclaration, {
		source: { value: '@talend/react-cmf' },
	});
	if (!cmfimports.length === 0) {
		return undefined;
	}
	let defaultName;
	let localName;
	cmfimports.forEach(imp => {
		imp.value.specifiers.forEach(spec => {
			if (spec.type === 'ImportDefaultSpecifier') {
				defaultName = spec.local.name;
			} else if (spec.type === 'ImportSpecifier' && spec.imported.name === 'cmfConnect') {
				localName = spec.local.name;
			}
		});
	});
	return { localName, defaultName };
}

/**
 * this function add the property to all cmfConnect calls
 */
function addOmitCMFProps(j, root) {
	const name = getCMFConnectImport(j, root);
	const omitProperties = [
		j.objectProperty(j.identifier('omitCMFProps'), j.booleanLiteral(true)),
		j.objectProperty(j.identifier('withComponentRegistry'), j.booleanLiteral(true)),
		j.objectProperty(j.identifier('withDispatch'), j.booleanLiteral(true)),
		j.objectProperty(j.identifier('withDispatchActionCreator'), j.booleanLiteral(true)),
		j.objectProperty(j.identifier('withComponentId'), j.booleanLiteral(true)),
	];
	let calls = [];
	if (name.localName) {
		calls = root.find(j.CallExpression, {
			callee: { name: name.localName },
		});
	} else if (name.defaultName) {
		calls = root.find(j.CallExpression, {
			callee: {
				type: 'MemberExpression',
				object: { name: name.defaultName },
				property: { name: 'connect' },
			},
		});
	}
	if (calls.length > 0) {
		calls.forEach(call => {
			const hasOmit = call.value.arguments[0].properties.find(
				prop => prop.key.name === 'omitCMFProps',
			);
			if (hasOmit) {
				return;
			}
			call.value.arguments[0].properties.push(...omitProperties);
		});
	}
}

/**
 * This codeshift find all cmfConnect calls to add all the new with properties to it.
 * You should start by apply it, and then remove all `with` options the component doesn't need
 * @example
import { cmfConnect } from '@talend/react-cmf';
cmfConnect({})(MyComponent);
 * @example
import { cmfConnect as connect } from '@talend/react-cmf';
connect({})(MyComponent);
 * @example
import cmf from '@talend/react-cmf';
cmf.connect({})(MyComponent);
 */
module.exports = function transform(fileInfo, api) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);
	addOmitCMFProps(j, root);
	return root.toSource({ useTabs: true, quote: 'single', trailingComma: true });
};
