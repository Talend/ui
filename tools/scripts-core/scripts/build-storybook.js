import { resolveBin } from '../utils/path-resolver.js';
import { check } from '../utils/preset.js';
import { mySpawn } from '../utils/spawn.js';
import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function build(env, presetApi, options) {
	const sbConfigPath = getStorybookConfiguration(presetApi);
	check('@talend/scripts-config-storybook-lib');
	const buildStorybook = resolveBin('storybook');

	return mySpawn(buildStorybook, ['build', '-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
