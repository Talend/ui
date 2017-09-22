import { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './<%= props.name %>.container';

export function mapStateToProps(state, ownProps, cmfProps) {
	// cmfProps.state
	const props = {};
	return props;
}

export function mapDispatchToProps(dispatch, ownProps, cmfProps) {
	// cmfProps.updateState, initState, deleteState, dispatch, dispatchActionCreator
	const props = {};
	return props;
}

export default cmfConnect({
	componentId: '<%= props.name %>',  // can be a function
	defaultState: DEFAULT_STATE,
	mapStateToProps,
	mapDispatchToProps,
})(Container);
