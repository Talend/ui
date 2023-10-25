/* eslint-disable no-console */
const os = require('os');
const cmd = require('./cmd');

const cache = {
	tags: [],
	repositories: [],
};

/**
 * Ensure that for a given repository, the current checked-out branch is the target one
 * and that there's no pending modification.
 * @param {Object} info
 * @returns {boolean}
 */
async function checkBranch(info) {
	const branch = info.branch;
	const { path: cwd } = info;

	try {
		const runOpts = { cwd, silent: true };

		// Checked out branch
		let current = await cmd.run('git rev-parse --abbrev-ref HEAD', runOpts);
		current = current.trim();
		if (branch !== current) {
			console.log(`git branch is not OK: ${info.path} should be on ${branch} but is on ${current}`);
			return false;
		}

		// Pending changes
		const status = await cmd.run('git status -s --untracked-files=no', runOpts);
		if (status.trim()) {
			console.log(
				`$${cwd} Warning ! git status is not empty we will not be able to checkout at the end.`,
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

async function checkBranches(infos) {
	cache.repositories = infos;
	const output = await Promise.all(infos.map(checkBranch));
	return output.every(Boolean);
}

// changeset output this:
// 🦋  New tag:  @talend/react-cmf@7.0.0
const NEW_TAG = 'New tag:';

function removeChangesetGitTag(cmdInfo, output) {
	const newTags = output
		.split(os.EOL)
		.filter(l => l.includes(NEW_TAG))
		.map(line => line.split(NEW_TAG)[1].trim());
	return Promise.all(
		newTags.map(tag =>
			cmd.run(`git tag -d ${tag}`, {
				cwd: cmdInfo.cwd,
			}),
		),
	);
}

function tearDown() {
	console.log('git.tearDown()');
	return cache.repositories.map(info => {
		return cmd.runSync('git checkout .', {
			cwd: info.path,
		});
	});
}

module.exports = {
	tearDown,
	checkBranch,
	checkBranches,
	removeChangesetGitTag,
};
