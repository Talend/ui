import { api, cmfConnect } from '@talend/react-cmf';
import { Action } from '@talend/react-components';

export function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.actionId) {
		// eslint-disable-next-line no-console
		console.warn(
			'DEPRECATED: you should use componentId to map props using props.Action#componentId',
		);
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
	componentId: ownProps => ownProps.componentId || ownProps.id,
	mapStateToProps,
})(Action);
