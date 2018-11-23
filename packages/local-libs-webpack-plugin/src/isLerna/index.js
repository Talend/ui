/**
 * Check if filePath is a lerna.json file
 * @param {isLerna} filePath Path to file
 */
function isLerna(filePath) {
	return filePath.includes('lerna.json');
}
