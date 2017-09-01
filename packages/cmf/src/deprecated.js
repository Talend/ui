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
/* eslint-disable no-console*/
export default function deprecated(fn, msg, log) {
	let called = false;
	return function wrapper() {
		if (!called) {
			called = true;
			let message = msg;
			if (typeof msg === 'function') {
				message = msg(arguments);
			}

			message = `DEPRECATED: ${message}`;

			if (log) {
				log(message);
			} else if (console) {
				if (console.warn) {
					console.warn(message);
				} else if (console.log) {
					console.log(message);
				}
			}
		}
		return fn.apply(this, arguments);
	};
}
