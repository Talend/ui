import { setTimeout } from 'timers';

/**
 * Send message on ws if available.
 * feed the offlineBuffer if it is not
 */
export function wsSend(ws, message, callback, offlinebuffer) {
	if (ws.readyState === WebSocket.OPEN) {
		ws.send(message);
		if (typeof callback === 'function') {
			callback();
		}
	} else {
		offlinebuffer.push({ message, callback });
	}
}

/**
 * if is closed or not defined start a new ws
 */
export function wsIsClosed(ws) {
	return !ws || ws.readyState === WebSocket.CLOSED;
}

/**
 * initialise a websocket
 * on open connection, try to send messages stored in offline buffer
 */
export function startWebsocket(url, offlinebuffer, options) {
	const { onMessage, onOpen, onClose, onError, onPing, onPingTimeout } = options;
	const ws = new WebSocket(url);
	let pingInterval;
	let pingTimeoutId;
	ws.onopen = function onopen(event) {
		if (typeof onOpen === 'function') {
			onOpen(event);
		}
		// copy data in local array since offline buffer may be used in this process
		// in case we loose again ou connection
		const localBuffer = offlinebuffer.slice(0);
		offlinebuffer.reset();
		if (localBuffer.length > 0) {
			localBuffer.forEach(msg => wsSend(ws, msg.message, msg.callback, offlinebuffer));
		}
		ws.ping();
		pingInterval = setInterval(ws.ping, options.pingInterval || 50000);
	};
	ws.onmessage = function onmessage(messageEvent) {
		if (typeof onMessage === 'function') {
			onMessage(messageEvent);
		}
	};
	ws.onclose = function onclose(closeEvent) {
		if (typeof onClose === 'function') {
			onClose(closeEvent);
		}
		if (pingInterval) {
			clearInterval(pingInterval);
		}
	};
	ws.onerror = function onerror(event) {
		if (typeof onError === 'function') {
			onError(event);
		}
	};
	ws.ping = function ping() {
		if (typeof onPing === 'function') {
			// penser au cas des ack lents pr show modale pb websocket ?
			// const timestamp = Math.floor(Date.now() / 1000);
			if (!isNaN(options.pingTimeoutDelay)) {
				pingTimeoutId = setTimeout(ws.onpingtimeout, options.pingTimeoutDelay);
			}

			onPing({ pingTimeoutId });
			//onPing({ ping: timestamp, pingTimeoutId });
		}

		ws.send('{"type":"PING"}');
	};
	ws.onpingtimeout = function onpingtimeout() {
		if (typeof onPingTimeout === 'function') {
			//const timestamp = Math.floor(Date.now() / 1000);
			//onPingTimeout({ pingTimeout: timestamp });
			onPingTimeout();
		}
		// clearInterval(stop); ?? like smartWebsocket.js:123
		ws.close();
		// reconnection instannée possible ?
	};
	return ws;
}

/**
 * create a new smart websocket featuring
 * automatic reconnection
 * message pooling in case of connection loss
 * @param ulr
 * @param options
 */
export default function SmartWebsocket(url, options = {}) {
	let ws;
	const offlinebuffer = [];
	offlinebuffer.reset = () => {
		offlinebuffer.length = 0;
	};

	const send = (message, callback) => wsSend(ws, message, callback, offlinebuffer);
	const start = () => {
		ws = startWebsocket(url, offlinebuffer, options);
	};

	start();
	const restartIfClosed = () => {
		if (wsIsClosed(ws)) {
			start();
		}
	};

	const stop = setInterval(restartIfClosed, options.checkInterval || 5000);

	return {
		send,
		close() {
			clearInterval(stop);
			return ws.close();
		},
		getBufferedAmount() {
			return ws.bufferedAmount;
		},
		getReadyState() {
			return ws.readyState;
		},
		getUrl() {
			return ws.url;
		},
	};
}
