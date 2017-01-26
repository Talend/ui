import { connect } from 'react-redux';
import { actions } from 'react-cmf';

import Container, { DEFAULT_STATE } from './ObjectViewer.container';
import { getStateAccessors, getStateProps } from '../state';

export function getContainerInfo(ownProps) {
	return {
		name: 'ObjectViewer',
		id: ownProps.id || 'ObjectViewer',
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
