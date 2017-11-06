import { api, cmfConnect } from '@talend/react-cmf';
import { Action } from '@talend/react-components';

import ActionButton from '../ActionButton';
import ActionFile from '../ActionFile';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';
import getRenderers from '../renderers';

export const renderers = {
	ActionButton,
	ActionFile,
	ActionSplitDropdown,
	ActionDropdown,
};

export function mapStateToProps(state, ownProps) {
	const props = {
		renderers: getRenderers(renderers),
	};
	if (!ownProps.actionId && !ownProps.name) {
		return props;
	}
	const info = api.action.getActionInfo({
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	}, ownProps.actionId || ownProps.name);
	props.actionId = ownProps.actionId || ownProps.name;
	props.displayMode = info.displayMode;
	return props;
}

export default cmfConnect({
	mapStateToProps,
})(Action);
