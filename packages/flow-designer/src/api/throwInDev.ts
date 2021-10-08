/**
 * Throw {message} only in dev mode
 * @param {string} message
 */
export function throwInDev(message: string | TypeError) {
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
 * @param {Object} given - the given param
 * @param {string} module - (optionnal) module to use
 */
export function throwTypeError(expected: string, given: Object, module?: string | undefined) {
	throwInDev(
		new TypeError(`${expected || 'parameter'} should be a ${expected}, was given
"""
${typeof given}
"""
${given && given.toString()}
"""
${module && `you should use ${module} module functions to create and transform ${module}`}`),
	);
}
