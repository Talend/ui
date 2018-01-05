import { takeLatest } from 'redux-saga/effects';
import getHttpErrorsSaga from '../../src/sagas/http-errors';

import { HTTP_STATUS, ACTION_TYPE_HTTP_ERRORS } from '../../src/middlewares/http/constants';

describe('#getHttpErrorsSaga', () => {
	it('should listens 401, 403, 404 errors', () => {
		const on401 = function* on401() {
			yield;
		};
		const on403 = function* on403() {
			yield;
		};
		const on404 = function* on404() {
			yield;
		};
		const generator = getHttpErrorsSaga({
			on401,
			on403,
			on404,
		})();

		expect(generator.next().value).toEqual([
			takeLatest(`${ACTION_TYPE_HTTP_ERRORS}/${HTTP_STATUS.UNAUTHORIZED}`, on401),
			takeLatest(`${ACTION_TYPE_HTTP_ERRORS}/${HTTP_STATUS.FORBIDDEN}`, on403),
			takeLatest(`${ACTION_TYPE_HTTP_ERRORS}/${HTTP_STATUS.NOT_FOUND}`, on404),
		]);

		expect(generator.next()).toEqual({
			done: true,
			value: undefined,
		});
	});

	it('should listens no errors', () => {
		const generator = getHttpErrorsSaga()();

		expect(generator.next().value).toEqual([]);

		expect(generator.next()).toEqual({
			done: true,
			value: undefined,
		});
	});
});
