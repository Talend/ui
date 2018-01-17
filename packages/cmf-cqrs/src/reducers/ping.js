import { Map } from 'immutable';

const PING_MESSAGE_TYPE = 'ping';
const PONG_MESSAGE_TYPE = 'pong';
const DEFAULT_STATE = new Map({});

/**
 * pingReducer
 * @param  {Object} state  redux
 * @param  {Object} action redux
 * @return {Object}        new state
 */
export default function pingReducer(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case PING_MESSAGE_TYPE:
			// wip requestId
			return state.setIn([action.requestId, 'timestamp'], action.timestamp);
		default:
			return state;
	}
}

export function pingProcessed(state, action) {
	if (action.type) {
		const newState = Object.assign({}, state, {
			ping: pingReducer(state.ping, action),
		});
		return newState;
	}
	return state;
}
