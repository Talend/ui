/**
 * Remove file from a filepath
 * @param {string} filePath filePath
 */
function pathWithoutFilename(filePath = '') {
	const dirs = filePath.split('/');
	if (dirs[dirs.length - 1].includes('.')) {
		dirs.pop();
	}
	return dirs.join('/');
}

module.exports = pathWithoutFilename;
