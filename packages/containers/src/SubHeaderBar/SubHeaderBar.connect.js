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

function mapStateToProps(state, ownProps) {
	if (ownProps.actionsRight) {
		return {
			actionsContentRight: ownProps.actionsRight.map(actionId => {
				const actionInfo = getActionInfo(actionId, state);
				if (actionInfo.componentId) {
					actionInfo.component = <Inject component={actionInfo.componentId} {...actionInfo} />;
				}
				return actionInfo;
			}),
		};
	}
	return {};
}

export default cmfConnect({
	componentId: ownProps => ownProps.id,
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(SubHeaderBar);
