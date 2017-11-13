import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect } from '@talend/react-cmf';
import { ActionDropdown } from '@talend/react-components';

import getOnClick from '../actionOnClick';

export function mapStateToProps(state, { actionId, actionIds } = {}) {
	let props = {};
	const context = {
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (actionId) {
		props = api.action.getActionInfo(context, actionId);
	}
	if (actionIds) {
		props.actionIds = actionIds;
	}
	if (props.actionIds) {
		props.items = props.actionIds.map(itemId => api.action.getActionInfo(context, itemId));
	}
	return props;
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	if (ownProps.actionId) {
		delete props.actionId;
	}
	return props;
}

export function ContainerActionDropdown(props) {
	const newProps = Object.assign({}, props);

	if (newProps.items) {
		newProps.items = props.items.map(item => ({
			...getOnClick(item, props),
			...item,
		}));
	}

	return <ActionDropdown {...newProps} />;
}

ContainerActionDropdown.displayName = 'Container(ActionDropdown)';

ContainerActionDropdown.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionDropdown);
