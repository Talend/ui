import { ACK_ADD_CONTEXT, ACK_RECEIVE_MESSAGE, ACK_DELETE } from '../constants';

/**
 * Only copy the expected fields so that untrusted data can not
 * override the action type or inject arbitrary action fields.
 */
function pick(data, keys) {
	const result = {};
	if (data) {
		keys.forEach(key => {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				result[key] = data[key];
			}
		});
	}
	return result;
}

export function addContext(event, data) {
	return {
		type: ACK_ADD_CONTEXT,
		...pick(data, ['requestId', 'data', 'actionCreator']),
	};
}

export function receiveMessage(event, data) {
	return {
		type: ACK_RECEIVE_MESSAGE,
		...pick(data, ['requestId']),
	};
}

export function deleteACK(event, data) {
	return {
		type: ACK_DELETE,
		...pick(data, ['requestId']),
	};
}

export default {
	addContext,
	receiveMessage,
};
