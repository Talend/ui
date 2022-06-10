const path = require('path');

function getWebpackCopyConfig() {
	return [
		{
			from: '+(mode|theme)-*.js',
			context: path.resolve(__dirname, 'dist'),
			info: { minimized: true },
		},
	];
}

module.exports = {
	getWebpackCopyConfig,
};
