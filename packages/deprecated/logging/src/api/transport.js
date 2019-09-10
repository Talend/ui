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
		.catch(errorResponse => {
			if (attempt < retryCount) {
				failedTryHandler(errorResponse, sendReport, payload, transportOpts, attempt);
			} else {
				failedReportHandler(errorResponse, payload, transportOpts);
			}
		});
	return transformedPayload;
}

const defaultHandlers = {
	failedTry: function failedTry(error, report, payload, transportOpts, attempt) {
		setTimeout(() => {
			report(payload, transportOpts, attempt + 1);
		}, transportOpts.retryTimeout);
		console.warn(
			'Logging: Looks like logging host is unreachable, ' +
				`retrying in ${transportOpts.retryTimeout / 1000} seconds`,
		);
	},
	failedReport: error => {
		console.error('Logging: unable to send reports', error);
	},
};

function getFetchPayload(payload, otherFetchOptions = {}) {
	return Object.assign(
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		},
		{
			body: JSON.stringify(payload),
			...otherFetchOptions,
		},
	);
}

function shouldBeOk(response) {
	if (!response.ok) {
		throw new Error(response);
	}
	return response;
}

function getDefault(url) {
	return (payload, fetchOptions = {}) =>
		fetch(url, getFetchPayload(payload, fetchOptions))
			.then(shouldBeOk)
			.then(response => response.text());
}

export const getDefaultTransport = url => ({
	send: getDefault(url),
	failedTryHandler: defaultHandlers.failedTry,
	failedReportHandler: defaultHandlers.failedReport,
	payloadMiddleware: payload => payload,
	retryCount: 2,
	retryTimeout: 60 * 1000,
});
