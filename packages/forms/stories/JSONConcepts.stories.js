const { getAllStories } = require('./json');

module.exports = {
	...getAllStories('concepts', require.context(`./json/concepts`, true, /\.json$/)),
	default: {
		title: 'JSON Schema/Core concepts',
	},
};
