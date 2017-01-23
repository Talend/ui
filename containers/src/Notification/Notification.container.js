import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { Notification as Component } from 'react-talend-components';

import { statePropTypes, stateWillMount } from '../state';

export const DEFAULT_STATE = new Map({
	notifications: new List(),
});

class Notification extends React.Component {
	static displayName = 'CMFContainer(Notification)';
	static propTypes = {
		deleteNotification: PropTypes.func,
		...statePropTypes,
	};

	componentWillMount() {
		stateWillMount(this.props);
	}

	render() {
		const state = (this.props.state || DEFAULT_STATE).toJS();
		return (
			<Component
				leaveFn={i => this.props.deleteNotification(i)}
				notifications={state.notifications}
			/>
		);
	}
}

export default Notification;
