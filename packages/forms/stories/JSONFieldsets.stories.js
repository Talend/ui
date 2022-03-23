const { getAllStories } = require('./json');

module.exports = {
	...getAllStories('fieldsets', require.context(`./json/fieldsets`, true, /\.json$/)),
	default: {
		title: 'JSON Schema/Fieldsets',
	},
};
