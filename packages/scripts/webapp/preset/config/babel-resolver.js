const path = require('path');
const fs = require('fs');

function getBabelConfigPath() {
	const userBabelrcPath = `${process.cwd()}/.babelrc`;
	if (!fs.existsSync(userBabelrcPath)) {
		return path.join(__dirname, '.babelrc.json');
	}

	const babelrc = JSON.parse(fs.readFileSync(userBabelrcPath, 'utf8'));
	const babelrcExtends = '@talend/scripts/webapp/preset/config/.babelrc.json';
	if (babelrc.extends !== babelrcExtends) {
		throw new Error(`
			You have your own babelrc. Please extends our babelrc:
				{ "extends": "${babelrcExtends}" }
		`);
	}
	return userBabelrcPath;
}

function getBabelConfig() {
	return JSON.parse(fs.readFileSync(getBabelConfigPath(), 'utf8'));
}

module.exports = {
	getBabelConfigPath,
	getBabelConfig,
};
