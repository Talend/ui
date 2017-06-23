import { PropTypes } from 'react';
import Immutable, { fromJS, Map } from 'immutable';
import actions from '../src/actions/';

import state, {
	getStateAccessors,
	getStateProps,
	initState,
	statePropTypes,
	applyCallback,
} from '../src/componentState';

describe('state', () => {
	it('should default import have all the things', () => {
		expect(state.propTypes).toBe(statePropTypes);
		expect(state.init).toBe(initState);
		expect(state.getProps).toBe(getStateProps);
		expect(state.getAccessors).toBe(getStateAccessors);
	});

	it('should getStateAccessors should support no DEFAULT_STATE', () => {
		const dispatch = jest.fn();
		const props = getStateAccessors(dispatch, 'name', 'id', new Map());
		expect(typeof props.setState).toBe('function');
		props.setState();
		const call = dispatch.mock.calls[0][0];
		expect(call).toMatchSnapshot();
	});
	it('should getStateAccessors return accessors', () => {
		const dispatch = jest.fn();
		const DEFAULT_STATE = new Map({ foo: 'bar' });
		const props = getStateAccessors(dispatch, 'name', 'id', DEFAULT_STATE);
		expect(typeof props.setState).toBe('function');
		expect(typeof props.initState).toBe('function');
		expect(typeof props.deleteState).toBe('function');

		props.initState();
		let call = dispatch.mock.calls[0][0];
		const addComp = actions.componentsActions.addComponentState('name', 'id', DEFAULT_STATE);
		expect(call).toMatchSnapshot();

		props.setState({ foo: 'baz' });
		call = dispatch.mock.calls[1][0];
		expect(call).toMatchSnapshot();

		props.deleteState();
		call = dispatch.mock.calls[2][0];
		expect(call).toMatchSnapshot();
	});

	it(`should call state if state is a function,
		via applyCallback`, () => {
		const dispatch = jest.fn();
		const callBack = jest.fn();
		const DEFAULT_STATE = new Map({ foo: 'bar' });
		const props = getStateAccessors(dispatch, 'name', 'id', DEFAULT_STATE);

		props.setState(callBack);
		const call = dispatch.mock.calls[0][0];
		expect(typeof call === 'function').toEqual(true);
	});

	it('should applyCallback dispatch mergeComponentState', () => {
		const callback = jest.fn(() => ({ compState: false }));
		const dispatch = jest.fn();
		const getState = jest.fn(() => ({
			cmf: {
				components: new Map({
					MySuperComponent: new Map({
						id: { compState: true },
					}),
				}),
			},
		}));
		applyCallback(callback, 'MySuperComponent', 'id')(dispatch, getState);
		expect(callback.mock.calls[0][0]).toEqual({
			state: {
				compState: true,
			},
		});
		const action = dispatch.mock.calls[0][0];
		expect(action).toMatchSnapshot();
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
		expect(statePropTypes.setState).toBe(PropTypes.func);
		expect(statePropTypes.initState).toBe(PropTypes.func);
	});
});
