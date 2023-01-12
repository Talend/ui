/* eslint-disable no-console */
import { spawn } from 'node:child_process';

export async function mySpawn(cmd, args, opts = {}) {
	return new Promise((resolve, reject) => {
		const out = spawn(cmd, args, opts);
		out.on('error', error => {
			console.error(error);
		});
		out.on('close', () => {
			console.log('close');
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
