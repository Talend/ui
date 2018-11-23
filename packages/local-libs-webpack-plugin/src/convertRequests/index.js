function convertRequests(request, linkedLibs) {
	linkedLibs.forEach(lib => {
		if (request === lib.name) {
			// myLib -> Users/me/projects/myLib/src/index.js
			request = `${lib.path}/${lib.mainSrc}`;
		} else if (request.includes(lib.name)) {
			// myLib/something -> Users/me/projects/myLib/src/something
			request = request.replace(`${lib.name}/${lib.main}`, `${lib.path}/${lib.mainSrc}`);
		}
	});
	return request;
}

module.exports = convertRequests;
