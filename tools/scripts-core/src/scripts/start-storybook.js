/* eslint-disable no-console */
import * as utils from '@talend/scripts-utils';

import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function start(env, presetApi, options) {
	utils.pkg.checkPackageIsInstalled('@talend/scripts-config-storybook-lib');
	const startStorybook = utils.path.resolveBin('storybook');
	const sbConfigPath = getStorybookConfiguration(presetApi);

	return utils.process.spawn(startStorybook, ['dev', '-c', sbConfigPath].concat(options), {
		stdio: 'inherit',
		env,
	});
}
