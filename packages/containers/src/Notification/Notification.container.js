import PropTypes from 'prop-types';
import React from 'react';
import { List, Map } from 'immutable';
import Notification from '@talend/react-components/lib/Notification';
import { cmfConnect } from '@talend/react-cmf';

export const DEFAULT_STATE = new Map({
	notifications: new List(),
});

function NotificationContainer(props) {
	const state = (props.state || DEFAULT_STATE).toJS();
	return (
		<Notification
			leaveFn={i => props.deleteNotification(i)}
			notifications={state.notifications}
			autoLeaveError={props.autoLeaveError}
		/>
	);
}

NotificationContainer.displayName = 'Container(Notification)';
NotificationContainer.propTypes = {
	deleteNotification: PropTypes.func,
	autoLeaveError: PropTypes.bool,
	...cmfConnect.propTypes,
};

export default NotificationContainer;
