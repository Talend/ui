const path = require('path');

/**
 * Require a json file
 * @param {string} filePath path to a json file
 */
function getJson(filePath) {
	return require(path.resolve(filePath)); // eslint-disable-line global-require
}

module.exports = getJson;
