import { Map } from 'immutable';
import { render } from '@testing-library/react';
import { mock } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './ACKDispatcher.container';
import Connected, { mapStateToProps } from './ACKDispatcher.connect';
const CMFProvider = mock.Provider;

describe('Container ACKDispatcher', () => {
	const dispatch = jest.fn();
	beforeEach(() => {
		jest.resetAllMocks();
		// mockProcessACK = jest.spyOn(Container.prototype, 'processACK');
		// mockDispatchAndUpdateAck = jest.spyOn(Container.prototype, 'dispatchAndUpdateAck');
	});

	afterEach(() => {
		// mockProcessACK.mockRestore();
		// mockDispatchAndUpdateAck.mockRestore();
	});

	it('should render nothing', () => {
		const { container } = render(
			<CMFProvider>
				<Container acks={Map()} dispatch={dispatch} />
			</CMFProvider>,
		);
		expect(container.firstChild).toBeEmptyDOMElement();
	});
	it('should processACK call dispatch', () => {
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
		render(
			<CMFProvider registry={registry}>
				<Container acks={acks} dispatch={dispatch} />
			</CMFProvider>,
		);
		expect(mocked).toHaveBeenCalledTimes(1);
		expect(dispatch).toHaveBeenCalledWith({
			ack: { requestId: '123', type: 'ACK_DELETE' },
			type: '__TEST__',
		});
	});
	it('should dispatch call props.dispatch with action created', () => {
		const mocked = jest.fn();

		function myActionCreator() {
			mocked();
			return {
				type: '__TEST__',
			};
		}

		const registry = mock.store.registry();
		registry['actionCreator:myActionCreator'] = myActionCreator;
		const { rerender } = render(
			<CMFProvider registry={registry}>
				<Container dispatch={dispatch} acks={Map()} />
			</CMFProvider>,
		);
		rerender(
			<CMFProvider registry={registry}>
				<Container
					dispatch={dispatch}
					acks={Map({ id1: Map({ actionCreator: 'myActionCreator', received: true }) })}
				/>
			</CMFProvider>,
		);
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
		render(
			<CMFProvider registry={registry}>
				<Container dispatch={dispatch} acks={acks} />
			</CMFProvider>,
		);
		expect(dispatch).toHaveBeenCalledWith({
			ack: { requestId: '123', type: 'ACK_DELETE' },
			type: '__TEST__',
		});
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
