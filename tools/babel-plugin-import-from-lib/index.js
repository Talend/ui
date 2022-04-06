// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

const RULES = require('./rules.json');

module.exports = function transform({ types: t }) {
	let NAMES = Object.keys(RULES);
	function getPath(name, root) {
		const rule = RULES[root][name];
		const base = RULES[root].default || '/';
		if (rule) {
			return rule.from || `${root}${rule.path}`;
		}
		return `${root}${base}${name}`;
	}
	function isDefault(name, root) {
		if (!RULES[root]) {
			return true;
		}
		if (!RULES[root][name]) {
			return true;
		}
		if (RULES[root][name].default !== undefined) {
			
			return RULES[root][name].default;
		}
		return true;
	}
	return {
		visitor: {
			ImportDeclaration(path, state) {
				const options = state.opts;
				if (options && options.rules) {
					Object.assign(RULES, options.rules);
					NAMES = Object.keys(RULES);
				}
				// path.node is the base accessor to AST
				const base = path.node.source.value;
				if (NAMES.indexOf(base) === -1) {
					return;
				}
				const nbSpec = path.node.specifiers.length;

				path.node.specifiers.forEach((spec, index) => {
					if (spec.type === 'ImportSpecifier') {
						if (index + 1 !== nbSpec) {
							// lets add it
							const source = t.stringLiteral(getPath(spec.imported.name, base));
							let specifier = t.importDefaultSpecifier(t.identifier(spec.local.name));
							if (!isDefault(spec.local.name, base)) {
								specifier = t.importSpecifier(t.identifier(spec.local.name), t.identifier(spec.local.name));
							} else if (spec.imported && !isDefault(spec.imported.name, base)) {
								specifier = t.importSpecifier(t.identifier(spec.imported.name), t.identifier(spec.local.name));
							}
							const imp = t.importDeclaration([specifier], source);
							path.insertAfter(imp);
						} else {
							// is last so we replace
							path.node.specifiers = [t.importDefaultSpecifier(t.identifier(spec.local.name))];
							if (!isDefault(spec.imported.name, base)) {
								path.node.specifiers = [t.importSpecifier(t.identifier(spec.local.name), t.identifier(spec.imported.name))];
							}
							path.node.source = t.stringLiteral(getPath(spec.imported.name, base));
						}
					} else {
						console.warn(`WARNING: ${spec.type} are not handled. Bundle size can not be reduced`);
					}
				});
			},
		},
	};
};
