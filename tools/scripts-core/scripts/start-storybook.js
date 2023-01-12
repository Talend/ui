/* eslint-disable no-console */

import { resolveBin } from '../utils/path-resolver.js';
import { check } from '../utils/preset.js';
import { mySpawn } from '../utils/spawn.js';
import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function start(env, presetApi, options) {
	check('@talend/scripts-config-storybook-lib');
	const startStorybook = resolveBin('storybook');
	const sbConfigPath = getStorybookConfiguration(presetApi);

	return mySpawn(startStorybook, ['dev', '-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
