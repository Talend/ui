import { Map } from 'immutable';
import { ACK_ADD_CONTEXT, ACK_RECEIVE_MESSAGE, ACK_DELETE } from '../constants/index';

const DEFAULT_STATE = new Map({});

/**
 * ackReducer
 * @param  {Object} state  redux
 * @param  {Object} action redux
 * @return {Object}        new state
 */
export default function ackReducer(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case ACK_ADD_CONTEXT:
			return state
				.setIn([action.requestId, 'data'], action.data)
				.setIn([action.requestId, 'actionCreator'], action.actionCreator);
		case ACK_RECEIVE_MESSAGE:
			return state.setIn([action.requestId, 'received'], true);
		case ACK_DELETE:
			return state.remove(action.requestId);
		default:
			return state;
	}
}

export function ackProcessed(state, action) {
	if (action.ack) {
		const newState = {
			...state,
			ack: ackReducer(state.ack, action.ack),
		};
		return newState;
	}
	return state;
}
