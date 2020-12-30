import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './Notification.container';

export function componentId(ownProps) {
	return (ownProps && ownProps.id) || 'Notification';
}

export function deleteNotification(indexNotification) {
	return function mutator(prevStateProps) {
		const notifications = prevStateProps.state.get('notifications');
		const index = notifications.indexOf(indexNotification);
		if (index > -1) {
			const newNotif = notifications.delete(index);
			return prevStateProps.state.set('notifications', newNotif);
		}
		return prevStateProps.state;
	};
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	return {
		deleteNotification(i) {
			dispatchProps.setState(deleteNotification(i));
		},
		...ownProps,
		...stateProps,
		...dispatchProps,
	};
}

export default cmfConnect({
	componentId,
	defaultState: DEFAULT_STATE,
	defaultProps: {
		saga: 'Notification#default',
	},
	mergeProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Container);
