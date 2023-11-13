import * as utils from '@talend/scripts-utils';

import buildUMD from './build-lib-umd.js';
import buildLib from './build-lib.js';

// eslint-disable-next-line consistent-return
export default async function build(env, _, options) {
	const packageType = utils.pkg.getPackageType();
	if (packageType.isApp) {
		return utils.process.spawn(
			new URL(import.meta.resolve('webpack/bin/webpack.js')).pathname,
			[
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
		// detect UMD here
		if (options.includes('--umd')) {
			return buildUMD(
				env,
				_,
				options.filter(o => o !== '--umd'),
			);
		}
		return buildLib(env, _, options);
	}
}
