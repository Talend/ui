/* eslint-disable no-console */
/* eslint-disable import/extensions */
import spawn from 'cross-spawn';

import { resolveBin } from '../utils/path-resolver.js';
import { getStorybookConfiguration } from '../utils/storybook.js';

const startStorybook = resolveBin('start-storybook');

export default async function start(env, presetApi, options) {
	const sbConfigPath = getStorybookConfiguration(presetApi);

	return spawn.sync(startStorybook, ['-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
