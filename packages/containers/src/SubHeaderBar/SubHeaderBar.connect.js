import React from 'react';
import { api, cmfConnect, Inject } from '@talend/react-cmf';
import { Action } from '@talend/react-components';
import { omit } from 'lodash';
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
	const ACTION_PROPS_OMITTED = ['renderType', 'tag'];
	return actions.map(actionId => {
		const actionInfo = getActionInfo(actionId, state);
		if (actionInfo.renderType === 'component' && actionInfo.componentId) {
			actionInfo.component = (
				<Inject component={actionInfo.componentId} {...omit(actionInfo, ACTION_PROPS_OMITTED)} />
			);
		}
		if (actionInfo.render === 'action') {
			actionInfo.component = <Action {...omit(actionInfo, ACTION_PROPS_OMITTED)} />;
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
		props.actionsCenter = buildActions(ownProps.actionsCenter, state);
	}
	return props;
}

export default cmfConnect({
	componentId: ownProps => ownProps.id,
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(SubHeaderBar);
