const fs = require('fs');
const path = require('path');

/*
This function will search all i18n call expressions and replaces the default values with the provided translation file
Finds all usage of: i18n.t(), props.t(), rest.t(), ownprops.t(), config.t(), t()
*/
function updateDefaultValue(p, en) {
	const key = p.value.arguments.find(arg => arg.type === 'Literal').value;
	if (!en[key]) {
		return;
	}
	// TypeError: en[key].replaceAll is not a function - use replace() with /g
	const localeValue = en[key].replace(/\"/g, "'");
	let defaultValueEle;
	// covers the usage of t() with string literal (default value) as second argument
	if (p.value.arguments[1].type === 'Literal') {
		defaultValueEle = p.value.arguments[1];
	} else {
		defaultValueEle = p.value.arguments
			.find(arg => arg.type === 'ObjectExpression')
			.properties.find(p => p.key.name === 'defaultValue').value;
	}
	if (defaultValueEle.value !== localeValue) {
		// eslint-disable-next-line no-console
		console.log(`${key}: ${defaultValueEle.value} -> ${localeValue}`);
	}
	defaultValueEle.value = localeValue;
}

function searchAndUpdateI18nValues(j, root, en) {
	const i18CallExpressions = ['i18n', 'props', 'ownprops', 'rest', 'config'];
	i18CallExpressions.forEach(expr => {
		root
			.find(j.CallExpression, {
				callee: {
					type: 'MemberExpression',
					object: { type: 'Identifier', name: expr },
					property: { type: 'Identifier', name: 't' },
				},
			})
			.forEach(p => updateDefaultValue(p, en));
	});

	root
		.find(j.CallExpression, {
			callee: {
				type: 'Identifier',
				name: 't',
			},
		})
		.forEach(p => updateDefaultValue(p, en));
	return root;
}

/*
The goal is to find all <Trans> component in the source code. See TmcTutorial.container.js for example.
And to replace the values with the content of portal-app.json
/!\ there are still some indentation issues in the result of the codemod if the content of the trans component is not surrounded with some html tags.
*/

function findJSText(acc, val) {
	if (val.children !== undefined) {
		return val.children.reduce(findJSText, acc);
	}
	if (val.type === 'JSXText') {
		acc.push({ JSXText: val });
	} else if (val.type === 'JSXExpressionContainer') {
		// {{ remoteEngineName }} is a JSXExpressionContainer containing expression.properties.key.name and expression.properties.value.name. So there are not only JSText to update.
		acc.push({
			JSXExpressionContainer: {
				key: val.expression.properties[0].key,
				value: val.expression.properties[0].value,
			},
		});
	}
	return acc;
}

function searchAllTransComponents(j, root, en) {
	root.findJSXElements('Trans').forEach(trans => {
		const { openingElement, closingElement, children } = trans.value;
		const { name, attributes } = openingElement;
		const i18nKey = attributes.find(att => att.name.name === 'i18nKey');
		const key = i18nKey.value.value;
		// Change all JSXText.value with the new value from en[key] with <x> or </x> as separator.
		if (!en[key]) {
			return;
		}
		// Need to find all JSText and JSXExpressionContainer in <Trans> Component RECURSIVELY
		const allJSTextChildren = children.reduce(findJSText, []);
		// split the values coming from *-app.json on <x>, </x> or <x></x>
		// <x></x> (x a number) is used by i18next to replace empty tags like <p/>
		const splittedRef = en[key].split(/<\d><\/\d>|<\/?\d>/);
		allJSTextChildren.forEach((object, index) => {
			const item = allJSTextChildren[index];
			switch (Object.keys(object)[0]) {
				case 'JSXText':
					item.JSXText.value = item.JSXText.value.replace(/(?!\s).*(?<!\s)/, splittedRef[index]);
					break;
				case 'JSXExpressionContainer':
					const newValue = splittedRef[index].replace(/['{{'|'}}']/g, ''); // Remove {{ }} from expression
					item.JSXExpressionContainer.key.name = newValue;
					item.JSXExpressionContainer.value.name = newValue;
					break;
			}
		});
	});
	return root;
}

function getLocales(ref) {
	if (ref.endsWith('.json')) {
		return require(ref);
	}
	const en = {};
	const files = fs.readdirSync(ref);
	files.forEach(filePath => {
		if (filePath.endsWith('.json')) {
			const localeData = require(`${path.join(ref, filePath)}`);
			Object.assign(en, en, localeData);
		}
	});
	return en;
}

export default function transformer(fileInfo, api, options) {
	try {
		const en = getLocales(options.ref);
		const j = api.jscodeshift;
		options.comp = options.comp === 'all' ? ['i18n', 'trans'] : options.comp;

		let result = j(fileInfo.source);
		if (result && options.comp.includes('i18n')) {
			// eslint-disable-next-line no-console
			result = searchAndUpdateI18nValues(j, result, en);
		}
		if (result && options.comp.includes('trans')) {
			// eslint-disable-next-line no-console
			result = searchAllTransComponents(j, result, en);
		}
		// options: https://github.com/benjamn/recast/blob/master/lib/options.ts
		return result.toSource({ useTabs: true, quote: 'single', lineTerminator: '\n' });
	} catch (e) {
		console.error(e.message);
	}
}
