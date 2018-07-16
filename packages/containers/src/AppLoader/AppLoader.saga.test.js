import api from '@talend/react-cmf';
import registry from '@talend/react-cmf/lib/registry';
import { call, all, take } from 'redux-saga/effects';
import {
	appLoaderSaga,
	handleStep,
	ACTION_CREATORS,
	TAKE_ACTION,
	WAIT_FOR,
	SAGAS,
	waitFor,
} from './AppLoader.saga';

describe('AppLoader saga', () => {
	describe('appLoaderSaga', () => {
		it('should call handleStep on all steps', () => {
			// given
			const steps = [
				{ [ACTION_CREATORS]: ['ac1'] },
				{ [WAIT_FOR]: ['store1'] },
				{ [ACTION_CREATORS]: ['ac2'] },
			];

			// when
			const gen = appLoaderSaga({ steps });
			// then
			expect(gen.next().value).toEqual(call(handleStep, steps[0]));
			expect(gen.next().value).toEqual(call(handleStep, steps[1]));
			expect(gen.next().value).toEqual(call(handleStep, steps[2]));
			expect(gen.next().value).toBeUndefined();
		});
	});

	describe('handleStep', () => {
		it('should handle an actionCreators step', () => {
			// given
			const testAction1 = { type: 'TEST1' };
			const actionCreator1 = jest.fn(() => testAction1);
			const testAction2 = { type: 'TEST2' };
			const actionCreator2 = jest.fn(() => testAction2);
			const step = { [ACTION_CREATORS]: ['ac1', 'ac2'] };
			const reg = registry.getRegistry();
			reg['actionCreator:ac1'] = actionCreator1;
			reg['actionCreator:ac2'] = actionCreator2;
			// when
			const gen = handleStep(step);
			// then
			expect(gen.next().value).toEqual(
				all([api.sagas.putActionCreator('ac1'), api.sagas.putActionCreator('ac2')]),
			);
		});

		it('should handle an waitFor step', () => {
			// given
			const step = { [WAIT_FOR]: ['store1', 'store2'] };
			// when
			const gen = handleStep(step);
			// then
			expect(gen.next().value).toEqual(all([call(waitFor, 'store1'), call(waitFor, 'store2')]));
		});

		it('should handle an takeAction step', () => {
			// given
			const step = { [TAKE_ACTION]: ['action1', 'action2'] };
			// when
			const gen = handleStep(step);
			// then
			expect(gen.next().value).toEqual(all([take('action1'), take('action2')]));
		});

		it('should handle an saga step', () => {
			// given
			const reg = registry.getRegistry();
			const saga = () => 'ok';
			reg['SAGA:saga1'] = saga;
			const step = { [SAGAS]: ['saga1'] };
			// when
			const gen = handleStep(step);
			// then
			expect(gen.next().value).toEqual(all([call(api.sagas.get('saga1'))]));
		});
	});
});
