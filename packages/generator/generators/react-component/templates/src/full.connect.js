import { connect } from 'react-redux';
import { actions } from 'react-cmf';
import { componentState } from 'react-talend-containers';

import Container, { DEFAULT_STATE } from './<%= props.name %>.container';

export function getContainerInfo(ownProps) {
	return {
		name: '<%= props.name %>',
		id: '<%= props.name %>',  // you may change this using ownProps
	};
}

export function mapDispatchToProps(dispatch, ownProps) {
	const info = getContainerInfo(ownProps);
	const props = componentState.getAccessors(dispatch, info.name, info.id, DEFAULT_STATE);
	props.dispatch = dispatch;
	return props;
}

export function mapStateToProps(state, ownProps) {
	const info = getContainerInfo(ownProps);
	return componentState.getProps(state, info.name, info.id);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Container);
