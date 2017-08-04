import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { api, componentState } from 'react-cmf';

import { deleteACK } from '../../actions/ack';

export const DEFAULT_STATE = new Map({

});
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
		acks: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
		...componentState.propTypes,
	};
	static contextTypes = {
		registry: PropTypes.object,
		store: PropTypes.object,
		router: PropTypes.object,
	};

	constructor(props, context) {
		super(props, context);
		this.dispatch = this.dispatch.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		return this.props.acks !== nextProps.acks;
	}

	dispatch(actionCreator, data, requestId) {
		const action = api.action.getActionCreatorFunction(
				this.context,
				actionCreator,
		)({}, data, this.context);
		action.ack = deleteACK(null, { requestId });
		this.props.dispatch(action);
	}

	processACK() {
		this.props.acks
			.filter(ack => ack.get('received') === true && ack.get('actionCreator'))
			.forEach((ack, requestId) => {
				let data = ack.get('data');
				if (data === undefined) {
					data = {};
				}
				this.dispatch(ack.get('actionCreator'), data, requestId);
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
