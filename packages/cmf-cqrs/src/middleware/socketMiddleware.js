import SmartWebsocket from './smartWebsocket';
import {
	SOCKET_ON_OPEN,
	SOCKET_ON_CLOSE,
	SOCKET_ON_ERROR,
	SOCKET_ON_PING_TIMEOUT,
} from '../constants';
// SOCKET_ON_PING

// if host is localhost connect directly to the localhost backend
// else connect to the actual host
const host = window.location.host;

let protocol = 'ws';
if (window.location.protocol === 'https:') {
	protocol = 'wss';
}

/**
 * select part of the state to create patch between two state
 *
 * @param socketPath {string} path to websocket
 * @param actionListeners {array<function>} function exectuted
 * on each action going trought this middleware
 * @param socketListener {array<function>} function executed
 * on each message send to this ws listenner
 *
 * @return {object} result
 *
 */
function createWebsocketMiddleware(
	socketPath,
	actionListeners = [],
	socketListener = [],
	socketOptions = {},
) {
	const buffer = [];
	let ws;
	const urlPrefix = `${protocol}://${host}${socketPath}`;

	function send() {
		actionListeners.forEach(actionListener => {
			buffer.forEach((entrie, key) => {
				const { previousState, action } = entrie;
				let nextState = entrie.nextState;
				const nextEntry = buffer[key + 1];
				if (nextEntry) {
					nextState = nextEntry.previousState;
				}
				const message = actionListener(previousState, action, nextState);
				if (message) {
					ws.send(message);
				}
			});
		});
		buffer.length = 0;
	}

	return ({ getState, dispatch }) => next => action => {
		if (!ws) {
			ws = new SmartWebsocket(urlPrefix, {
				onOpen: () => dispatch({ type: SOCKET_ON_OPEN }),
				onClose: event => dispatch({ type: SOCKET_ON_CLOSE, event }),
				onMessage: messageEvent => {
					socketListener.forEach(func => func(messageEvent, dispatch, getState, ws));
				},
				onError: event => {
					dispatch({ type: SOCKET_ON_ERROR, event });
				},
				onPing: event => {
					//dispatch({ type: SOCKET_ON_PING, event });
					/*ws.pingpong = {
						ping: event.timestamp,
					};*/
					ws.pingTimeoutId = event.pingTimeoutId;
				},
				onPingTimeout: () => {
					dispatch({ type: SOCKET_ON_PING_TIMEOUT });
					/*
					if (ws.pingpong && !ws.pingpong.pong) {
						dispatch({ type: SOCKET_ON_PING_TIMEOUT, event });
					}
					*/
					// if(event.timeStamp - ws.lastPingTimeStamp > )

					//ws.lastPingTimestamp = event.timestamp;
				},
				...socketOptions,
			});
		}
		const entrie = {};
		buffer.push(entrie);
		entrie.action = action;
		entrie.previousState = getState();
		const result = next(action);
		entrie.nextState = getState();
		send();
		return result;
	};
}

export default createWebsocketMiddleware;
