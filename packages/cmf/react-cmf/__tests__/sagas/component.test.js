import { spawn, takeEvery, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import registry from '../../src/registry';
import { onSagaStart, handle } from '../../src/sagas/component';
import CONST from '../../src/constant';

describe('sagas.component', () => {
	it('should cancel one saga ', () => {
		// given
		const testAction = {
			type: 'TEST',
			saga: 'my-saga',
			componentId: 'myComponent',
			event: { componentId: 42 },
		};
		function saga() {}
		const reg = registry.getRegistry();
		reg['SAGA:my-saga'] = saga;
		const task = createMockTask();
		// when
		const gen = onSagaStart(testAction);

		// then
		expect(gen.next().value).toEqual(spawn(saga, { componentId: 'myComponent' }));
		const next = gen.next(task).value;
		expect(next.TAKE).toBeDefined();
		expect(
			next.TAKE.pattern({
				type: `${CONST.WILL_UNMOUNT_SAGA_STOP}_my-saga`,
				event: {
					componentId: 41,
				},
			}),
		).toBeFalsy();
		expect(
			next.TAKE.pattern({
				type: `${CONST.WILL_UNMOUNT_SAGA_STOP}_my-saga2`,
				event: {
					componentId: 42,
				},
			}),
		).toBeFalsy();
		expect(
			next.TAKE.pattern({
				type: `${CONST.WILL_UNMOUNT_SAGA_STOP}_my-saga`,
				event: {
					componentId: 42,
				},
			}),
		).toBeTruthy();
		expect(gen.next().value).toEqual(cancel(task));
		expect(gen.next().done).toBe(true);
	});

	it('should onSagaStart spawns action.saga with params and waits for unmount cancelling*', () => {
		// given
		const testAction = {
			type: 'TEST',
			saga: 'my-saga',
			componentId: 'myComponent',
			event: { componentId: 42 },
		};
		function* saga() {}
		const reg = registry.getRegistry();
		reg['SAGA:my-saga'] = saga;
		const task = createMockTask();
		// when
		const gen = onSagaStart(testAction);

		// then
		expect(gen.next().value).toEqual(spawn(saga, { componentId: 'myComponent' }));
		const next = gen.next(task).value;
		expect(next.TAKE).toBeDefined();
		expect(gen.next({ event: { componentId: 42 } }).value).toEqual(cancel(task));
	});

	it('should onSagaStart support action.saga as object', () => {
		// given
		const testAction = {
			type: 'TEST',
			saga: {
				id: 'my-saga',
				args: ['foo', { bar: true }],
			},
			componentId: 'myComponent',
			event: { componentId: 42 },
		};
		function* saga() {}
		const reg = registry.getRegistry();
		reg['SAGA:my-saga'] = saga;

		// when
		const gen = onSagaStart(testAction);

		// then
		expect(gen.next().value).toEqual(
			spawn(saga, { componentId: 'myComponent' }, 'foo', { bar: true }),
		);
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
