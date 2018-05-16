import { WebSocket, Server } from 'mock-socket';
// fixme
import { setTimeout } from 'timers';
import SmartWebsocket, { wsSend, wsIsClosed } from './smartWebsocket';

// Set the websocket mock used by smartWebsocket middleware
global.WebSocket = WebSocket;
// Set the fake websocket server
const urlWS = 'ws://localhost:8092/';
const mockServer = new Server(urlWS);
// bind event on the websocket connection
mockServer.on('connection', () => {
	mockServer.send('test message 1');
});

describe('smart websocket tests', () => {
	describe('wsSend function', () => {
		it('should test when websocket is closed', () => {
			// given
			const ws = {
				readyState: WebSocket.CLOSED,
				send: jest.fn(),
			};
			const offlinebuffer = [];
			const callback = jest.fn();

			// when
			wsSend(ws, 'message', callback, offlinebuffer);

			// then
			expect(callback).not.toHaveBeenCalled();
			expect(offlinebuffer).toEqual([{ message: 'message', callback }]);
		});

		it('should test when websocket is up without callback', () => {
			// given
			const ws = {
				readyState: WebSocket.OPEN,
				send: jest.fn(),
			};
			const offlinebuffer = [];

			// when
			wsSend(ws, 'message', null, offlinebuffer);

			// then
			expect(offlinebuffer).toEqual([]);
			expect(ws.send).toHaveBeenCalledWith('message');
		});

		it('should test when websocket is up with callback', () => {
			// given
			const ws = {
				readyState: WebSocket.OPEN,
				send: jest.fn(),
			};
			const offlinebuffer = [];
			const callback = jest.fn();

			// when
			wsSend(ws, 'message', callback, offlinebuffer);

			// then
			expect(offlinebuffer).toEqual([]);
			expect(callback).toHaveBeenCalled();
			expect(ws.send).toHaveBeenCalledWith('message');
		});
	});

	describe('wsIsClosed function', () => {
		it('without ws connection given should return true', () => {
			// given
			// when
			const isClosed = wsIsClosed(null);
			// then
			expect(isClosed).toBe(true);
		});

		it('with ws closed connection given should return true', () => {
			// given
			const ws = {
				readyState: WebSocket.CLOSED,
			};
			// when
			const isClosed = wsIsClosed(ws);
			// then
			expect(isClosed).toBe(true);
		});

		it('with ws open connection given should return false', () => {
			// given
			const ws = {
				readyState: WebSocket.OPEN,
			};
			// when
			const isClosed = wsIsClosed(ws);
			// then
			expect(isClosed).toBe(false);
		});
	});

	describe('SmartWebsocket function', () => {
		it('should create a websocket', () => {
			// given
			const options = {
				onMessage: jest.fn(),
				onOpen: jest.fn(),
				onClose: jest.fn(),
				onError: jest.fn(),
			};
			// when
			const result = SmartWebsocket('/test/', options); // eslint-disable-line
			// then
			expect(result.getReadyState()).toEqual(WebSocket.CONNECTING);
			expect(result.getBufferedAmount()).toBe(undefined);
			expect(result.getUrl()).toEqual('/test/');
			expect(result.close()).toEqual(undefined);
		});

		it('should let some time to connect', done => {
			// given
			const url = urlWS;
			const options = {
				onMessage: jest.fn(),
				onOpen: jest.fn(),
				onClose: jest.fn(),
				onError: jest.fn(),
				checkInterval: 70,
			};
			// when
			const result = SmartWebsocket(url, options); // eslint-disable-line
			// then
			expect(result.getReadyState()).toEqual(WebSocket.CONNECTING);
			expect(result.getBufferedAmount()).toBe(undefined);
			expect(result.getUrl()).toEqual(urlWS);
			setTimeout(() => {
				expect(result.getReadyState()).toEqual(WebSocket.OPEN);
				expect(options.onOpen).toHaveBeenCalled();
				expect(options.onMessage).toHaveBeenCalled();
				result.close();
				setTimeout(() => {
					expect(result.getReadyState()).toEqual(WebSocket.CLOSED);
					done();
				}, 10);
			}, 100);
		});

		it('should send message while not connected', done => {
			// given
			const url = urlWS;
			const options = {
				onMessage: jest.fn(),
				onOpen: jest.fn(),
				onClose: jest.fn(),
				onError: jest.fn(),
			};
			const callback = jest.fn();
			// when
			const result = SmartWebsocket(url, options); // eslint-disable-line
			result.send('message to send', callback);
			// then
			expect(callback).not.toHaveBeenCalled();
			setTimeout(() => {
				expect(callback).toHaveBeenCalled();
				result.close();
				done();
			}, 100);
		});

		it('when ws close, onClose  callback should be fired', done => {
			// given
			const options = {
				onMessage: jest.fn(),
				onOpen: jest.fn(),
				onClose: jest.fn(),
				onError: jest.fn(),
			};
			// when
			const result = SmartWebsocket('/test/', options); // eslint-disable-line
			// then
			expect(result.getReadyState()).toEqual(WebSocket.CONNECTING);
			expect(result.getBufferedAmount()).toBe(undefined);
			expect(result.getUrl()).toEqual('/test/');
			expect(result.close()).toEqual(undefined);
			setTimeout(() => {
				expect(options.onClose).toHaveBeenCalled();
				done();
			}, 100);
		});

		it('should trigger a timeout on connect after pingTimeoutDelay', () => {
			// given
			jest.useFakeTimers();
			const url = urlWS;
			const options = {
				onMessage: jest.fn(),
				onOpen: jest.fn(),
				onClose: jest.fn(),
				onError: jest.fn(),
				onPingTimeout: jest.fn(),
				checkInterval: 70,
				// < 4ms, that is the delay from ws mock to send
				// smartWebStocket send a ping on connect, so to test the connect timeout
				// we need to trigger timeout before any send delay
				pingTimeoutDelay: 1,
			};
			const result = SmartWebsocket(url, options); // eslint-disable-line
			expect(result.getReadyState()).toEqual(WebSocket.CONNECTING);
			expect(options.onPingTimeout).not.toBeCalled();

			// when
			jest.runTimersToTime(1);

			// then
			expect(result.getReadyState()).toEqual(WebSocket.CONNECTING);
			expect(options.onPingTimeout).toBeCalled();
		});
	});
});
