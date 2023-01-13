import * as utils from '@talend/scripts-utils';
import buildLib from './build-lib.js';
import buildUMD from './build-lib-umd.js';

export default async function build(env, _, options) {
	const packageType = utils.pkg.getPackageType();
	if (packageType.isApp) {
		utils.pkg.checkPackageIsInstalled('@talend/scripts-config-react-webpack');
		const webpack = utils.path.resolveBin('webpack');
		return utils.process.spawn(
			webpack,
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
			utils.pkg.checkPackageIsInstalled('@talend/scripts-config-react-webpack');
			return buildUMD(
				env,
				_,
				options.filter(o => o !== '--umd'),
			);
		}
		return buildLib(env, _, options);
	}
}
