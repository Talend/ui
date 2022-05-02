const cmd = require('./cmd');
const npm = require('./npm');
const verdaccio = require('./verdaccio');
const git = require('./git');

const cache = {
	tearDown: false,
};

module.exports = function tearDown() {
	if (cache.tearDown) {
		return;
	}

	cache.tearDown = true;

	try {
		cmd.tearDown();
	} catch (error) {
		console.error(error);
	}
	try {
		npm.tearDown();
	} catch (error) {
		console.error(error);
	}
	try {
		git.tearDown(cache.repositories);
	} catch (error) {
		console.error(error);
	}
	try {
		verdaccio.stop();
	} catch (error) {
		console.error(error);
	}
};
