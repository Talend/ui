/* eslint-disable no-console */
/* eslint-disable import/extensions */
import spawn from 'cross-spawn';

import { resolveBin } from '../utils/path-resolver.js';
import { check } from '../utils/preset.js';
import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function start(env, presetApi, options) {
	check('@talend/scripts-config-storybook-lib');
	const startStorybook = resolveBin('start-storybook');
	const sbConfigPath = getStorybookConfiguration(presetApi);

	return spawn.sync(startStorybook, ['-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
