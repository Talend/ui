const { glob } = require('glob');

async function globMatch(pattern) {
	const files = await glob(pattern);
	return files.length > 0;
}
module.exports = {
	globMatch,
};
