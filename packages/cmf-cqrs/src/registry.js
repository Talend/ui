const websockets = {};

export const addWebsocketToRegistry = (ws, id = 'default') => {
	websockets[id] = ws;
};

export const getWebSocketFromRegistry = (id = 'default') => {
	return websockets[id];
};
