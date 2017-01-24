import { connect } from 'react-redux';

import { getStateAccessors, getStateProps } from '../state';
import Container, { DEFAULT_STATE } from './SidePanel.container';

export function getContainerInfo(ownProps) {
	return {
		name: 'SidePanel',
		id: ownProps.stateId || 'default',
	};
}

export function mapDispatchToProps(dispatch, ownProps) {
	const { name, id } = getContainerInfo(ownProps);
	return getStateAccessors(dispatch, name, id, DEFAULT_STATE);
}

export function mapStateToProps(state, ownProps) {
	const { name, id } = getContainerInfo(ownProps);
	return getStateProps(state, name, id);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
