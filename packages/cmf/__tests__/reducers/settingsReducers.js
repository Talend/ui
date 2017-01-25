import * as actions from '../../src/actions/settingsActions';
import reducer, { defaultState } from '../../src/reducers/settingsReducers';

describe('CMF settinsReducers', () => {
	it('should expose defaultState', () => {
		expect(defaultState).not.toBe(undefined);
		expect(typeof defaultState).toBe('object');
	});

	it('should expose one reducer as default', () => {
		expect(reducer).not.toBe(undefined);
		expect(typeof reducer).toBe('function');
	});

	it('should understand REQUEST_OK', () => {
		const action = {
			type: actions.REQUEST_OK,
			settings: {},
		};
		const state = reducer(undefined, action);
		expect(state).not.toBe(undefined);
		expect(state.initialized).toBe(true);
	});
});
