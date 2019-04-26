const interceptors = [];

function isInterceptor(obj) {
	if (!obj) {
		return false;
	}
	if (typeof obj !== 'object') {
		return false;
	}
	if (!obj.request && !obj.response) {
		return false;
	}
	if (obj.request && typeof obj.request !== 'function') {
		return false;
	}
	if (obj.response && typeof obj.request !== 'function') {
		return false;
	}
	return true;
}

/**
 * interceptors.push let you add an interceptor
 * An interceptor is an object with the following keys: request, response.
 * Both are simple functions which take the config, response and return sync or async the enriched value
 */
function push(interceptor) {
	if (isInterceptor(interceptor)) {
		interceptors.push(interceptor);
	} else {
		console.error('CMF.interceptors.push not a valid interceptor', interceptor);
	}
}

function consume(arr, attr, argument) {
	if (arr.length === 0) {
		return argument;
	}
	const pop = arr.pop();
	if (!pop[attr]) {
		return consume(arr, attr, argument);
	}
	const result = pop[attr](argument);
	if (result.then) {
		return result
			.then(newConfig => consume(arr, attr, newConfig))
			.catch(error => console.error(error));
	}
	return consume(arr, attr, result);
}

function onRequest(config) {
	const copy = interceptors.slice(0);
	const result = consume(copy, 'request', config);
	if (result.then) {
		return result;
	}
	return new Promise(resolve => {
		resolve(result);
	});
}

function onResponse(config) {
	const copy = interceptors.slice(0);
	const result = consume(copy, 'response', config);
	if (result.then) {
		return result;
	}
	return new Promise(resolve => {
		resolve(result);
	});
}

export default {
	push,
	onRequest,
	onResponse,
};
