import { cmfConnect } from '@talend/react-cmf';
// import Immutable from 'immutable';
import <%= props.name %> from '<%= props.toConnect %>';

// function mapStateToProps(state, ownProps) {
// 	const props = {};
// 	return props;
// }

export default cmfConnect({
	// mapStateToProps,
	omitCMFProps: true,
	keepComponentState: false,
	// please keep only the tools you need from the following ones
	// defaultState: new Immutable.Map(),
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
	defaultProps: {
		omitRouterProps: true,
		// saga: '<%= props.name %>#default',
		// itemsExpression: '<%= props.name %>#getItems',
	},
})(<%= props.name %>);
