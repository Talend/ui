export default function transformer(file, { jscodeshift: j }, options) {
	const source = j(file.source);

	source
		.find(j.ImportDeclaration) // Find all nodes that match a type of `ImportDeclaration`
		.filter(path => path.node.source.value === 'react-bootstrap') // Filter imports "react-bootstrap"
		.forEach(p => {
			j(p).replaceWith(
				j.importDeclaration(p.value.specifiers, j.literal('@talend/react-bootstrap')),
			);
		});

	return source.toSource();
}
