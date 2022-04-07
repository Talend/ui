/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
function getResolver(resolver = '@talend/module-to-cdn') {
	if (typeof resolver === 'function') {
		return resolver;
	}

	return require(resolver);
}

module.exports = getResolver;
