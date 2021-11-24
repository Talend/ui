import reducers from '../../src/reducers';
import CONST from '../../src/constant';

describe('check reducers are combined', () => {
	it('should expose one reducer', () => {
		expect(typeof reducers).toEqual('function');
	});
	it('should support CMF ERROR', () => {
		const action = {
			type: CONST.ERROR,
			error: {
				name: 'Error',
				message: 'test',
			},
		};
		const state = reducers(undefined, action);
		expect(state.errors.length).toBe(1);
		expect(state.errors[0]).toBe(action.error);
	});
});
