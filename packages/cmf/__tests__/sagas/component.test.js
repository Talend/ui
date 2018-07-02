import { fork, take, takeEvery, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import registry from '../../src/registry';
import { onSagaStart, handle } from '../../src/sagas/component';
import CONST from '../../src/constant';

describe('sagas.component', () => {
	it('should ignore the saga until that the action has the same componentId', () => {
		// given
		const testAction = { type: 'TEST', saga: 'my-saga', event: { componentId: 42 } };
		function* saga() {}
		const reg = registry.getRegistry();
		reg['SAGA:my-saga'] = saga;
		const task = createMockTask();
		// when
		const gen = onSagaStart(testAction);

		// then
		expect(gen.next().value).toEqual(fork(saga, undefined));
		expect(gen.next(task).value).toEqual(take(`${CONST.WILL_UNMOUNT_SAGA_STOP}_my-saga`));
		expect(gen.next({ event: { componentId: 41 } }).value).toEqual(
			take(`${CONST.WILL_UNMOUNT_SAGA_STOP}_my-saga`),
		);
		expect(gen.next({ event: { componentId: 42 } }).value).toEqual(cancel(task));
	});

	it('should cancel the task with the same componentId', () => {
		// given
		const testAction = { type: 'TEST', saga: 'my-saga', event: { componentId: 42 } };
		function* saga() {}
		const reg = registry.getRegistry();
		reg['SAGA:my-saga'] = saga;
		const task = createMockTask();
		// when
		const gen = onSagaStart(testAction);

		// then
		expect(gen.next().value).toEqual(fork(saga, undefined));
		expect(gen.next(task).value).toEqual(take(`${CONST.WILL_UNMOUNT_SAGA_STOP}_my-saga`));
		expect(gen.next({ event: { componentId: 42 } }).value).toEqual(cancel(task));
	});

	it('should onSagaStart forks action.saga with params and waits for unmount cancelling*', () => {
		// given
		const testAction = {
			type: 'TEST',
			saga: 'my-saga',
			props: { myProps: 'MyProps' },
			event: { componentId: 42 },
		};
		function* saga() {}
		const reg = registry.getRegistry();
		reg['SAGA:my-saga'] = saga;
		const task = createMockTask();
		// when
		const gen = onSagaStart(testAction);

		// then
		expect(gen.next().value).toEqual(fork(saga, { myProps: 'MyProps' }));
		expect(gen.next(task).value).toEqual(take(`${CONST.WILL_UNMOUNT_SAGA_STOP}_my-saga`));
		expect(gen.next({ event: { componentId: 42 } }).value).toEqual(cancel(task));
	});

	it('should handle takeEvery didmount', () => {
		// given
		const gen = handle();
		const didMountAction = { type: CONST.DID_MOUNT_SAGA_START };

		// then
		expect(gen.next(didMountAction).value).toEqual(
			takeEvery(CONST.DID_MOUNT_SAGA_START, onSagaStart),
		);
	});
});
