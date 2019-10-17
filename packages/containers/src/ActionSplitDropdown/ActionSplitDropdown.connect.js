import React from 'react';
import PropTypes from 'prop-types';
import cmf, { cmfConnect } from '@talend/react-cmf';
import ActionSplitDropdown from '@talend/react-components/lib/Actions/ActionSplitDropdown';

import getOnClick from '../actionOnClick';

export function mapStateToProps(state, { actionId, actionIds } = {}) {
	let props = {};
	const context = {
		registry: cmf.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (actionId) {
		props = cmf.action.getActionInfo(context, actionId);
	}
	if (actionIds) {
		props.actionIds = actionIds;
	}
	if (props.actionIds) {
		props.items = props.actionIds.map(itemId => cmf.action.getActionInfo(context, itemId));
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	if (props.actionId) {
		delete props.actionId;
	}

	if (props.actionIds) {
		delete props.actionIds;
	}
	return props;
}

export function ContainerActionSplitDropdown(props) {
	let newProps = Object.assign({}, props);

	newProps = {
		...getOnClick(newProps, props),
		...newProps,
	};

	if (newProps.items) {
		newProps.items = props.items.map(item => ({
			...getOnClick(item, props),
			...item,
		}));
	}

	return <ActionSplitDropdown {...newProps} />;
}

ContainerActionSplitDropdown.displayName = 'Container(ActionSplitDropdown)';

ContainerActionSplitDropdown.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(ContainerActionSplitDropdown);
