import { api, cmfConnect } from '@talend/react-cmf';
import { ActionDropdown } from '@talend/react-components';

export function mapStateToProps(state, { actionId } = {}) {
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
	if (props.actionIds) {
		props.items = props.actionIds.map(itemId => api.action.getActionInfo(context, itemId));
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	if (ownProps.actionId) {
		delete props.actionId;
	}
	if (ownProps.actionIds) {
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
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ActionDropdown);
