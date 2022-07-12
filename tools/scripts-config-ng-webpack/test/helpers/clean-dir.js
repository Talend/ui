// eslint-disable-next-line import/no-extraneous-dependencies
const rimraf = require('rimraf');

module.exports = function cleanDir(dir) {
	return new Promise((resolve, reject) => {
		rimraf(dir, err => {
			if (err) {
				return reject(err);
			}

			return resolve();
		});
	});
};
