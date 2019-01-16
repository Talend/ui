const fs = require('fs');
const path = require('path');
const spawn = require('cross-spawn');
const rimraf = require('rimraf');

const { printRunning } = require('../../common/log');

function copyI18nFiles(i18nFolder, localesPath) {
	printRunning(`Copy ${i18nFolder}/ files into locales repository ${localesPath}`);
	spawn.sync('cp', ['-r', `${i18nFolder}/.`, localesPath], { stdio: 'inherit' });
}

module.exports = function manageFolder(options) {
	const targetLocalesPath = path.join(options.localesRepoPath, 'locales');
	if (fs.existsSync(targetLocalesPath)) {
		fs.readdirSync(targetLocalesPath).forEach(language => {
			rimraf.sync(path.join(targetLocalesPath, language));
		});
	}

	copyI18nFiles(options.i18nFolder, targetLocalesPath);

	// rename all en_US/ to en/, etc
	fs.readdirSync(targetLocalesPath).forEach(language => {
		const shortLanguage = language.substr(0, language.indexOf('_'));
		fs.renameSync(
			path.join(targetLocalesPath, language),
			path.join(targetLocalesPath, shortLanguage),
		);
	});
};
