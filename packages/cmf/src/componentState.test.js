import { PropTypes } from 'react';
import Immutable, { Map, fromJS } from 'immutable';
import actions from './actions/';

import state, {
	getStateAccessors,
	getStateProps,
	initState,
	statePropTypes,
} from './componentState';

describe('state', () => {
	it('should default import have all the things', () => {
		expect(state.propTypes).toBe(statePropTypes);
		expect(state.init).toBe(initState);
		expect(state.getProps).toBe(getStateProps);
		expect(state.getAccessors).toBe(getStateAccessors);
	});

	it('should getStateAccessors should support no DEFAULT_STATE', () => {
		const dispatch = jest.fn();
		const props = getStateAccessors(dispatch, 'name', 'id');
		expect(typeof props.updateState).toBe('function');
		props.updateState();
		const call = dispatch.mock.calls[0][0];
		expect(call.type).toBe('REACT_CMF.COMPONENT_MERGE_STATE');
		expect(call.componentName).toBe('name');
		expect(call.key).toBe('id');
		expect(call.componentState).toBe();
	});
	it('should getStateAccessors return accessors', () => {
		const dispatch = jest.fn();
		const DEFAULT_STATE = new Map({ foo: 'bar' });
		const props = getStateAccessors(dispatch, 'name', 'id', DEFAULT_STATE);
		expect(typeof props.updateState).toBe('function');
		expect(typeof props.initState).toBe('function');

		props.initState();
		let call = dispatch.mock.calls[0][0];
		const addComp = actions.componentsActions.addComponentState('name', 'id', DEFAULT_STATE);
		expect(call.type).toBe(addComp.type);
		expect(call.componentName).toBe('name');
		expect(call.key).toBe('id');

		props.updateState({ foo: 'baz' });
		call = dispatch.mock.calls[1][0];
		const mergeComp = actions.componentsActions.mergeComponentState(
			'name', 'id', DEFAULT_STATE.set('foo', 'baz'),
		);
		expect(call.type).toBe(mergeComp.type);
		expect(call.componentName).toBe('name');
		expect(call.key).toBe('id');
		expect(call.componentState.foo).toBe('baz');
	});

	it('should getStateProps return state', () => {
		const storeState = {
			cmf: {
				components: Immutable.fromJS({
					foo: {
						bar: {
							open: true,
						},
					},
				}),
			},
		};
		const props = getStateProps(storeState, 'foo', 'bar');
		expect(props.state.get('open')).toBe(true);
	});

	it('should initState call props.initState with initialState', () => {
		const props = {
			initState: jest.fn(),
			state: undefined,
			initialState: undefined,
		};
		initState(props);
		expect(props.initState.mock.calls.length).toBe(1);
		expect(props.initState.mock.calls[0][0]).toBe();

		props.initialState = new Map({ foo: 'bar' });
		initState(props);
		expect(props.initState.mock.calls[1][0]).toBe(props.initialState);
	});

	it('should statePropTypes has all the things', () => {
		expect(typeof statePropTypes).toBe('object');
		expect(statePropTypes.state).toBe(PropTypes.object);
		expect(statePropTypes.initialState).toBe(PropTypes.object);
		expect(statePropTypes.updateState).toBe(PropTypes.func);
		expect(statePropTypes.initState).toBe(PropTypes.func);
	});
});
