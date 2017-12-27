import { initErrorTransformer } from '../api/errorTransformer';
import reduxLoggerMiddleware from './redux-logger';

jest.useFakeTimers();

describe('Redux logger', () => {
	it('should log error', () => {
		// given
		const serverUrl = 'http://localhost:8888/error';
		const message = 'Error from redux';
		function failedNext() {
			throw new Error(message);
		}
		initErrorTransformer(serverUrl, {
			payloadMiddleware: payload => ({ appState: { my: 'state' }, ...payload }),
		});

		// when
		try {
			reduxLoggerMiddleware()(failedNext)();
		} catch (e) {
			jest.runAllTimers();
		}

		// then
		expect(fetch).toBeCalled();
		const fetchArgs = fetch.mock.calls[0];
		expect(fetchArgs[0]).toBe(serverUrl);
		expect(fetchArgs[1].headers).toEqual({ 'Content-Type': 'application/json' });
		expect(fetchArgs[1].method).toBe('POST');
		const body = JSON.parse(fetchArgs[1].body);
		expect(body.appState).toEqual({ my: 'state' });
		expect(body.message).toEqual(message);
	});
});
