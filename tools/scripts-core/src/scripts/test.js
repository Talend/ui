import path from 'path';
import { fileURLToPath } from 'url';

import * as utils from '@talend/scripts-utils';

import { resolveScript } from '../utils/bin.js';
import { getUserConfigFile } from '../utils/env.js';

async function testKarma(env, presetApi, options) {
	const configPath = path.dirname(
		fileURLToPath(import.meta.resolve('@talend/scripts-config-karma')),
	);
	const karmaConfigPath = path.join(configPath, 'karma.conf.js');

	return utils.process.spawn(
		'node',
		[resolveScript('karma/bin/karma'), 'start', karmaConfigPath].concat(options),
		{
			stdio: 'inherit',
			env,
		},
	);
}

export default async function test() {
	throw new Error(
		'test command is not supported anymore. Please use either jest or karma or vitest directly',
	);
}
