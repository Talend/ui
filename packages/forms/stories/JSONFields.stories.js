const { getAllStories } = require('./json');

module.exports = {
	...getAllStories('fields', require.context(`./json/fields`, true, /\.json$/)),
	default: {
		title: 'JSON Schema/Fields',
	},
};
