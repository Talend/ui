const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const { copyFiles } = require('../../common/files');

module.exports = function manageFolder(options) {
	const targetLocalesPath = path.join(options.localesRepoPath, 'locales');
	if (fs.existsSync(targetLocalesPath)) {
		fs.readdirSync(targetLocalesPath).forEach(language => {
			rimraf.sync(path.join(targetLocalesPath, language));
		});
	}

	copyFiles(options.i18nFolder, targetLocalesPath);

	// rename all en_US/ to en/, etc
	fs.readdirSync(targetLocalesPath).forEach(language => {
		const shortLanguage = language.substr(0, language.indexOf('_'));
		fs.renameSync(
			path.join(targetLocalesPath, language),
			path.join(targetLocalesPath, shortLanguage),
		);
	});
};
