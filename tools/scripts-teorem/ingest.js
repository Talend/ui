/**
 * This script ingests all lock files to list all the used dependencies.
 * It creates a projects-dependencies.json file with the following structures
 *
 *
 */

const Octokit = require('@octokit/rest').Octokit;
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const queue = require('queue');

// start of ingest

function ingest(program) {
	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN,
		log: program.verbose ? console : null,
	});

	console.log('## command ingest');
	const q = queue();

	const config = require(path.join(process.cwd(), program.config));
	const output = program.output || 'data';
	if (!fs.existsSync(output)) {
		if (program.verbose) {
			console.log(`${output} do not exists => create it`);
		}
		fs.mkdirSync(output);
	}

	Object.keys(config.repository).forEach(owner => {
		Object.keys(config.repository[owner]).forEach(repo => {
			config.repository[owner][repo].forEach(fpath => {
				const savePath = `${output}/${owner}/${repo}${fpath}`;
				q.push(() => {
					return octokit.repos
						.getContent({
							owner,
							repo,
							path: fpath,
						})
						.then(response => {
							const splitedPath = savePath.split('/');
							splitedPath.pop();
							try {
								mkdirp.sync(splitedPath.join('/'));
								const buff = Buffer.from(response.data.content, 'base64');
								fs.writeFileSync(savePath, buff.toString('utf-8'));
							} catch (e) {
								console.error(e);
							}
						})
						.catch(e => {
							console.error(e);
						});
				});
			});
		});
	});

	if (program.verbose) {
		console.log(`queue length: ${q.length}`);
	}
	q.concurrency = 5;
	q.on('error', e => {
		console.error(e);
	});
	q.on('timeout', function (next, job) {
		console.error('job timed out:', job.toString().replace(/\n/g, ''));
		next();
	});
	q.start();
	return q;
}

module.exports = ingest;
