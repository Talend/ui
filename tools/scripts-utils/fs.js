const fs = require('fs');
const path = require('path');

function tsConfig() {
	const appDirectory = fs.realpathSync(process.cwd());
	const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

	return fs.existsSync(resolveApp('tsconfig.json'));
}

async function isFile(p) {
	try {
		const stat = await fs.promises.lstat(p);
		return stat.isFile();
		// eslint-disable-next-line no-empty
	} catch (e) {}
	return false;
}

module.exports = {
	tsConfig,
	isFile,
};
