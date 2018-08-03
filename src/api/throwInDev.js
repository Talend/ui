/**
 * Throw {message} only in dev mode
 * @param {string} message
 */
export function throwInDev(message) {
	if (!(process.env.NODE_ENV === 'production')) {
		throw message;
	}
}

/**
 * Throw a type error
 * @todo for ease of use param should be an object {
 *	expected: 'Linkrecord',
 *	given: link,
 *	paramName: 'link',
 *	module: 'Link'
 *	}
 * @param {string} expected - describe expected type
 * @param {any} given - the given param
 * @param {string} paramName - the paramname
 * @param {string} module - (optionnal) module to use
 */
export function throwTypeError(expected, given, paramName, module) {
	throwInDev(
		new TypeError(
			`${expected || 'parameter'} should be a ${expected}, was given
"""
${typeof given}
"""
${given && given.toString()}
"""
${module && `you should use ${module} module functions to create and transform ${module}`}`,
		),
	);
}
