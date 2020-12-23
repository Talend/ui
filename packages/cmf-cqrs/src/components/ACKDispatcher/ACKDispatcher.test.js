import React from 'react';
import { Map } from 'immutable';
import { shallow, mount } from 'enzyme';
import { mock } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './ACKDispatcher.container';
import Connected, { mapStateToProps } from './ACKDispatcher.connect';

describe('Container ACKDispatcher', () => {
	let mockProcessACK;
	let mockDispatchAndUpdateAck;

	beforeEach(() => {
		mockProcessACK = jest.spyOn(Container.prototype, 'processACK');
		mockDispatchAndUpdateAck = jest.spyOn(Container.prototype, 'dispatchAndUpdateAck');
	});

	afterEach(() => {
		mockProcessACK.mockRestore();
		mockDispatchAndUpdateAck.mockRestore();
	});

	it('should render nothing', () => {
		const instance = new Container({ acks: Map() });
		expect(instance.render()).toBe(null);
	});
	it('should not update if ack has not changed', () => {
		const props = { acks: Map() };
		const instance = new Container(props);
		expect(instance.shouldComponentUpdate(props)).toBe(false);
		expect(instance.shouldComponentUpdate({ acks: Map({ 123: {} }) })).toBe(true);
	});
	it('should render call process acks', () => {
		const registry = mock.store.registry();
		const mocked = jest.fn();

		function myActionCreator() {
			mocked();
			return {
				type: '__TEST__',
			};
		}

		registry['actionCreator:myActionCreator'] = myActionCreator;
		mount(<Container acks={Map()} />, mock.Provider.getEnzymeOption({ registry}));
		expect(mockProcessACK).toHaveBeenCalled();
	});
	it('should processACK call dispatch', () => {
		const dispatch = jest.fn();
		const acks = Map({
			123: new Map({
				actionCreator: 'actionCreator',
				data: { foo: 'bar' },
				received: true,
			}),
			456: new Map({
				actionCreator: 'actionCreatorBis',
				data: { foo: 'baz' },
			}),
		});
		const registry = mock.store.registry();
		const mocked = jest.fn();

		function myActionCreator() {
			mocked();
			return {
				type: '__TEST__',
			};
		}

		registry['actionCreator:actionCreator'] = myActionCreator;
		registry['actionCreator:actionCreatorBis'] = myActionCreator;
		mount(<Container acks={acks} dispatch={dispatch} />, { context: { registry } });
		expect(mockDispatchAndUpdateAck).toHaveBeenCalled();
		const calls = mockDispatchAndUpdateAck.mock.calls;
		expect(calls.length).toBe(1);
		expect(calls[0]).toEqual(['actionCreator', { foo: 'bar' }, '123']);
	});
	it('should dispatch call props.dispatch with action created', () => {
		const dispatch = jest.fn();
		const mocked = jest.fn();

		function myActionCreator() {
			mocked();
			return {
				type: '__TEST__',
			};
		}

		const registry = mock.store.registry();
		registry['actionCreator:myActionCreator'] = myActionCreator;
		const wrapper = shallow(<Container dispatch={dispatch} acks={Map()} />, {
			context: { registry },
		});
		wrapper.setProps({
			acks: Map({ id1: Map({ actionCreator: 'myActionCreator', received: true }) }),
		});
		expect(dispatch).toHaveBeenCalled();
		const calls = dispatch.mock.calls;
		const action = calls[0][0];
		expect(calls.length).toBe(1);
		expect(action).toEqual({
			ack: {
				requestId: 'id1',
				type: 'ACK_DELETE',
			},
			type: '__TEST__',
		});
	});
	it(`should dispatch call props.dispatch even when ack only when both received is true, and action exist
	meaning that we can receive ack before creation request is resolve`, () => {
		const dispatch = jest.fn();
		const acks = Map({
			42: new Map({
				received: true,
			}),
			123: new Map({
				actionCreator: 'actionCreator',
				data: { foo: 'bar' },
				received: true,
			}),
			456: new Map({
				actionCreator: 'actionCreatorBis',
				data: { foo: 'baz' },
			}),
		});
		const registry = mock.store.registry();
		const mocked = jest.fn();

		function myActionCreator() {
			mocked();
			return {
				type: '__TEST__',
			};
		}

		registry['actionCreator:actionCreator'] = myActionCreator;
		registry['actionCreator:actionCreatorBis'] = myActionCreator;
		mount(<Container dispatch={dispatch} acks={acks} />, { context: { registry } });
		expect(mockDispatchAndUpdateAck).toHaveBeenCalled();
		const calls = mockDispatchAndUpdateAck.mock.calls;
		expect(calls.length).toBe(1);
		expect(calls[0]).toEqual(['actionCreator', { foo: 'bar' }, '123']);
	});
});

describe('Connected ACKDispatcher', () => {
	it('should connect ACKDispatcher', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should mapStateToProps', () => {
		const state = {
			cmf: {
				components: new Map({
					ACKDispatcher: {
						ACKDispatcher: DEFAULT_STATE.toJS(),
					},
				}),
			},
			ack: new Map({
				123: new Map({
					actionCreator: 'test',
					data: { foo: 'bar' },
					received: true,
				}),
			}),
		};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
		expect(props).toMatchSnapshot();
	});
});
