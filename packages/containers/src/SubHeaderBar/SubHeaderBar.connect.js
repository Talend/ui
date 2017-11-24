import React from 'react';
import { api, cmfConnect, Inject } from '@talend/react-cmf';
import SubHeaderBar, { DEFAULT_STATE } from './SubHeaderBar.container';

function getActionInfo(actionId, state) {
	return api.action.getActionInfo(
		{
			registry: api.registry.getRegistry(),
			store: {
				getState: () => state,
			},
		},
		actionId,
	);
}

function buildActions(actions, state) {
	return actions.map(actionId => {
		const actionInfo = getActionInfo(actionId, state);
		if (actionInfo.componentId) {
			actionInfo.component = <Inject component={actionInfo.componentId} {...actionInfo} />;
		}
		return actionInfo;
	});
}

function mapStateToProps(state, ownProps) {
	const props = {};
	if (ownProps.actionsRight) {
		props.actionsRight = buildActions(ownProps.actionsRight, state);
	}
	if (ownProps.actionsCenter) {
		props.actionsCenter = buildActions(ownProps.actionsRight, state);
	}
	return props;
}

export default cmfConnect({
	componentId: ownProps => ownProps.id,
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(SubHeaderBar);
