const fs = require('fs');
const path = require('path');
const svg64 = require('svg64');

function getThemeIcon(theme) {
	if (theme === 'tfd') {
		return 'datastreams';
	}
	return theme;
}

/**
 * @return {string} path of the @talend/icons folder
 */
function getTalendIconsPath() {
	const main = require.resolve('@talend/icons');
	const root = main.split('icons')[0];
	return `${root}icons`;
}

/**
 * @returns {string} url for AppLoader icon
 * @param {string} theme the theme trigram of the app
 */
function getAppLoaderIconUrl(theme) {
	return `url(${svg64(
		fs.readFileSync(
			path.join(
				getTalendIconsPath(),
				`/src/svg/products/${theme ? `${getThemeIcon(theme)}-positive.svg` : 'logo-square.svg'}`,
			),
			'utf-8',
		),
	)})`;
}

/**
 * @returns {string} svg in base64 encoded
 * @param {string} theme the theme trigram of the app
 */
function getFavicon(theme) {
	const p = path.join(
		getTalendIconsPath(),
		`/src/svg/products/${theme ? `${getThemeIcon(theme)}-colored.svg` : 'logo-square.svg'}`,
	);
	return svg64(fs.readFileSync(p, 'utf-8'));
}

/**
 * @return {string} path of the @talend/icons dist folder
 */
function getIconsDistPath() {
	return path.join(getTalendIconsPath(), 'dist');
}

module.exports = {
	getFavicon,
	getAppLoaderIconUrl,
	getIconsDistPath,
};
