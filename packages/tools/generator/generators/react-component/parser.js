const fs = require('fs');
const recast = require('recast');
/* eslint-disable no-console */

/**
 * create an AST to output an import declaration:
 * -> import MyComponent from './MyComponent';
 * @param {string} componentName the name of the generated component
 * @return {Object} AST
 */
function createDefaultImportDeclaration(componentName) {
	return recast.types.builders.importDeclaration([
		recast.types.builders.importDefaultSpecifier(
			recast.types.builders.identifier(componentName)
		),
	], recast.types.builders.stringLiteral(`./${componentName}`));
}

/**
 * create an AST to output an import declaration:
 * -> import MyComponent from './MyComponent';
 * @param {Object} AST the ast of the parsed source code
 * @return {integer} index in the AST of the last import declaration
 */
function getLastImportIndex(ast) {
	const imports = ast.program.body.filter(item => item.type === 'ImportDeclaration');
	const lastImport = imports[imports.length - 1];
	return ast.program.body.indexOf(lastImport);
}

/**
 * @param {Object} AST of the parsed index.js
 */
function addDefaultImport(ast, componentName) {
	ast.program.body.splice(
		getLastImportIndex(ast) + 1,
		0,
		createDefaultImportDeclaration(componentName)
	);
}

/**
 * Modify the AST export default declaration
 * @param {Object} AST the ast of the parsed source code
 * @param {string} componentName the name of the generated component
 * @return undefined
 */
function updateDefaultExport(ast, componentName) {
	const exportDeclaration = ast.program.body.find(item => item.type === 'ExportDefaultDeclaration');
	// create the export property
	const expProperty = recast.types.builders.objectProperty(
		recast.types.builders.identifier(componentName),
		recast.types.builders.identifier(componentName)
	);
	expProperty.shorthand = true;  // do not repeat Foo: Foo
	// add it
	exportDeclaration.declaration.properties.push(expProperty);
}

/**
 * @param {string} basePath the path where the component is generated
 * @return {Object|undefined} the AST of index.js file
 */
function parse(filePath) {
	let sourceCode;
	try {
		sourceCode = fs.readFileSync(filePath);
		return recast.parse(sourceCode);
	} catch (error) {
		console.error(error.message);
	}
	return undefined;
}

/**
 * Write down an AST into a PATH
 * @param {string} indexPath the path to the index.js file
 * @param {Object} AST the ast of the parsed source code
 * @return undefined
 */
function write(filePath, ast) {
	const output = recast.print(ast, { quote: 'single', useTabs: true, trailingComma: true }).code;
	fs.writeFile(filePath, output, err => {
		if (err) {
			throw err;
		}
	});
}

module.exports = {
	parse,
	addDefaultImport,
	updateDefaultExport,
	write,
};
