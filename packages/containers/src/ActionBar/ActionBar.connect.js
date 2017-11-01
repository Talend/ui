import { cmfConnect } from '@talend/react-cmf';
import { ActionBar } from '@talend/react-components';
import getRenderers from '../renderers';

export function mapStateToProps(state, { actionIds }) {
	const props = {
		renderers: getRenderers(),
	};
	if (actionIds) {
		props.actions = {};
		const { left, right } = actionIds;
		if (left) {
			props.actions.left = left.map((actionId) => {
				if (typeof actionId === 'string') {
					return { actionId };
				}
				return actionId;
			});
		}
		if (right) {
			props.actions.right = right.map(actionId => ({ actionId }));
		}
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	delete props.actionIds;
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ActionBar);
