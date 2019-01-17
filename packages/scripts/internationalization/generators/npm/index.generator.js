const fs = require('fs');
const path = require('path');
const template = require('lodash.template');

const { printRunning, printSuccess } = require('../../common/log');

const languageTemplate = template('const <%= language %> = {\n<%= filesRequires %>\n};');
const requireTemplate = template(
	"	'<%= namespace %>': require('./locales/<%= language %>/<%= namespace %>.json'),",
);
const exportsTemplate = template(`
module.exports = {
	namespaces: [<%= namespaces %>],
 	locales: { <%= languages %> },
};
`);

/**
 * Generate i18n project index.js
 * The target project must respect this folder hierarchy
 * root
 * 	|_ locales
 * 		|_ <language_1>
 * 		 	|_ <namespace_1>.json
 * 		 	|_ <namespace_2>.json
 * 		 	|_ <namespace_3>.json
 * 		|_ <language_2>
 * 		 	|_ <namespace_1>.json
 * 		 	|_ <namespace_2>.json
 * 		 	|_ <namespace_3>.json
 */
module.exports = function generateIndexJS(projectPath) {
	// Get languages definitions
	// - name: folder name
	// - language: language on 2 chars (en_US --> en)
	// - absPath: folder absolute path
	// - namespaces: the name of the files it contains
	// 		--> "toto.json tata.json" --> namespaces = ['toto', 'tata']
	const localesPath = path.join(projectPath, 'locales');
	const languageDirectories = fs
		.readdirSync(localesPath)
		.filter(name => name !== '.git')
		.map(name => ({
			name,
			absPath: path.join(localesPath, name),
		}))
		.filter(({ absPath }) => fs.lstatSync(absPath).isDirectory())
		.map(directory => ({
			...directory,
			namespaces: fs
				.readdirSync(directory.absPath)
				.map(fileName => fileName.match(/(.*)\.json/)[1]),
		}));

	// generate index.js
	printRunning('Generating index.js');
	const languagesDefinitions = languageDirectories
		.map(directory => {
			const filesRequires = directory.namespaces
				.map(namespace => requireTemplate({ namespace, language: directory.name }))
				.join('\n');
			return languageTemplate({ language: directory.name, filesRequires });
		})
		.join('\n');
	const exportsDefinitions = exportsTemplate({
		namespaces: [...new Set(languageDirectories.flatMap(directory => directory.namespaces))]
			.map(n => `'${n}'`)
			.join(', '),
		languages: languageDirectories.map(({ name }) => name).join(', '),
	});

	const indexJsPath = path.join(projectPath, 'index.js');
	fs.writeFileSync(indexJsPath, `${languagesDefinitions}\n${exportsDefinitions}`);
	printSuccess(`index.js saved to ${indexJsPath}`);
};
