import PropTypes from 'prop-types';
import React from 'react';
import { List, Map } from 'immutable';
import Component from '@talend/react-components/lib/Notification';
import { cmfConnect } from '@talend/react-cmf';

export const DEFAULT_STATE = new Map({
	notifications: new List(),
});

function Notification(props) {
	const state = (props.state || DEFAULT_STATE).toJS();
	return (
		<Component
			leaveFn={i => props.deleteNotification(i)}
			notifications={state.notifications}
			autoLeaveError={props.autoLeaveError}
		/>
	);
}

Notification.displayName = 'Container(Notification)';
Notification.propTypes = {
	deleteNotification: PropTypes.func,
	autoLeaveError: PropTypes.bool,
	...cmfConnect.propTypes,
};

export default Notification;
