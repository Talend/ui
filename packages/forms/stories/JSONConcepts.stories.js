const { getAllStories } = require('./json');

module.exports = {
	...getAllStories('concepts', require.context(`./json/concepts`, true, /\.json$/)),
	default: {
		title: 'Forms/Core concepts',
	},
};
