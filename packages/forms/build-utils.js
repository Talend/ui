const path = require('path');

function getWebpackCopyConfig() {
	return [
		{
			from: '+(mode|theme|snippets)-*.js',
			context: path.resolve(__dirname, 'dist'),
			info: { minimized: true },
		},
	];
}

module.exports = {
	getWebpackCopyConfig,
};
