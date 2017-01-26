import { connect } from 'react-redux';
import { actions } from 'react-cmf';

import Container, { DEFAULT_STATE } from './<%= props.name %>.container';
import { getStateAccessors, getStateProps } from '../state';

export function getContainerInfo(ownProps) {
	return {
		name: '<%= props.name %>',
		id: '<%= props.name %>',  // you may change this using ownProps
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

/* if you need it
export function mergeProps(stateProps, dispatchProps, ownProps) {
}
*/

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
