function addAliases(linkedLibs, aliases) {
	// peerDependencies should use project's node_modules - not the library's
	// this will avoid issues like "multiple instances of react running"
	linkedLibs.forEach(lib => {
		Object.keys(lib.peerDependencies).forEach(peerDependency => {
			aliases[peerDependency] = path.resolve('./node_modules', peerDependency);
		});
	});

	// Add the linked libs last - to override if any of them are also listed as peerDependencies
	linkedLibs.forEach(lib => {
		aliases[lib.name] = lib.path;
	});

	return aliases;
}
