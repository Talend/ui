import { useCallback, useEffect, useRef, useState } from 'react';
import { WEBSOCKET_READY_STATE } from './constants';
import { getWebSocketFromRegistry } from './registry';

export interface WebsocketMessageData {
	body: any;
	messageType: string;
}

export const useWebSocket = <T extends WebsocketMessageData>(
	messageTypeDenyList: string[] = [],
	id: string = 'default',
) => {
	const websocketRef = useRef<WebSocket>();
	const [lastMessage, setLastMessage] = useState<{
		message: MessageEvent<string>;
		jsonData: T;
	}>();

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
		if (!messageTypeDenyList.includes(data.messageType)) {
			setLastMessage({ message: messageEvent, jsonData: data });
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
		lastJsonMessage: lastMessage?.jsonData,
		lastMessage: lastMessage?.message,
		readyState: websocketRef.current?.readyState,
		sendMessage,
		sendJsonMessage,
	};
};
