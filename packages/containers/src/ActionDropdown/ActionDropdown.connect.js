import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect, Inject } from '@talend/react-cmf';
import { ActionDropdown } from '@talend/react-components';

import getOnClick from '../actionOnClick';

export function getInjectedComponent(componentId, props) {
	if (componentId) {
		return <Inject component={componentId} {...props} />;
	}
	return <Inject component="Action" {...props} />;
}

export function getComponentsItems(defaultCustomItemId, customItems) {
	return customItems.map(({ componentId, ...rest }) => {
		if (defaultCustomItemId) {
			return getInjectedComponent(defaultCustomItemId, rest);
		}
		return getInjectedComponent(componentId, rest);
	});
}

export function mapStateToProps(state, ownProps = {}) {
	let props = {};
	const context = {
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (ownProps.actionId) {
		props = api.action.getActionInfo(context, ownProps.actionId);
	}
	const actionIds = ownProps.actionIds || props.actionIds;
	if (actionIds) {
		props.items = actionIds.map(itemId => api.action.getActionInfo(context, itemId));
	}
	if (ownProps.customItems) {
		props.componentItems = getComponentsItems(ownProps.defaultCustomItemId, ownProps.customItems);
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

	if (props.customItems) {
		delete props.customItems;
		delete props.defaultCustomItemId;
	}
	return props;
}

export function ContainerActionDropdown({ items, componentItems, ...props }) {
	if (items) {
		const clikableItems = items.map(item => ({
			...getOnClick(item, props),
			...item,
		}));
		return <ActionDropdown items={clikableItems} {...props} />;
	} else if (componentItems) {
		return <ActionDropdown items={componentItems} {...props} />;
	}
	return <ActionDropdown {...props} />;
}

ContainerActionDropdown.displayName = 'Container(ActionDropdown)';

ContainerActionDropdown.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	componentItems: PropTypes.arrayOf(PropTypes.object),
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionDropdown);
