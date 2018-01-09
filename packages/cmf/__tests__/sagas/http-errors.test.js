import SagaTester from 'redux-saga-tester';
import { takeLatest, put } from 'redux-saga/effects';
import getHttpErrorsSaga from '../../src/sagas/http-errors';

import { HTTP_STATUS, ACTION_TYPE_HTTP_ERRORS } from '../../src/middlewares/http/constants';

describe('#getHttpErrorsSaga', () => {
	it('should run the saga', () => {
		function* on401Saga() {
			yield put({
				type: '401',
			});
		}
		function* on403Saga() {
			yield put({
				type: '403',
			});
		}
		function* on404Saga() {
			yield put({
				type: '404',
			});
		}
		const sagaTester = new SagaTester({
			initialState: {},
		});

		sagaTester.start(
			getHttpErrorsSaga({
				on401: on401Saga,
				on403: on403Saga,
				on404: on404Saga,
			}),
		);

		sagaTester.dispatch({
			type: `${ACTION_TYPE_HTTP_ERRORS}/401`,
		});

		sagaTester.dispatch({
			type: `${ACTION_TYPE_HTTP_ERRORS}/403`,
		});

		sagaTester.dispatch({
			type: `${ACTION_TYPE_HTTP_ERRORS}/404`,
		});

		sagaTester.dispatch({
			type: 'other',
		});

		sagaTester.dispatch({
			type: `${ACTION_TYPE_HTTP_ERRORS}/404`,
		});

		expect(sagaTester.getCalledActions()).toEqual([
			{ type: '@@HTTP/ERRORS/401' },
			{ type: '401' },
			{ type: '@@HTTP/ERRORS/403' },
			{ type: '403' },
			{ type: '@@HTTP/ERRORS/404' },
			{ type: '404' },
			{ type: 'other' },
			{ type: '@@HTTP/ERRORS/404' },
			{ type: '404' },
		]);
	});
	it('should listens 401, 403, 404 errors', () => {
		function* on401() {
			yield;
		}
		function* on403() {
			yield;
		}
		function* on404() {
			yield;
		}
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

	it('should listens no events', () => {
		const generator = getHttpErrorsSaga()();

		expect(generator.next().value).toEqual([]);

		expect(generator.next()).toEqual({
			done: true,
			value: undefined,
		});
	});
});
