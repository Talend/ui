const webpack = require('webpack');
const getConfig = require('./webpack.config');

new Promise((resolve, reject) => {
	webpack([getConfig(false), getConfig(true)], async (err, stats) => {
		if (err || stats.hasErrors()) {
			reject(err || stats.toJson().errors);
			return;
		}

		resolve();
	});
}).catch(err => {
	if (err) console.error(err.toString());
	process.exit(1);
});
