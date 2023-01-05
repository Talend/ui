/* eslint-disable import/extensions */
import buildLib from './build-lib.js';

export default function build(env, presetApi, unsafeOptions) {
	console.warn('build:ts:lib is deprecated, please use build:lib instead');
	return buildLib(env, presetApi, unsafeOptions);
}
