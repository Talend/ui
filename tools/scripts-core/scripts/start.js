/* eslint-disable import/extensions */
import { getDirName } from '../utils/dirname.js';
import { hereRelative, resolveBin } from '../utils/path-resolver.js';
import { check, getPresetEnv } from '../utils/preset.js';
import { mySpawn } from '../utils/spawn.js';
import startStorybook from './start-storybook.js';

export default async function start(env, _, options) {
	const packageType = getPresetEnv();

	if (packageType.isApp) {
		check('@talend/scripts-config-react-webpack');
		const webpack = resolveBin('webpack');
		return mySpawn(
			webpack,
			[
				'serve',
				'--config',
				hereRelative(getDirName(import.meta.url), '../config/webpack.config.js'),
				'--progress',
				...options,
			],
			{ stdio: 'inherit', env },
		);
	}
	if (packageType.isLib) {
		return startStorybook(env, _, options);
	}
}
