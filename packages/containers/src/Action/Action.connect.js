import { api, cmfConnect } from '@talend/react-cmf';
import { Action } from '@talend/react-components';

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.actionId) {
		const info = api.action.getActionInfo(
			{
				registry: api.registry.getRegistry(),
				store: {
					getState: () => state,
				},
			},
			ownProps.actionId,
		);

		props.displayMode = info.displayMode;
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	delete props.actionId;
	return props;
}

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.actionId || ownProps.id,
	mapStateToProps,
})(Action);
