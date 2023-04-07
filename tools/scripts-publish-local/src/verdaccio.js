/* eslint-disable no-console */
const fs = require('fs');
const os = require('os');
const rimraf = require('rimraf');
const path = require('path');
const cmd = require('./cmd');
const npm = require('./npm');

function getVerdaccioStoragePath() {
	return path.join(os.homedir(), '/.local/share/verdaccio');
}

function getVerdaccioConfigPath() {
	return path.join(os.homedir(), '/.config/verdaccio');
}

const VERDACCIO_CONFIG_TPL = path.join(__dirname, 'verdaccio.config.yml');
const VERDACCIO_CONFIG_FILE = path.join(process.cwd(), 'verdaccio.config.yml');
const VERDACCIO_PWD_FILE = path.join(process.cwd(), 'htpasswd');
const VERDACCIO_STORAGE = path.join(process.cwd(), 'verdaccio-storage');

function generateConfig() {
	// read token in npmrc
	const npmrcToken = npm.getNPMToken();
	const config = fs.readFileSync(VERDACCIO_CONFIG_TPL).toString();
	fs.writeFileSync(
		VERDACCIO_CONFIG_FILE,
		config.replace('NPMRC_TOKEN', npmrcToken).replace('STORAGE_PATH', VERDACCIO_STORAGE),
	);
}

function stop() {
	console.log('verdaccio.stop');

	// Remove temporary files
	[
		getVerdaccioConfigPath(),
		getVerdaccioStoragePath(),
		VERDACCIO_CONFIG_FILE,
		VERDACCIO_PWD_FILE,
		VERDACCIO_STORAGE,
	].forEach(toBeDeleted => {
		if (fs.existsSync(toBeDeleted)) {
			try {
				rimraf.sync(toBeDeleted);
			} catch (error) {
				console.error(`Can't delete ${toBeDeleted}, error:`, error);
			}
		}
	});
}

async function start() {
	console.log('verdaccio.start');
	return new Promise(resolve => {
		generateConfig();
		cmd.run(`npx --yes verdaccio --config ${VERDACCIO_CONFIG_FILE}`, {
			interactive: verdaccio => {
				verdaccio.stdout.on('data', data => {
					if (data.includes('http address')) {
						resolve();
					}
				});
				verdaccio.on('close', code => {
					console.log(`verdaccio process exited with code ${code}`);
				});
			},
		});
	});
}

module.exports = {
	start,
	stop,
};
