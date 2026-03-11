import { useState } from 'react';
import PropTypes from 'prop-types';
import cmf, { cmfConnect, useCMFContext } from '@talend/react-cmf';
import { randomUUID } from '@talend/utils';

import { deleteACK } from '../../actions/ack';

export const DEFAULT_STATE = {};

/**
 * {
		type: 'ACK_ADD_CONTEXT',
		requestId: '123',
		data: { foo: 'bar' },
		actionCreator: 'dataset:fetchAll'
	}
 {
	 type: 'ACK_RECEIVE_MESSAGE',
	 requestId: '123',
 }

 */

const cache = {};

function ACKDispatcher(props) {
	const context = useCMFContext();
	const [uuid] = useState(randomUUID());
	if (!cache[uuid]) {
		cache[uuid] = [];
	}
	const dispatchedAck = cache[uuid];
	function dispatchAndUpdateAck(actionCreator, data, requestId) {
		const action = cmf.actionCreator.get(context, actionCreator)({}, data, context);
		action.ack = deleteACK(null, { requestId });
		props.dispatch(action);

		if (!dispatchedAck.includes(requestId)) {
			cache[uuid].push(requestId);
		}
	}
	Object.entries(props.acks || {})
		.filter(([, ack]) => ack.received === true && ack.actionCreator)
		.forEach(([requestId, ack]) => {
			const data = ack.data !== undefined ? ack.data : {};
			dispatchAndUpdateAck(ack.actionCreator, data, requestId);
		});

	return null;
}

ACKDispatcher.propTypes = {
	acks: PropTypes.object,
	...cmfConnect.propTypes,
};

ACKDispatcher.displayName = 'Container(ACKDispatcher)';

export default ACKDispatcher;
