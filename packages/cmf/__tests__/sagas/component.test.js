import { fork, take, takeEvery, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import registry from '../../src/registry';
import { onSagaStart, handle } from '../../src/sagas/component';
import CONST from '../../src/constant';

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
		expect(gen.next().value).toEqual(fork(saga));
		expect(gen.next(task).value).toEqual(take(`${CONST.WILL_UNMOUNT_SAGA_STOP}_my-saga`));
		expect(gen.next().value).toEqual(cancel(task));
	});
	it('should handle takeEvery didmount', () => {
		// given
		const gen = handle();
		const didMountAction = { type: CONST.DID_MOUNT_SAGA_START };

		// then
		expect(gen.next(didMountAction).value).toEqual(
			takeEvery(CONST.DID_MOUNT_SAGA_START, onSagaStart)
		);
	});
});
