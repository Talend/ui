import { api, cmfConnect } from '@talend/react-cmf';
import { Action } from '@talend/react-components';

import ActionButton from '../ActionButton';
import ActionFile from '../ActionFile';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';
import getRenderers from '../renderers';

const renderers = {
	ActionButton,
	ActionFile,
	ActionSplitDropdown,
	ActionDropdown,
};

export function mapStateToProps(state, ownProps) {
	if (!ownProps.actionId && !ownProps.name) {
		return {};
	}
	const info = api.action.getActionInfo({
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	}, ownProps.actionId || ownProps.name);
	const props = {
		actionId: ownProps.actionId || ownProps.name,
		displayMode: info.displayMode,
		renderers: getRenderers(renderers),
	};
	return props;
}

export default cmfConnect({
	mapStateToProps,
})(Action);
