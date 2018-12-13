import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import createStatePatchLogger, { isWebSocketAbsoluteUrl } from './socketMiddleware';
import smartWebsocket from './smartWebsocket';

jest.mock('./smartWebsocket', () => (
	jest.fn(() => ({ send: jest.fn() }))
));

const mockStore = configureStore([createStatePatchLogger([], [])]);

const state = {
	path: {},
	test: new Map({
		in: {},
		out: {},
		parents: {},
		childrens: {},
		nodes: new Map(),
		transforms: {},
		nodeTypes: {},
	}),
	routing: {
		locationBeforeTransitions: {
			pathname: '/datastream-designer/50/',
		},
	},
};

describe('hasWebSocketProtocol', () => {
	it('should return true for Web Socket url', () => {
		expect(isWebSocketAbsoluteUrl('ws://provider/api/v1/ws/relay')).toBeTruthy();
	});

	it('should return true for Web Socket Security url', () => {
		expect(isWebSocketAbsoluteUrl('wss://provider/api/v1/ws/relay')).toBeTruthy();
	});

	it('should return false for simple path', () => {
		expect(isWebSocketAbsoluteUrl('/api/v1/ws/relay')).toBeFalsy();
	});
});

describe('pathToServer', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should call smartWebsocket on FLOWDESIGNER.CONNECT command', () => {
		const store = mockStore(state);
		store.dispatch({ type: 'FLOWDESIGNER.CONNECT' });
		expect(smartWebsocket).toHaveBeenCalledTimes(1);
	});
	// FIXME
	// https://github.com/facebook/jest/issues/2116
	xit('should ask the ws module to send a patch', () => {
		let call = 0;
		const getState = jest.fn(() => {
			if (call === 0) {
				call = 1;
				return state;
			}
			return Object.assign({}, state, { test: state.test.setIn(['nodes', 'test'], 'test') });
		});
		const dispatch = jest.fn();
		const middleware = createStatePatchLogger('test', []);
		middleware({ getState, dispatch })(() => {})({ type: 'FLOWDESIGNER.CONNECT' });
		middleware({ getState, dispatch })(() => {})({ type: 'test' });
		expect(send).toHaveBeenCalledTimes(1);
		expect(send.mock.calls).toMatchSnapshot();
	});
});
