#!/usr/bin/env node
/* eslint-disable import/no-dynamic-require */

const path = require('path');
const mod = require('../src');

const CWD = process.cwd();
const HELP_MSG = 'talend-scripts publish:local --config=./config.json';

const cache = {
	tearDown: false,
	repositories: [],
};

process.on('SIGINT', () => {
	mod.teardown();
});

async function main(options) {
	mod.cmd.setup();
	const program = options
		.filter(opt => opt.startsWith('-'))
		.reduce((acc, key) => {
			if (key.startsWith('--')) {
				const split = key.split('=');
				const optKey = split[0].replace('--', '');
				acc[optKey] = split[1] || true;
			}
			if (key.startsWith('-')) {
				const optKey = key.replace('-', '');
				acc[optKey] = true;
			}
			return acc;
		}, {});

	if (program.help || program.h) {
		// eslint-disable-next-line no-console
		console.log(HELP_MSG);
		process.exit(0);
	}
	if (program.config) {
		const configPath = path.join(CWD, program.config);
		const configDir = path.dirname(configPath);
		// eslint-disable-next-line global-require
		const config = require(configPath);
		cache.repositories = Object.values(config.repositories).map(repository => ({
			...repository,
			// Replace repositories relative paths to absolute paths, starting from config file location
			path: path.resolve(path.join(configDir, repository.path)),
		}));
		try {
			const branchOK = await mod.git.checkBranches(cache.repositories);
			if (!branchOK) {
				process.exit(1);
			}
		} catch (error) {
			console.error('ouch', error);
		}
	}

	try {
		mod.npm.beforeSetup();
		await mod.verdaccio.start();
		await mod.npm.setup(cache.repositories);
	} catch (error) {
		console.error(error);
	}

	const allcmds = cache.repositories.reduce((acc, repo) => {
		const cmds = repo.commands.map(cmd => {
			// conversion from string to structure for spawn
			const args = cmd.split(' ');
			const name = args.shift();
			const cwd = program.config ? repo.path : path.join(CWD, repo.path);
			return { name, args, cwd };
		});
		return acc.concat(cmds);
	}, []);

	const history = allcmds.map(cmd => `${cmd.cwd} ${cmd.name} ${cmd.args.join(' ')}`);
	const onSuccess = (...args) => {
		mod.git.removeChangesetGitTag(...args);
	};
	const promptHelp =
		'this is a prompt, type "q" to exit, or just enter without command to continue';
	// eslint-disable-next-line no-console
	console.log(promptHelp);
	await mod.cmd.prompt(history, onSuccess, mod.teardown);
	try {
		await mod.cmd.consume(allcmds, {
			onSuccess,
			verbose: true,
		});
	} catch (error) {
		console.error(error);
	}
	await mod.cmd.prompt(history, onSuccess, mod.teardown);
}

main(process.argv);
