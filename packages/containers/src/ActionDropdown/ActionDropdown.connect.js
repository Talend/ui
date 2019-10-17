import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cmf, { cmfConnect } from '@talend/react-cmf';
import ActionDropdown from '@talend/react-components/lib/Actions/ActionDropdown';
import omit from 'lodash/omit';

import getOnClick from '../actionOnClick';

export function mapStateToProps(state, ownProps = {}) {
	let props = {};
	const context = {
		registry: cmf.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (ownProps.actionId) {
		// deprecated
		props = cmf.action.getActionInfo(context, ownProps.actionId);
	}
	const actionIds = ownProps.actionIds || props.actionIds;
	if (actionIds) {
		// deprecated
		props.items = actionIds.map(itemId => cmf.action.getActionInfo(context, itemId));
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
		// keep initial object as it can be immutable and have a prototype
		const clikableItems = items.map(item => Object.assign(item, getOnClick(item, props)));
		return <ActionDropdown items={clikableItems} {...safeProps} />;
	}
	return <ActionDropdown {...safeProps} />;
}

ContainerActionDropdown.displayName = 'Container(ActionDropdown)';

ContainerActionDropdown.propTypes = {
	items: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), ImmutablePropTypes.list]),
	noCaret: PropTypes.bool,
	pullRight: PropTypes.bool,
	hideLabel: PropTypes.bool,
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
	omitCMFProps: true,
	withComponentRegistry: true,
	withDispatch: true,
	withDispatchActionCreator: true,
	withComponentId: true,
})(ContainerActionDropdown);
