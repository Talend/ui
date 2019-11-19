import cmf, { cmfConnect } from '@talend/react-cmf';
import Action from '@talend/react-components/lib/Actions/Action';

export function mapStateToProps(state, ownProps) {
	if (ownProps.actionId) {
		return cmf.action.getActionInfo(
			{
				registry: cmf.registry.getRegistry(),
				store: {
					getState: () => state,
				},
			},
			ownProps.actionId,
		);
	}
	return {};
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	delete props.actionId;
	return props;
}

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.actionId || ownProps.id,
	mapStateToProps,
	mergeProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(Action);
