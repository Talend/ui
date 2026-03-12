import configureStore from 'redux-mock-store';
import createStatePatchLogger, { isAbsoluteWebSocketUrl } from './socketMiddleware';
import smartWebsocket from './smartWebsocket';

const { smartWebsocketMock } = vi.hoisted(() => ({
	smartWebsocketMock: vi.fn(function SmartWebsocketMock() {
		return { send: vi.fn() };
	}),
}));

vi.mock('./smartWebsocket', () => ({
	default: smartWebsocketMock,
}));

const mockStore = configureStore([createStatePatchLogger([], [])]);

const state = {
	path: {},
	test: {
		in: {},
		out: {},
		parents: {},
		childrens: {},
		nodes: {},
		transforms: {},
		nodeTypes: {},
	},
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
		vi.resetAllMocks();
	});

	it('should call smartWebsocket on FLOWDESIGNER.CONNECT command', () => {
		const store = mockStore(state);
		store.dispatch({ type: 'FLOWDESIGNER.CONNECT' });
		expect(smartWebsocket).toHaveBeenCalledTimes(1);
	});

	it('should ask the ws module to send a patch', () => {
		let call = 0;
		const getState = vi.fn(() => {
			if (call === 0) {
				call = 1;
				return state;
			}
			return { ...state, test: { ...state.test, nodes: { ...state.test.nodes, test: 'test' } } };
		});
		const dispatch = vi.fn();
		const middleware = createStatePatchLogger('test', []);
		middleware({ getState, dispatch })(() => {})({ type: 'FLOWDESIGNER.CONNECT' });
		middleware({ getState, dispatch })(() => {})({ type: 'test' });
		expect(smartWebsocket).toHaveBeenCalledTimes(1);
		expect(smartWebsocket.mock.calls).toMatchSnapshot();
	});
});
