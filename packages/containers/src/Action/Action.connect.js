import { api, cmfConnect } from '@talend/react-cmf';
import { Action } from '@talend/react-components';

export function mapStateToProps(state, ownProps) {
	const props = {};

	if (!ownProps.actionId && !ownProps.name) {
		return props;
	}
	const info = api.action.getActionInfo(
		{
			registry: api.registry.getRegistry(),
			store: {
				getState: () => state,
			},
		},
		ownProps.actionId || ownProps.name,
	);

	props.actionId = ownProps.actionId || ownProps.name;
	props.displayMode = info.displayMode;
	return props;
}

export default cmfConnect({
	mapStateToProps,
})(Action);
