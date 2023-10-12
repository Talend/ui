import * as utils from '@talend/scripts-utils';
import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function build(env, presetApi, options) {
	const sbConfigPath = getStorybookConfiguration(presetApi);
	utils.pkg.checkPackageIsInstalled('@talend/scripts-config-storybook-lib');

	return utils.process.spawn(
		new URL(import.meta.resolve('storybook/index.js')).pathname,
		['build', '-c', sbConfigPath].concat(options),
		{
			stdio: 'inherit',
			env,
		},
	);
}
