/* eslint-disable no-param-reassign */
const webpack = require('webpack');

module.exports = function runWebpack(config) {
	if (!config.mode) {
		config.mode = 'development';
	}

	return new Promise((resolve, reject) => {
		webpack(config).run((err, stats) => {
			if (err) {
				return reject(err);
			}

			// TODO: errors more than one error
			if (stats.compilation.errors.length > 0) {
				return reject(stats.compilation.errors[0]);
			}

			return resolve(stats);
		});
	});
};
