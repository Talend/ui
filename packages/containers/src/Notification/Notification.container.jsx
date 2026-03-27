import PropTypes from 'prop-types';
import Component from '@talend/react-components/lib/Notification';
import { cmfConnect } from '@talend/react-cmf';

export const DEFAULT_STATE = {
	notifications: [],
};

function Notification(props) {
	const state = props.state || DEFAULT_STATE;
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
