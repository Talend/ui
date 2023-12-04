/* eslint-disable no-console */
import * as utils from '@talend/scripts-utils';

import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function start(env, presetApi, options) {
	const sbConfigPath = getStorybookConfiguration(presetApi);

	return utils.process.spawn(
		'node',
		[utils.path.resolveScript('storybook/index.js'), 'dev', '-c', sbConfigPath].concat(options),
		{
			stdio: 'inherit',
			env,
		},
	);
}
