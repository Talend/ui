import * as utils from '@talend/scripts-utils';

import startStorybook from './start-storybook.js';

export default async function start(env, _, options) {
	const packageType = utils.pkg.getPackageType();

	if (packageType.isApp) {
		return utils.process.spawn(
			new URL(import.meta.resolve('webpack/bin/webpack.js')).pathname,
			[
				'serve',
				'--config',
				utils.path.hereRelative(
					utils.path.getDirName(import.meta.url),
					'../config/webpack.config.js',
				),
				'--progress',
				...options,
			],
			{ stdio: 'inherit', env },
		);
	}
	if (packageType.isLib) {
		return startStorybook(env, _, options);
	}
	return null;
}
