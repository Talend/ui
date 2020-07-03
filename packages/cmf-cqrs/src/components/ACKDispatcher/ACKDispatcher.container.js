import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import cmf, { cmfConnect } from '@talend/react-cmf';

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
class ACKDispatcher extends React.Component {
	static displayName = 'Container(ACKDispatcher)';

	static propTypes = {
		acks: PropTypes.object, // eslint-disable-line react/forbid-prop-types
		...cmfConnect.propTypes,
	};

	static contextTypes = {
		registry: PropTypes.object,
		store: PropTypes.object,
		router: PropTypes.object,
	};

	constructor(props, context) {
		super(props, context);
		this.dispatchAndUpdateAck = this.dispatchAndUpdateAck.bind(this);
		this.processACK = this.processACK.bind(this);
		this.state = { dispatchedAck: [] };
	}

	shouldComponentUpdate(nextProps) {
		return this.props.acks !== nextProps.acks;
	}

	dispatchAndUpdateAck(actionCreator, data, requestId) {
		const action = cmf.actionCreator.get(this.context, actionCreator)({}, data, this.context);
		action.ack = deleteACK(null, { requestId });
		this.props.dispatch(action);
		this.setState(oldState => {
			if (oldState.dispatchedAck.includes(requestId)) {
				return oldState;
			}
			return { dispatchedAck: oldState.dispatchedAck.concat([requestId]) };
		});
	}

	processACK() {
		this.props.acks
			.filter(ack => ack.get('received') === true && ack.get('actionCreator'))
			.forEach((ack, requestId) => {
				let data = ack.get('data');
				if (data === undefined) {
					data = {};
				}
				this.dispatchAndUpdateAck(ack.get('actionCreator'), data, requestId);
			});
	}

	render() {
		if (this.props.acks) {
			this.processACK();
		}
		return null;
	}
}

export default ACKDispatcher;
