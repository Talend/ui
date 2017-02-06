import { connect } from 'react-redux';
import { actions } from 'react-cmf';
import invariant from 'invariant';

import Container, { DEFAULT_STATE } from './Notification.container';
import { getStateAccessors, getStateProps } from '../state';

export function getContainerInfo(ownProps) {
	return {
		name: 'Notification',
		id: (ownProps && ownProps.id) || 'Notification',
	};
}

export function mapDispatchToProps(dispatch, ownProps) {
	const info = getContainerInfo(ownProps);
	const props = getStateAccessors(dispatch, info.name, info.id, DEFAULT_STATE);
	props.dispatch = dispatch;
	return props;
}

export function mapStateToProps(state, ownProps) {
	const info = getContainerInfo(ownProps);
	return getStateProps(state, info.name, info.id);
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const info = getContainerInfo(ownProps);
	return Object.assign({
		deleteNotification(i) {
			const notifications = stateProps.state.get('notifications');
			const index = notifications.indexOf(i);
			if (index === -1) {
				invariant(true, `notification not found ${JSON.stringify(i)}`);
			}
			const newNotif = notifications.delete(index);
			const newState = stateProps.state.set('notifications', newNotif);
			dispatchProps.dispatch(
				actions.componentsActions.mergeComponentState(
					info.name,
					info.id,
					newState,
				),
			);
		},
	}, ownProps, stateProps, dispatchProps);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
)(Container);
