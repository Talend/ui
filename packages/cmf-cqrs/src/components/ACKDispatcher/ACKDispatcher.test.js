import { fromJS, Map } from 'immutable';
import mock from 'react-cmf/lib/mock';

import Container, { DEFAULT_STATE } from './ACKDispatcher.container';
import Connected, {
	mapStateToProps,
} from './ACKDispatcher.connect';

describe('Container ACKDispatcher', () => {
	it('should render nothing', () => {
		const instance = new Container({ acks: fromJS({}) });
		expect(instance.render()).toBe(null);
	});
	it('should not update if ack has not changed', () => {
		const props = { acks: fromJS({}) };
		const instance = new Container(props);
		expect(instance.shouldComponentUpdate(props)).toBe(false);
		expect(instance.shouldComponentUpdate({ acks: fromJS({ 123: {} }) })).toBe(true);
	});
	it('should render call process acks', () => {
		const props = { acks: fromJS({}) };
		const instance = new Container(props);
		instance.processACK = jest.fn();
		instance.render();
		expect(instance.processACK).toHaveBeenCalled();
		expect(instance.processACK.mock.calls[0][0]).toBe();
	});
	it('should processACK call dispatch', () => {
		const props = { acks: new Map({
			123: new Map({
				actionCreator: 'actionCreator',
				data: { foo: 'bar' },
				received: true,
			}),
			456: new Map({
				actionCreator: 'actionCreatorBis',
				data: { foo: 'baz' },
			}),
		}) };
		const instance = new Container(props);
		instance.dispatch = jest.fn();
		instance.processACK();
		expect(instance.dispatch).toHaveBeenCalled();
		const calls = instance.dispatch.mock.calls;
		expect(calls.length).toBe(1);
		expect(calls[0]).toMatchSnapshot();
	});
	it('should dispatch call props.dispatch with action created', () => {
		const props = {
			dispatch: jest.fn(),
		};
		const context = mock.context();
		const mocked = jest.fn();
		function myActionCreator() {
			mocked();
			return {
				type: '__TEST__',
			};
		}
		context.registry['actionCreator:myActionCreator'] = myActionCreator;
		const instance = new Container(props, context);
		instance.dispatch('myActionCreator', { foo: 'bar' }, 123);
		expect(props.dispatch).toHaveBeenCalled();
		const calls = props.dispatch.mock.calls;
		const action = calls[0][0];
		expect(calls.length).toBe(1);
		expect(action).toMatchSnapshot();
	});
	it(`should dispatch call props.dispatch even when ack only when both received is true, and action exist
	meaning that we can receive ack before creation request is resolve`, () => {
		const props = { acks: new Map({
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
		}) };
		const instance = new Container(props);
		instance.dispatch = jest.fn();
		instance.processACK();
		expect(instance.dispatch).toHaveBeenCalled();
		const calls = instance.dispatch.mock.calls;
		expect(calls.length).toBe(1);
		expect(calls[0]).toMatchSnapshot();
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

