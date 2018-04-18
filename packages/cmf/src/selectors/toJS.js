function toJS(data) {
	if (data) {
		if (typeof data.toJS === 'function') {
			return data.toJS();
		}
		throw new Error('the selector return a data which is not an immutable');
	}
	return undefined;
}

export default function getToJSMemoized(selector) {
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
