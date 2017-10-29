import { cmfConnect } from '@talend/react-cmf';
import { Actions } from '@talend/react-components';

import Action from '../Action';

const renderers = {
	Action,
};

function mapStateToProps(state, { actionIds, names, actions }) {
	const props = { renderers };
	const ids = actionIds || names;
	if (!actions && ids) {
		props.actions = ids.map(actionId => ({ actionId }));
	}
	return props;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, stateProps, dispatchProps, ownProps);
	delete props.actionIds;
	delete props.names;
	return props;
}

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(Actions);
