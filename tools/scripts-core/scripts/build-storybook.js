import * as utils from '@talend/scripts-utils';
import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function build(env, presetApi, options) {
	const sbConfigPath = getStorybookConfiguration(presetApi);
	utils.pkg.checkPackageIsInstalled('@talend/scripts-config-storybook-lib');
	const buildStorybook = utils.path.resolveBin('build-storybook');

	return utils.process.spawn(buildStorybook, ['-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
