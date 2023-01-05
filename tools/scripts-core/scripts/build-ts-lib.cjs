const buildLib = require('./build-lib.cjs');

module.exports = function build(env, presetApi, unsafeOptions) {
	console.warn('build:ts:lib is deprecated, please use build:lib instead');
	return buildLib(env, presetApi, unsafeOptions);
};
