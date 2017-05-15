import { cmfConnect } from 'react-cmf';
import invariant from 'invariant';

import Container, { DEFAULT_STATE } from './Notification.container';

export function componentId(ownProps) {
	return (ownProps && ownProps.id) || 'Notification';
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	return Object.assign({
		deleteNotification(i) {
			const notifications = stateProps.state.get('notifications');
			const index = notifications.indexOf(i);
			if (index === -1) {
				invariant(true, `notification not found ${JSON.stringify(i)}`);
			}
			const newNotif = notifications.delete(index);
			const newState = stateProps.state.set('notifications', newNotif);
			dispatchProps.setState(newState);
		},
	}, ownProps, stateProps, dispatchProps);
}

export default cmfConnect({
	componentId,
	defaultState: DEFAULT_STATE,
	mergeProps,
})(Container);
