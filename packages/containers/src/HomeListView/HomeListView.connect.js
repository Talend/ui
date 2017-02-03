import { connect } from 'react-redux';
import { actions } from 'react-cmf';

import Container, { DEFAULT_STATE } from './HomeListView.container';
import { getStateAccessors, getStateProps } from '../state';

export function getContainerInfo(ownProps) {
	return {
		name: 'HomeListView',
		id: 'HomeListView',  // you may change this using ownProps
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
