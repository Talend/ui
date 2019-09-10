import React from 'react';
import { mount } from 'enzyme';
import initReactLogger from './react-logger';

jest.useFakeTimers();

describe('React logger', () => {
	it('should log error', () => {
		// given
		const serverUrl = 'http://localhost:8888/error';
		const message = 'Error from React render';
		initReactLogger({
			serverUrl,
			getState: () => ({ my: 'state' }),
			processState: state => ({ myState: state, additionalInfo: 'lol' }),
		});
		function FailureComponent() {
			throw new Error(message);
		}
		expect(fetch).not.toBeCalled();

		// when
		try {
			mount(<FailureComponent />);
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
		expect(body.time).toBeDefined();
		expect(body.appState).toEqual({ myState: { my: 'state' }, additionalInfo: 'lol' });
		expect(body.message).toEqual(message);
	});
});
