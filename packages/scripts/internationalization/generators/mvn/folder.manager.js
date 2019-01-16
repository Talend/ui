const fs = require('fs');
const path = require('path');
const mergeDirs = require('merge-dirs').default;
const rimraf = require('rimraf');

const { printInfo } = require('../../common/log');
const { copyFiles, fsFind, getLanguageFoldersDefinitions } = require('../../common/files');

/**
 * Insert language suffix in every file name
 */
function renameFiles(languageFolder) {
	fsFind(languageFolder.absPath, 'f').forEach(filePath => {
		const folder = path.dirname(filePath);
		const fileName = path.basename(filePath);
		const fileNameWithLanguage = fileName.replace(
			/(\.[\w\d_-]+)$/i,
			`_${languageFolder.language}$1`,
		);
		fs.renameSync(filePath, path.join(folder, fileNameWithLanguage));
		printInfo(`Rename ${filePath} --> ${fileNameWithLanguage}`);
	});
}

/**
 * Merge all src folders into a single src.
 */
function mergeSources(languageFolder, srcPath) {
	fsFind(languageFolder.absPath, 'd', 'src').forEach(subSrcPath => mergeDirs(subSrcPath, srcPath));
}

/**
 * Files hierarchy from XTM
 * root
 * 	|_ en										// language
 * 		|_ subProject1							// a project can have N subProjects
 * 			|_ src/main/resources				// maven structure
 * 				|_ org.talend.myproject			// package
 * 					|_ file1.properties
 * 		|_ subProject2
 * 			|_ src/main/resources
 * 				|_ org.talend.myproject2
 * 					|_ file1.properties
 * 					|_ file2.properties
 * 	|_ fr										// language
 * 		|_ subProject1							// a project can have N subProjects
 * 			|_ src/main/resources				// maven structure
 * 				|_ org.talend.myproject			// package
 * 					|_ file1.properties
 * 		|_ subProject2
 * 			|_ src/main/resources
 * 				|_ org.talend.myproject2
 * 					|_ file1.properties
 * 					|_ file2.properties
 *
 * Target
 * root
 * 	|_ src/main/resources						// maven structure
 * 		|_ org.talend.myproject					// subProject1 package
 * 			|_ file1_en.properties
 * 			|_ file1_fr.properties
 * 		|_ org.talend.myproject2				// subProject2 package
 * 			|_ file1_en.properties
 * 			|_ file1_fr.properties
 * 			|_ file2_en.properties
 * 			|_ file2_fr.properties
 */
module.exports = function manageMvnFolder(options) {
	const { i18nFolder, localesRepoPath } = options;
	copyFiles(i18nFolder, localesRepoPath);
	const srcPath = path.join(localesRepoPath, 'src');
	getLanguageFoldersDefinitions(localesRepoPath).forEach(languageFolder => {
		renameFiles(languageFolder);
		mergeSources(languageFolder, srcPath);
		rimraf.sync(languageFolder.absPath);
	});
};
