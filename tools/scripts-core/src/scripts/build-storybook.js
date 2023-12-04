import * as utils from '@talend/scripts-utils';

import { getStorybookConfiguration } from '../utils/storybook.js';

export default async function build(env, presetApi, options) {
	const sbConfigPath = getStorybookConfiguration(presetApi);

	return utils.process.spawn(
		'node',
		[utils.path.resolveScript('storybook/index.js'), 'build', '-c', sbConfigPath].concat(options),
		{
			stdio: 'inherit',
			env,
		},
	);
}
