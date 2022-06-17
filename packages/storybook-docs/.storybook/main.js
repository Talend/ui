const path = require('path');

module.exports = {
	staticDirs: [
		{
			from: path.join(__dirname, '../dist'),
			to: `/storybook-docs/assets/`,
		},
	],
};
