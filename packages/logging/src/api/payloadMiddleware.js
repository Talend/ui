export default function getStatePayloadMiddleware(getState) {
	return function payloadMiddleware(payload) {
		return {
			time: new Date(),
			appState: getState(),
			userAgent: navigator.userAgent,
			...payload,
		};
	};
}
