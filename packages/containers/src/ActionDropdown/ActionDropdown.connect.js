import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect } from '@talend/react-cmf';
import { ActionDropdown } from '@talend/react-components';
import omit from 'lodash/omit';

import getOnClick from '../actionOnClick';

export function mapStateToProps(state, ownProps = {}) {
	let props = {};
	const context = {
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (ownProps.actionId) {
		// deprecated
		props = api.action.getActionInfo(context, ownProps.actionId);
	}
	const actionIds = ownProps.actionIds || props.actionIds;
	if (actionIds) {
		// deprecated
		props.items = actionIds.map(itemId => api.action.getActionInfo(context, itemId));
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

export function ContainerActionDropdown({ items, ...props }) {
	const safeProps = omit(props, cmfConnect.INJECTED_PROPS);
	if (items) {
		const clikableItems = items.map(item => ({
			...getOnClick(item, props),
			...item,
		}));
		return <ActionDropdown items={clikableItems} {...safeProps} />;
	}
	return <ActionDropdown {...safeProps} />;
}

ContainerActionDropdown.displayName = 'Container(ActionDropdown)';

ContainerActionDropdown.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	noCaret: PropTypes.bool,
	pullRight: PropTypes.bool,
	hideLabel: PropTypes.bool,
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionDropdown);
