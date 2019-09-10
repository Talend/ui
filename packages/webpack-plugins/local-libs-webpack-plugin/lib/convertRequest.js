/**
 * Convert requests if they are a linkedLib
 * @param {string} request the path to require
 * @param {object} linkedLibs linkedLibs
 */
function convertRequest(request, linkedLibs) {
	linkedLibs.forEach(lib => {
		if (request === lib.name) {
			// myLib -> Users/me/projects/myLib/src/index.js
			request = `${lib.path}/${lib.mainSrc}`; // eslint-disable-line no-param-reassign
		} else if (request.includes(lib.name)) {
			// myLib/something -> Users/me/projects/myLib/src/something
			// eslint-disable-next-line no-param-reassign
			request = request.replace(`${lib.name}/${lib.main}`, `${lib.path}/${lib.mainSrc}`);
		}
	});
	return request;
}

module.exports = convertRequest;
