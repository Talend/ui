/* eslint-disable no-console */
import * as utils from '@talend/scripts-utils';

import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function start(env, presetApi, options) {
	utils.pkg.checkPackageIsInstalled('@talend/scripts-config-storybook-lib');
	const sbConfigPath = getStorybookConfiguration(presetApi);

	return utils.process.spawn(
		new URL(import.meta.resolve('storybook/index.js')).pathname,
		['dev', '-c', sbConfigPath].concat(options),
		{
			stdio: 'inherit',
			env,
		},
	);
}
