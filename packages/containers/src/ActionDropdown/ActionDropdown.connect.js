import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect } from '@talend/react-cmf';
import { ActionDropdown } from '@talend/react-components';

export function mapStateToProps(state, { actionId } = {}) {
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

	newProps.items = props.items.map(item =>
		Object.assign(
			{
				onClick: (event, data) => {
					if (item.actionCreator) {
						props.dispatchActionCreator(item.actionCreator, event, data);
					} else {
						props.dispatch(
							Object.assign(
								{
									model: props.model,
								},
								item.payload,
							),
						);
					}
				},
			},
			item,
		),
	);
	return <ActionDropdown {...newProps} />;
}

ContainerActionDropdown.displayName = 'ContainerActionDropdown';

ContainerActionDropdown.propTypes = {
	actionIds: PropTypes.arrayOf(PropTypes.string),
	items: PropTypes.arrayOf(PropTypes.object),
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionDropdown);
