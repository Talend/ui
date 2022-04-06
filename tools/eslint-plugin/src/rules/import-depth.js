/**
 * @fileoverview Check if the import depth let your code be UMD build compliant
 * @author Jean-Michel FRANCOIS
 */

const modules = require('@talend/scripts-config-cdn/modules.json');
const modulesToCheck = Object.keys(modules);

/**
 * Returns the name of the module imported or re-exported.
 * @param {ASTNode} node A node to get.
 * @returns {string} the name of the module, or empty string if no name.
 */
function getValue(node) {
	let value = '';
	if (node && node.source && node.source.value) {
		value = node.source.value.trim();
	}

	return value;
}

// are considered as components lib
const COMPONENTS = ['context', 'react-components', 'react-containers'];

function isTalendUI(packageName) {
	return modulesToCheck.find(package => packageName.startsWith(package));
}

function checkAndReport(context, node, value, messageId) {
	if (!isTalendUI(value)) {
		return;
	}
	const splited = value.split('/');
	let max_length = 2;
	let should = `${splited[0]}/${splited[1]}`;
	if (COMPONENTS.indexOf(splited[1]) !== -1) {
		max_length = 4;
		should = `${should}/${splited[2]}/${splited[3]}`;
	}
	if (splited.length > max_length) {
		context.report({
			node,
			messageId,
			data: {
				module: value,
				should,
			},
		});
	}
}

function handleImports(context) {
	return function (node) {
		const value = getValue(node);

		if (value) {
			checkAndReport(context, node, value, 'tooDeep');
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'Check if the import depth let your code be UMD build compliant',
			category: 'Build',
			recommended: false,
		},
		fixable: null,
		schema: {},
		messages: {
			tooDeep: "'{{module}}' import too deep. No more than {{should}}",
		},
	},

	create: function create(context) {
		return {
			ImportDeclaration: handleImports(context),
		};
	},
};
