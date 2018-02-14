import { fork, take, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import registry from '../registry';
import { onSagaStart, handle } from './component';
import CONST from '../constant';

describe('sagas.component', () => {
	it('should onSagaStart fork action.saga and wait for unmount to cancel', () => {
		// given
		const testAction = { type: 'TEST', saga: 'my-saga' };
		function* saga() {}
		const reg = registry.getRegistry();
		reg['SAGA:my-saga'] = saga;
		const task = createMockTask();
		// when
		const gen = onSagaStart(testAction);

		// then
		expect(gen.next().value).toBe(fork(saga));
		expect(gen.next(task).value).toBe(take(`${CONST.WILL_UNMOUNT_SAGA_STOP}_${saga}`));
		expect(gen.next().value).toBe(cancel(task));
	});
});
