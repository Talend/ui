// eslint-disable-next-line import/no-extraneous-dependencies
const { rimraf } = require('rimraf');

module.exports = function cleanDir(dir) {
	return rimraf(dir);
};
