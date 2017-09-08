import { put, select } from 'redux-saga/effects';
import saga from './saga';

describe('saga', () => {
	it('should putActionCreator call put of a registred actionCreator', () => {
		const testAction = { type: 'TEST' };
		const actionCreator = jest.fn(() => testAction);
		const context = {
			registry: {
				'actionCreator:myActionCreator': actionCreator,
			},
		};
		const data = { foo: 'bar' };
		const event = { type: 'click', source: 'MyComponent' };
		const gen = saga.putActionCreator('myActionCreator', event, data, context);
		expect(gen.next().value).toEqual(select());
		const puttedAction = gen.next().value;
		expect(actionCreator).toHaveBeenCalled();
		expect(puttedAction).toEqual(put(testAction));
		expect(gen.next).toThrow();
	});
});
