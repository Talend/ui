function toJS(data) {
	return data;
}

/**
 * toJS is a higher order selector.
 * The store is now plain JS — this wrapper is retained for backward compatibility
 * and memoization only (prevents unnecessary re-renders when selector result is the
 * same reference). No conversion is performed.
 * Note: your selector must use only one selector
 * @param {function} selector the selector
 * @returns the value returned by the given selector (already a plain JS value)
 */
export default function getToJSMemoized(selector) {
	if (typeof selector !== 'function') {
		throw new Error('selector must be a function in cmf.selectors.toJS(selector)');
	}
	const cache = {};

	function memoize(func) {
		return (...args) => {
			if (cache.key === args[0]) {
				return cache.value;
			}
			cache.key = args[0];
			cache.value = func(...args);
			return cache.value;
		};
	}
	const toJSMemoized = memoize(toJS);
	return state => toJSMemoized(selector(state));
}
