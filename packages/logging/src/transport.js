export function sendReport(payload, transportOpts, attempt = 0) {
	const {
		send,
		payloadMiddleware,
		fetchOptions,
		successHandler,
		retryCount,
		failedTryHandler,
		failedReportHandler,
	} = transportOpts;
	const transformedPayload = payloadMiddleware(payload);

	send(transformedPayload, fetchOptions)
		.then(successHandler)
		.catch((error) => {
			if (attempt < retryCount && error instanceof TypeError) {
				failedTryHandler(error, sendReport, payload, transportOpts, attempt);
			} else {
				failedReportHandler(error, payload, transportOpts);
			}
		});
	return transformedPayload;
}

function getDefaultPayloadMiddleware(payload) {
	return {
		time: new Date(),
		...payload,
	};
}

const defaultHandlers = {
	success: (response) => { console.info('Logging: reported', response); },
	failedTry: function failedTry(error, payload, transportOpts, attempt) {
		setTimeout(() => {
			sendReport(payload, transportOpts, attempt + 1);
		}, transportOpts.retryTimeout);
		console.warn('Logging: Looks like logging host is unreachable, ' +
			`retrying in ${transportOpts.retryTimeout / 1000} seconds`);
	},
	failedReport: (error) => { console.error('Logging: unable to send reports', error); },
};

function getFetchPayload(payload, otherFetchOptions = {}) {
	return Object.assign({
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	}, {
		body: JSON.stringify({ '@message': payload }),
		...otherFetchOptions,
	});
}

function shouldBeOk(response) {
	if (!response.ok) {
		throw new Error(response);
	}
	return response;
}

function getDefault(url) {
	return (payload, fetchOptions = {}) => fetch(url, getFetchPayload(payload, fetchOptions))
		.then(shouldBeOk)
		.then(response => response.text());
}

export const getDefaultTransport = url => ({
	send: getDefault(url),
	successHandler: defaultHandlers.success,
	failedTryHandler: defaultHandlers.failedTry,
	failedReportHandler: defaultHandlers.failedReport,
	payloadMiddleware: getDefaultPayloadMiddleware,
	retryCount: 2,
	retryTimeout: 60 * 1000,
});
