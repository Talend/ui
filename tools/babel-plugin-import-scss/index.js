module.exports = function transform({ types: t }) {
	return {
		visitor: {
			ImportDeclaration(path) {
				// path.node is the base accessor to AST
				const base = path.node.source.value;
				if (!base.endsWith('.scss')) {
					return;
				}
				const isCSSModule = path.node.specifiers.length === 1;
				path.node.source.value = path.node.source.value.replace('.scss', '.css');
			},
		},
	};
};
