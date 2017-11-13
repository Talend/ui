import React from 'react';
import PropTypes from 'prop-types';
import { api, cmfConnect } from '@talend/react-cmf';
import { ActionSplitDropdown } from '@talend/react-components';

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
	return props;
}

export function ContainerActionSplitDropdown(props) {
	const newProps = Object.assign({}, props);
	if (props.actionId) {
		newProps.onClick = (event, data) => {
			if (props.actionCreator) {
				props.dispatchActionCreator(props.actionCreator, event, data);
			} else {
				props.dispatch(
					Object.assign(
						{
							model: props.model,
						},
						props.payload,
					),
				);
			}
		};
		delete newProps.actionId;
	}

	if (newProps.items) {
		newProps.items = props.items.map(item => ({
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
			...item,
		}));
	}

	return <ActionSplitDropdown {...newProps} />;
}

ContainerActionSplitDropdown.displayName = 'Container(ActionSplitDropdown)';

ContainerActionSplitDropdown.propTypes = {
	actionId: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object),
};

export default cmfConnect({
	mapStateToProps,
	mergeProps,
})(ContainerActionSplitDropdown);
