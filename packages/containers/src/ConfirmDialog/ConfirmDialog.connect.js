import { connect } from 'react-redux';

import Container, { DEFAULT_STATE } from './ConfirmDialog.container';
import { getStateAccessors, getStateProps } from '../state';

export function getContainerInfo(ownProps) {
	return {
		name: 'ConfirmDialog',
		id: (ownProps && ownProps.id) || 'ConfirmDialog',
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
	return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
)(Container);
