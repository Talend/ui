import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { api, componentState } from '@talend/react-cmf';

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
		...componentState.propTypes,
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

	componentDidMount() {
		if (this.props.acks) {
			this.processACK(this.props.acks);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.acks) {
			this.processACK(nextProps.acks);
		}
	}

	shouldComponentUpdate(nextProps) {
		return this.props.acks !== nextProps.acks;
	}

	dispatchAndUpdateAck(actionCreator, data, requestId) {
		const action = api.actionCreator.get(this.context, actionCreator)({}, data, this.context);
		action.ack = deleteACK(null, { requestId });
		this.props.dispatch(action);
		this.setState(oldState => {
			if (oldState.dispatchedAck.includes(requestId)) {
				return oldState;
			}
			return { dispatchedAck: oldState.dispatchedAck.concat([requestId]) };
		});
	}

	processACK(acks) {
		acks
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
		// eslint-disable-line class-methods-use-this
		return null;
	}
}

export default ACKDispatcher;
