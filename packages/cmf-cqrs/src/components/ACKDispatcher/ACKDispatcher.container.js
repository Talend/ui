import { useState } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import cmf, { cmfConnect, useCMFContext } from '@talend/react-cmf';
import { randomUUID } from '@talend/utils';

import { deleteACK } from '../../actions/ack';

export const DEFAULT_STATE = new Map({});

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

// rewrite the following react component as a function

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
	(props.acks || [])
		.filter(ack => ack.get('received') === true && ack.get('actionCreator'))
		.forEach((ack, requestId) => {
			let data = ack.get('data');
			if (data === undefined) {
				data = {};
			}
			dispatchAndUpdateAck(ack.get('actionCreator'), data, requestId);
		});

	return null;
}

ACKDispatcher.propTypes = {
	acks: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	...cmfConnect.propTypes,
};

ACKDispatcher.displayName = 'Container(ACKDispatcher)';

export default ACKDispatcher;
