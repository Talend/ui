const fs = require('fs');
const path = require('path');
const template = require('lodash.template');

const { printRunning, printSuccess } = require('../../common/log');

const languageTemplate = template('const <%= language %> = {\n<%= filesRequires %>\n};');
const requireTemplate = template(
	"	'<%= namespace %>': require('./<%= folderName %>/<%= namespace %>.json'),",
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
	const languageDirectories = fs
		.readdirSync(projectPath)
		.map(name => ({
			name,
			absPath: path.join(projectPath, name),
		}))
		.filter(({ name }) => name !== '.git')
		.filter(({ absPath }) => fs.lstatSync(absPath).isDirectory())
		.map(directory => ({
			...directory,
			language: directory.name.substr(0, directory.name.indexOf('_')),
			namespaces: fs
				.readdirSync(directory.absPath)
				.map(fileName => fileName.match(/(.*)\.json/)[1]),
		}));

	// generate index.js
	printRunning('Generating index.js');
	const languagesDefinitions = languageDirectories
		.map(directory => {
			const filesRequires = directory.namespaces
				.map(namespace => requireTemplate({ namespace, folderName: directory.name }))
				.join('\n');
			return languageTemplate({ language: directory.language, filesRequires });
		})
		.join('\n');
	const exportsDefinitions = exportsTemplate({
		namespaces: [...new Set(languageDirectories.flatMap(directory => directory.namespaces))]
			.map(n => `'${n}'`)
			.join(', '),
		languages: languageDirectories.map(({ language }) => language).join(', '),
	});

	const indexJsPath = path.join(projectPath, 'index.js');
	fs.writeFileSync(indexJsPath, `${languagesDefinitions}\n${exportsDefinitions}`);
	printSuccess(`index.js saved to ${indexJsPath}`);
};
