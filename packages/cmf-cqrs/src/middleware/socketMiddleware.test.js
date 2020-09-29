import configureStore from 'redux-mock-store';
import { Map } from 'immutable';
import createStatePatchLogger, { isAbsoluteWebSocketUrl } from './socketMiddleware';
import smartWebsocket from './smartWebsocket';

jest.mock('./smartWebsocket', () => jest.fn(() => ({ send: jest.fn() })));

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
		expect(isAbsoluteWebSocketUrl('ws://provider/api/v1/ws/relay')).toBe(true);
	});

	it('should return true for Web Socket Security url', () => {
		expect(isAbsoluteWebSocketUrl('wss://provider/api/v1/ws/relay')).toBe(true);
	});

	it('should return false for simple path', () => {
		expect(isAbsoluteWebSocketUrl('/api/v1/ws/relay')).toBe(false);
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

	it('should ask the ws module to send a patch', () => {
		let call = 0;
		const getState = jest.fn(() => {
			if (call === 0) {
				call = 1;
				return state;
			}
			return { ...state, test: state.test.setIn(['nodes', 'test'], 'test') };
		});
		const dispatch = jest.fn();
		const middleware = createStatePatchLogger('test', []);
		middleware({ getState, dispatch })(() => {})({ type: 'FLOWDESIGNER.CONNECT' });
		middleware({ getState, dispatch })(() => {})({ type: 'test' });
		expect(smartWebsocket).toHaveBeenCalledTimes(1);
		expect(smartWebsocket.mock.calls).toMatchSnapshot();
	});
});
