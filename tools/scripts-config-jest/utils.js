function applyBabelTransformOn(config, pkgs) {
	config.transformIgnorePatterns[0] = config.transformIgnorePatterns[0].replace(
		/(\)\)$)/,
		`|${pkgs.join('|')}$1`,
	);
}

module.exports = {
	applyBabelTransformOn,
};
