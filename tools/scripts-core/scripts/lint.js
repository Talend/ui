/* eslint-disable import/extensions */
import lintEs from './lint-es.js';
import lintStyle from './lint-style.js';

export default async function lint(env, presetApi, options) {
	let resEs;
	let resStyle;
	try {
		resEs = await lintEs(env, presetApi, options);
	} catch (e) {
		console.error(e);
	}
	try {
		resStyle = await lintStyle(env, presetApi, options);
	} catch (e) {
		console.error(e);
	}
	return [resEs, resStyle];
}
