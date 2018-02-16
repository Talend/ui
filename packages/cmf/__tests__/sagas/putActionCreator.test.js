import { put, select } from 'redux-saga/effects';
import registry from '../../src/registry';
import putActionCreator from '../../src/sagas/putActionCreator';

describe('saga', () => {
	it('should putActionCreator call put of a registred actionCreator without context', () => {
		// given
		const testAction = { type: 'TEST' };
		const actionCreator = jest.fn(() => testAction);
		const reg = registry.getRegistry();
		reg['actionCreator:myActionCreator'] = actionCreator;
		const data = { foo: 'bar' };
		const event = { type: 'click', source: 'MyComponent' };

		// when
		const gen = putActionCreator('myActionCreator', event, data);

		// then
		expect(gen.next().value).toEqual(select());
		const puttedAction = gen.next().value;
		expect(actionCreator).toHaveBeenCalled();
		const args = actionCreator.mock.calls[0];
		expect(args[0]).toBe(event);
		expect(args[1]).toBe(data);
		expect(args[2].registry).toBe(reg);
		expect(typeof args[2].store.getState).toBe('function');
		expect(args[2].store.getState()).toBeUndefined();
		expect(puttedAction).toEqual(put(testAction));
		expect(gen.next).toThrow();
	});
	it('should putActionCreator call put of a registred actionCreator or using context', () => {
		// given
		const testAction = { type: 'TEST' };
		const actionCreator = jest.fn(() => testAction);
		const context = {
			registry: {
				'actionCreator:myActionCreator': actionCreator,
			},
		};
		const data = { foo: 'bar' };
		const event = { type: 'click', source: 'MyComponent' };

		// when
		const gen = putActionCreator('myActionCreator', event, data, context);

		// then
		expect(gen.next().value).toEqual(select());
		const puttedAction = gen.next().value;
		expect(actionCreator).toHaveBeenCalled();
		const args = actionCreator.mock.calls[0];
		expect(args[0]).toBe(event);
		expect(args[1]).toBe(data);
		expect(args[2]).toBe(context);
		expect(puttedAction).toEqual(put(testAction));
		expect(gen.next).toThrow();
	});
});
