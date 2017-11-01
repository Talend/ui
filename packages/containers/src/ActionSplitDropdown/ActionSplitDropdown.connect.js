import { api, cmfConnect } from '@talend/react-cmf';
import { ActionSplitDropdown } from '@talend/react-components';

export function mapStateToProps(state, { actionId, actionIds } = {}) {
	let props = {};
	const context = {
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (actionId) {
		props = api.action.getActionInfo(context, actionId);
	}
	if (actionIds) {
		props.items = actionIds.map(itemId => api.action.getActionInfo(context, itemId));
	}
	return props;
}


export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	if (props.actionId) {
		props.onClick = (event, data) => {
			if (props.actionCreator) {
				dispatchProps.dispatchActionCreator(props.actionCreator, event, data);
			} else {
				dispatchProps.dispatch(
					Object.assign(
						{
							model: props.model,
						},
						props.payload,
					),
				);
			}
		};
		delete props.actionId;
	}
	if (props.actionIds) {
		props.items = props.items.map(item => Object.assign({
			onClick: (event, data) => {
				if (item.actionCreator) {
					props.dispatchActionCreator(item.actionCreator, event, data);
				} else {
					props.dispatch(
						Object.assign(
							{
								model: props.model,
							},
							item.payload,
						),
					);
				}
			},
		}, item));
	}
	delete props.actionIds;
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ActionSplitDropdown);
