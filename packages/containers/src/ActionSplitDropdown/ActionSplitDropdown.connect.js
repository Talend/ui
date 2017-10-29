import { api, cmfConnect } from '@talend/react-cmf';
import { ActionSplitDropdown } from '@talend/react-components';

export function mapStateToProps(state, { actionId }) {
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
		props.items = props.actionIds.map(itemId => api.actiongetActionInfo(context, itemId));
	}
	return props;
}

export default cmfConnect(
	mapStateToProps,
)(ActionSplitDropdown);
