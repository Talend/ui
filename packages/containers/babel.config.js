const defaultBabel = require('../../babel.config');

module.exports = function babel(api) {
	const results = defaultBabel(api);
	results.plugins.push('module:@talend/plugin-transform-ui-imports');
	return results;
};
