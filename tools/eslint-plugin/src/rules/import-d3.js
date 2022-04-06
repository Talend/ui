/**
 * @fileoverview Check if the import of d3 is done using the d3 package
 * @author Jean-Michel FRANCOIS
 */

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
const D3 = [
    "d3-array",
    "d3-axis",
    "d3-brush",
    "d3-chord",
    "d3-color",
    "d3-contour",
    "d3-delaunay",
    "d3-dispatch",
    "d3-drag",
    "d3-dsv",
    "d3-ease",
    "d3-fetch",
    "d3-force",
    "d3-format",
    "d3-geo",
    "d3-hierarchy",
    "d3-interpolate",
    "d3-path",
    "d3-polygon",
    "d3-quadtree",
    "d3-random",
    "d3-scale",
    "d3-scale-chromatic",
    "d3-selection",
    "d3-shape",
    "d3-time",
    "d3-time-format",
    "d3-timer",
    "d3-transition",
    "d3-zoom"
];
function isD3(packageName) {
	return D3.some(package => packageName === package);
}

function checkAndReport(context, node, value, messageId) {
	if (!isD3(value)) {
		return;
	}
    context.report({
        node,
        messageId,
        data: {
            module: value,
        },
    });
}

function handleImports(context) {
	return function (node) {
		const value = getValue(node);

		if (value) {
			checkAndReport(context, node, value, 'd3');
		}
	};
}

module.exports = {
	meta: {
		docs: {
			description: 'Check if the import of d3 is not using d3-*',
			category: 'Build',
			recommended: false,
		},
		fixable: null,
		schema: {},
		messages: {
			d3: "'{{module}}' import detected. You should use d3 main package to be cdn compliant",
		},
	},

	create: function create(context) {
		return {
			ImportDeclaration: handleImports(context),
		};
	},
};
