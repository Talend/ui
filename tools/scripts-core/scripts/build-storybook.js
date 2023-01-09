/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';
import { getStorybookConfiguration } from './start-storybook.js';

const buildStorybook = resolveBin('build-storybook');

export default async function build(env, presetApi, options) {
	const sbConfigPath = getStorybookConfiguration(presetApi);

	return spawn.sync(buildStorybook, ['-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
