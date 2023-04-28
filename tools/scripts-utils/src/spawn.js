/* eslint-disable no-console */
const processSpawn = require('child_process').spawn;

async function spawn(cmd, args, opts = {}) {
	return new Promise((resolve, reject) => {
		const out = processSpawn(cmd, args, opts);
		out.on('error', error => {
			console.error(error);
		});
		out.on('close', () => {
			resolve(out);
		});
		out.on('exit', code => {
			if (code > 0) {
				reject({ cmd, args, code });
				return;
			}
			resolve(out);
		});
	});
}
module.exports = {
	spawn,
};
