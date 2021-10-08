import { Map, fromJS } from 'immutable';
import ackReducer, { ackProcessed } from './ack';
import { addContext, receiveMessage, deleteACK } from '../actions/ack';

describe('reducers.ack.ackReducer', () => {
	it('should reduce addContext', () => {
		const state = ackReducer(undefined, addContext(null, {
			requestId: '123',
			data: { foo: 'bar' },
			actionCreator: 'my super action creator',
		}));
		expect(state).toMatchSnapshot();
	});
	it('should reduce receiveMessage', () => {
		const state = ackReducer(fromJS({
			123: { foo: 'bar' },
			456: { foo: 'bar' },
		}), receiveMessage(null, {
			requestId: '123',
		}));
		expect(state).toMatchSnapshot();
	});
	it('should reduce deleteACK', () => {
		const state = ackReducer(fromJS({
			123: { foo: 'bar' },
			456: { foo: 'bar' },
		}), deleteACK(null, {
			requestId: '123',
		}));
		expect(state).toMatchSnapshot();
	});

	it('should return default state', () => {
		const state = ackReducer(undefined, { type: 'notsupported' });
		expect(Map.isMap(state)).toBe(true);
	});

	it('should return input state on non supported action', () => {
		const state = new Map();
		const newState = ackReducer(state, { type: 'notsupported' });
		expect(state).toBe(newState);
	});
});

describe('reducers.ackProcessed higher order reducer', () => {
	it('should return state on not supported action', () => {
		const state = {};
		const newState = ackProcessed(state, { type: 'notsupported' });
		expect(newState).toBe(state);
	});
	it('should reduce addContext', () => {
		const state = ackProcessed({}, { ack: addContext(null, {
			requestId: '123',
			data: { foo: 'bar' },
			actionCreator: 'my super action creator',
		}) });
		expect(state).toMatchSnapshot();
	});
	it('should reduce receiveMessage', () => {
		const state = ackProcessed({ ack: fromJS({
			123: { foo: 'bar' },
			456: { foo: 'bar' },
		}) }, { ack: receiveMessage(null, {
			requestId: '123',
		}) });
		expect(state).toMatchSnapshot();
	});
	it('should reduce deleteACK', () => {
		const state = ackProcessed({ ack: fromJS({
			123: { foo: 'bar' },
			456: { foo: 'bar' },
		}) }, { ack: deleteACK(null, {
			requestId: '123',
		}) });
		expect(state).toMatchSnapshot();
	});

	it('should return state on not supported action', () => {
		const state = {};
		const newState = ackProcessed(state, { type: 'notsupported' });
		expect(newState).toBe(state);
	});
});
