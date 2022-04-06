const verdaccio = require('./verdaccio');
const cmd = require('./cmd');
const git = require('./git');
const npm = require('./npm');
const teardown = require('./teardown');

module.exports = {
	verdaccio,
	cmd,
	git,
	npm,
	teardown,
};
