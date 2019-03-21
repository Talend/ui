const path = require('path');
const fs = require('fs');

function checkBabelJsonExtension(babelConfigJsonPath) {
	const babelrc = JSON.parse(fs.readFileSync(babelConfigJsonPath, 'utf8'));
	const babelrcExtends = '@talend/scripts/webapp/preset/config/.babelrc.json';
	if (babelrc.extends !== babelrcExtends) {
		throw new Error(`
			You have your own babelrc. Please extends our babelrc:
				{ "extends": "${babelrcExtends}" }
		`);
	}
}

function getBabelConfigPath() {
	const userBabelrcPath = `${process.cwd()}/.babelrc`;
	const userBabelrcJsonPath = `${process.cwd()}/.babelrc.json`;
	const userBabelrcConfigJsPath = `${process.cwd()}/babelrc.config.js`;

	if (fs.existsSync(userBabelrcPath)) {
		checkBabelJsonExtension(userBabelrcPath);
		return userBabelrcPath;
	} else if (fs.existsSync(userBabelrcJsonPath)) {
		checkBabelJsonExtension(userBabelrcJsonPath);
		return userBabelrcJsonPath;
	} else if (fs.existsSync(userBabelrcConfigJsPath)) {
		return userBabelrcConfigJsPath;
	} else {
		return path.join(__dirname, '.babelrc.json');
	}
}

function getBabelConfig() {
	const babelConfigPath = getBabelConfigPath();

	// .babelrc is a json, but without explicit .json extension, node require() tries to parse js
	if (babelConfigPath.endsWith('.babelrc')) {
		return JSON.parse(fs.readFileSync(babelConfigPath, 'utf8'));
	}

	// eslint-disable-next-line global-require
	return require(babelConfigPath);
}

module.exports = {
	getBabelConfigPath,
	getBabelConfig,
};
