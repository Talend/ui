function toJS(data) {
	if (data) {
		if (typeof data.toJS === 'function') {
			return data.toJS();
		}
		throw new Error('the selector return a data which is not an immutable');
	}
	return undefined;
}

/**
 * toJS is an higher order selector.
 * It modify a given selector to return the value as a POJO
 * Note: your selector must use only one selector
 * @param {function} selector the selector
 * @returns the POJO associated to the given selector
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
