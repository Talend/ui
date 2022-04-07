/**
 * Filter request on method and path.
 * Note if it find more than one results it will try to be more restrictive
 * using queryString and body payload.
 */
function filter(HAR, req) {
	// lets do a first pass on it.
	let entries = HAR.log.entries.filter(e => {
		const u = typeof e.request.url === 'string' ? new URL(e.request.url) : e.request.url;
		if (u.pathname !== req.path) {
			return false;
		}
		if (e.request.method !== req.method) {
			return false;
		}
		return true;
	});
	if (entries.length > 1) {
		// first lets filter on query params
		const withSameQueryString = entries.filter(e =>
			e.request.queryString.every(qs => req.params[qs.name] === qs.value),
		);
		if (withSameQueryString.length > 0) {
			entries = withSameQueryString;
		}
	}
	if (entries.length > 1 && req.body) {
		// then try to filter on body
		const withTheSameBody = entries.filter(e => {
			const data = e.request.postData;
			return data && req.body === data.text;
		});
		if (withTheSameBody.length > 0) {
			entries = withTheSameBody;
		}
	}

	return entries;
}

/**
 * Given a har, this generates a getter. This getter takes an http request and try to find a suitable response in the har.
 *
 * @param {*} harContent A har file content as object
 * @returns A fetch response getter
 */
export function getHarHandler(harContent) {
	const stateFilter = new Map();

	return function getResponse(req) {
		const found = filter(harContent, req);
		if (found.length > 0) {
			let candidate = found[0].response;
			if (found.length > 1) {
				// rotation using the stateFilter
				const key = `${req.method}-${req.path}`;
				let index = stateFilter.get(key) || 0;
				if (index >= found.length) {
					index = 0;
				}
				stateFilter.set(key, index + 1);
				candidate = found[index].response;
			}
			return candidate;
		}
		return null;
	};
}
