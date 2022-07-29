function addToIgnorePatterns(config, pkgs) {
	config.transformIgnorePatterns[0] = config.transformIgnorePatterns[0].replace(
		')',
		`|${pkgs.join('|')})`,
	);
}

module.exports = {
	addToIgnorePatterns,
};
