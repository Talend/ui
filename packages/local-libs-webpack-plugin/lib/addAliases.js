const path = require('path');

/**
 * peerDependencies should use project's node_modules - not the library's
 * this will avoid issues like "multiple instances of react running"
 * @param {object} linkedLibs linkedLibs
 * @param {object} aliases webpack config alias object
 */
function addAliases(linkedLibs, aliases = {}) {
	linkedLibs.forEach(lib => {
		Object.keys(lib.peerDependencies).forEach(peerDependency => {
			// eslint-disable-next-line no-param-reassign
			aliases[peerDependency] = path.resolve('./node_modules', peerDependency);
		});
	});

	// override linkedLibs with correct path (in case they are also a peerDependency)
	linkedLibs.forEach(lib => {
		// eslint-disable-next-line no-param-reassign
		aliases[lib.name] = lib.path;
	});

	return aliases;
}

module.exports = addAliases;
