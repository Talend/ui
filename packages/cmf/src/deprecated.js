/**
 * Used to deprecate what ever you want
 * @module react-cmf/lib/deprecated
 */

/* eslint-disable prefer-rest-params */
/* eslint-disable no-console */

/**
 * display a deprecated message on the first call of a function.
 * @param  {Function} fn  the function to deprecate
 * @param  {String}   msg the message to display
 * @param  {function}   log [description]
 * @return {any}       the content of fn;
 */
export default function deprecated(fn, msg, log) {
	let called = false;
	function wrapper() {
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
	}
	wrapper.wrappedFunction = fn;
	return wrapper;
}
