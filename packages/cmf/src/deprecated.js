/**
 * @module react-cmf/lib/deprecated
 */

/**
 * display a deprecated message on the first call of a function.
 * @param  {Function} fn  the function to deprecate
 * @param  {String}   msg the message to display
 * @param  {function}   log [description]
 * @return {any}       the content of fn;
 */

/* eslint-disable prefer-rest-params */
export default function deprecated(fn, msg, log = console.warn) {  // eslint-disable-line no-console
	let called = false;
	return function wrapper() {
		if (!called) {
			called = true;
			let message = msg;
			if (typeof msg === 'function') {
				message = msg(arguments);
			}
			log(`DEPRECATED: ${message}`);
		}
		return fn.apply(this, arguments);
	};
}
