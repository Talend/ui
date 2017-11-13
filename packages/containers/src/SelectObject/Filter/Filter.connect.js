import { connect } from 'react-redux';
import { actions } from 'react-cmf';

import Container, { DEFAULT_STATE } from './Filter.container';

export function getContainerInfo(ownProps) {
	return {
		name: 'Filter',
		id: 'Filter',  // you may change this using ownProps
	};
}

export function mapDispatchToProps(dispatch, ownProps) {
	const { name, id } = getContainerInfo(ownProps);
	return {
		updateState(state) {
			dispatch(
				actions.componentsActions.mergeComponentState(
					name,
					id,
					state
				)
			);
		},
		initState() {
			dispatch(
				actions.componentsActions.addComponentState(
					name,
					id,
					DEFAULT_STATE
				)
			);
		},
	};
}

export function mapStateToProps(state, ownProps) {
	const { name, id } = getContainerInfo(ownProps);
	return {
		state: state.cmf.components.getIn([
			name,
			id,
		]),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
