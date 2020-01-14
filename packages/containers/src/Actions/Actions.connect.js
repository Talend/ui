import { cmfConnect } from '@talend/react-cmf';
import { Actions } from '@talend/react-components/lib/Actions';

import Action from '../Action';
import getRenderers from '../renderers';

const renderers = {
	Action,
};

function mapStateToProps(state, { actionIds, names, actions }) {
	const props = { renderers: getRenderers(renderers) };
	const ids = actionIds || names;
	if (!actions && ids) {
		props.actions = ids.map(actionId => ({ actionId }));
	}
	return props;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	delete props.actionIds;
	delete props.names;
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
})(Actions);
