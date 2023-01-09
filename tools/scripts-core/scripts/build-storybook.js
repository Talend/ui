/* eslint-disable import/extensions */
import spawn from 'cross-spawn';
import { resolveBin } from '../utils/path-resolver.js';
import { check } from '../utils/preset.js';
import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function build(env, presetApi, options) {
	const sbConfigPath = getStorybookConfiguration(presetApi);
	check('@talend/scripts-config-storybook-lib');
	const buildStorybook = resolveBin('build-storybook');

	return spawn.sync(buildStorybook, ['-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
