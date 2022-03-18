import { useCallback, useEffect, useRef, useState } from 'react';
import { WEBSOCKET_READY_STATE } from './constants';
import { getWebSocketFromRegistry } from './registry';

// const [messages, _setMessages] = useState<T[]>([]);
// const messagesRef = useRef(messages);
// const setMessages = (data: T[]) => {
// 	messagesRef.current = data;
// 	_setMessages(data);
// };
// setMessages([...messagesRef.current, data]);

export interface WebsocketMessageData {
	applicationId: string;
	applicationService: string;
	body: any;
	clientId: string;
	messageType: string;
	timestamp: number;
}

export const useWebSocket = <T extends WebsocketMessageData>(
	messageTypeFilter: string[] = [],
	id: string = 'default',
) => {
	const websocketRef = useRef<WebSocket>();
	const [lastJsonMessage, setLastJsonMessage] = useState<T>();
	const [lastMessage, setLastMessage] = useState<MessageEvent<string>>();

	const sendMessage = useCallback((message: string) => {
		if (websocketRef.current?.readyState === WEBSOCKET_READY_STATE.OPEN) {
			websocketRef.current.send(message);
		}
	}, []);

	const sendJsonMessage = useCallback(
		(message: any) => {
			sendMessage(JSON.stringify(message));
		},
		[sendMessage],
	);

	const onMessage = (messageEvent: MessageEvent<string>) => {
		const data: T = JSON.parse(messageEvent.data);
		if (!messageTypeFilter.includes(data.messageType)) {
			setLastJsonMessage(data);
			setLastMessage(messageEvent);
		}
	};

	useEffect(() => {
		const ws: WebSocket = getWebSocketFromRegistry(id);
		websocketRef.current = ws;
		if (ws) {
			ws.addEventListener('message', onMessage);
		}
		return () => {
			if (ws) {
				ws.removeEventListener('message', onMessage);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		lastJsonMessage,
		lastMessage,
		readyState: websocketRef.current?.readyState,
		sendMessage,
		sendJsonMessage,
	};
};

// const {
//   sendMessage,
//   sendJsonMessage,
//   lastMessage,
//   lastJsonMessage,
//   readyState,
//   getWebSocket,
// } = useWebSocket(socketUrl, {
//   onOpen: () => console.log('opened'),
//   //Will attempt to reconnect on all close events, such as server shutting down
//   shouldReconnect: (closeEvent) => true,
// });
