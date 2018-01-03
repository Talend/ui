import angular from 'angular';
import 'angular-mocks';
import angularLogger from './angular-logger';

jest.useFakeTimers();

const serverUrl = 'http://localhost:8888/error';
const message = 'Error from angularApp';
angular
	.module('angular-logger.test', [angularLogger])
	.run(talendLoggerConfiguration => {
		talendLoggerConfiguration.init({
			serverUrl,
			getState: () => ({ my: 'state' }),
			processState: state => ({ myState: state, additionalInfo: 'lol' }),
		});
	})
	.controller('FailCtrl', [
		'$exceptionHandler',
		$exceptionHandler => {
			try {
				$exceptionHandler(new Error(message));
			} catch (e) {}
		},
	]);

describe('Angular logger', () => {
	beforeEach(angular.mock.module('angular-logger.test'));

	it(
		'should log error',
		angular.mock.inject($controller => {
			// when
			$controller('FailCtrl');
			jest.runAllTimers();

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
		}),
	);
});
