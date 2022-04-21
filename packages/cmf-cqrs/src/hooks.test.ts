import { renderHook, act } from '@testing-library/react-hooks';

import { useWebSocket } from './hooks';
import { addWebsocketToRegistry, removeWebSocketFromRegistry } from './registry';

const messageEvent1 = {
	data: '{"messageType": "unit test", "value": "test"}',
	isTrusted: false,
} as MessageEvent<string>;
const messageEvent2 = {
	data: '{"messageType": "unit test 2", "value": "test 2"}',
	isTrusted: false,
} as MessageEvent<string>;

describe('hooks', () => {
	let mockedWebSocket: any;
	let addEventListener: any;
	let removeEventListener: any;
	let send: any;
	let eventListener: any;

	beforeEach(() => {
		removeEventListener = jest.fn();
		addEventListener = (event: string, cb: Function) => {
			eventListener = cb;
		};
		send = jest.fn();

		mockedWebSocket = {
			removeEventListener,
			addEventListener,
			send,
			readyState: 1,
		};
		addWebsocketToRegistry(mockedWebSocket);
	});

	afterEach(() => {
		removeWebSocketFromRegistry(mockedWebSocket);
	});

	it('should get the last message', () => {
		// given
		const { result } = renderHook(() => useWebSocket());
		expect(result.current.lastMessage).toBeUndefined();
		expect(result.current.lastJsonMessage).toBeUndefined();

		// when
		act(() => {
			eventListener(messageEvent1);
		});

		// then
		expect(result.current.lastMessage).toEqual({
			data: '{"messageType": "unit test", "value": "test"}',
			isTrusted: false,
		});
		expect(result.current.lastJsonMessage).toEqual({ messageType: 'unit test', value: 'test' });
	});

	it('should only return the last message', () => {
		// given
		const { result } = renderHook(() => useWebSocket());
		expect(result.current.lastMessage).toBeUndefined();
		expect(result.current.lastJsonMessage).toBeUndefined();
		act(() => {
			eventListener(messageEvent1);
		});
		expect(result.current.lastMessage).not.toBeUndefined();
		expect(result.current.lastJsonMessage).not.toBeUndefined();

		// when
		act(() => {
			eventListener(messageEvent2);
		});

		// then
		expect(result.current.lastMessage).toEqual({
			data: '{"messageType": "unit test 2", "value": "test 2"}',
			isTrusted: false,
		});
		expect(result.current.lastJsonMessage).toEqual({ messageType: 'unit test 2', value: 'test 2' });
	});

	it('should filter the messages based on their types', () => {
		// given
		const { result } = renderHook(() => useWebSocket(['unit test']));
		expect(result.current.lastMessage).toBeUndefined();
		expect(result.current.lastJsonMessage).toBeUndefined();

		act(() => {
			eventListener(messageEvent1);
		});

		expect(result.current.lastMessage).toBeUndefined();
		expect(result.current.lastJsonMessage).toBeUndefined();

		act(() => {
			eventListener(messageEvent2);
		});

		expect(result.current.lastMessage).not.toBeUndefined();
		expect(result.current.lastJsonMessage).not.toBeUndefined();

		// when
		act(() => {
			eventListener(messageEvent1);
		});

		// then
		expect(result.current.lastMessage).toEqual({
			data: '{"messageType": "unit test 2", "value": "test 2"}',
			isTrusted: false,
		});
		expect(result.current.lastJsonMessage).toEqual({ messageType: 'unit test 2', value: 'test 2' });
	});

	it('should send a message', () => {
		// given
		const { result } = renderHook(() => useWebSocket());

		// when
		act(() => {
			result.current.sendMessage('hello there');
		});

		expect(send).toHaveBeenCalledWith('hello there');
	});

	it('should send a json message', () => {
		// given
		const { result } = renderHook(() => useWebSocket());

		// when
		act(() => {
			result.current.sendJsonMessage({ hello: 'there' });
		});

		expect(send).toHaveBeenCalledWith('{"hello":"there"}');
	});
});
