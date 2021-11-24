import {
	ACK_ADD_CONTEXT,
	ACK_RECEIVE_MESSAGE,
	ACK_DELETE,
} from '../constants';

export function addContext(event, data) {
	return {
		type: ACK_ADD_CONTEXT,
		...data,
	};
}

export function receiveMessage(event, data) {
	return {
		type: ACK_RECEIVE_MESSAGE,
		...data,
	};
}

export function deleteACK(event, data) {
	return {
		type: ACK_DELETE,
		...data,
	};
}

export default {
	addContext,
	receiveMessage,
};
