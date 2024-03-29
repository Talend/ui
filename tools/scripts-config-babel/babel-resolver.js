const path = require('path');
const fs = require('fs');

function checkBabelJsonExtension(babelConfigJsonPath) {
	const babelrc = JSON.parse(fs.readFileSync(babelConfigJsonPath, 'utf8'));
	const babelrcExtends = '@talend/scripts-config-babel/babel.config.js';
	if (babelrc.extends !== babelrcExtends) {
		throw new Error(`
			You have your own babelrc. Please extends our babelrc:
				{ "extends": "${babelrcExtends}" }
		`);
	}
}

function getBabelConfigPath() {
	const userBabelrc = path.join(process.cwd(), '.babelrc');
	const userBabelrcJson = path.join(process.cwd(), '.babelrc.json');
	const userBabelJs = path.join(process.cwd(), 'babel.config.js');
	const defaultBabelrc = path.join(__dirname, 'babel.config.js');

	if (fs.existsSync(userBabelrc)) {
		checkBabelJsonExtension(userBabelrc);
		return userBabelrc;
	} else if (fs.existsSync(userBabelrcJson)) {
		checkBabelJsonExtension(userBabelrcJson);
		return userBabelrcJson;
	} else if (fs.existsSync(userBabelJs)) {
		return userBabelJs;
	}
	return defaultBabelrc;
}

function getBabelConfig() {
	const babelConfigPath = getBabelConfigPath();

	// .babelrc is a json, but without explicit .json extension, node require() tries to parse js
	if (babelConfigPath.endsWith('.babelrc')) {
		return JSON.parse(fs.readFileSync(babelConfigPath, 'utf8'));
	}

	return require(babelConfigPath);
}

module.exports = {
	getBabelConfigPath,
	getBabelConfig,
};
