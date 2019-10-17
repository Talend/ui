import { cmfConnect } from '@talend/react-cmf';
import ActionBar from '@talend/react-components/lib/ActionBar';
import Action from '../Action';
import Actions from '../Actions';
import ActionDropdown from '../ActionDropdown';
import ActionSplitDropdown from '../ActionSplitDropdown';
import getRenderers from '../renderers';

const renderers = {
	Action,
	Actions,
	ActionDropdown,
	ActionSplitDropdown,
};

function getAction(actionId) {
	if (typeof actionId === 'string') {
		return { actionId };
	}
	return actionId;
}

export function mapStateToProps(state, { actionIds }) {
	const props = {
		renderers: getRenderers(renderers),
	};
	if (actionIds) {
		props.actions = {};
		const { left, right } = actionIds;
		if (left) {
			props.actions.left = left.map(getAction);
		}
		if (right) {
			props.actions.right = right.map(getAction);
		}
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	delete props.actionIds;
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(ActionBar);
