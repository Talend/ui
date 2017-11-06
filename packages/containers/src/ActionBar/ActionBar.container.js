import PropTypes from 'prop-types';
import React from 'react';
import { ActionBar as Component } from '@talend/react-components';
import { getActionsProps } from '../actionAPI';
import Action from '../Action';
import ActionFile from '../ActionFile';
import Actions from '../Actions';

function getActions(context, idOrInfo, model) {
	if (typeof idOrInfo === 'string') {
		return getActionsProps(context, idOrInfo, model);
	} else if (idOrInfo.displayMode === 'splitDropdown') {
		return Object.assign({
			displayMode: idOrInfo.displayMode,
			items: getActionsProps(context, idOrInfo.items, model),
		}, getActionsProps(context, idOrInfo.name, model));
	} else if (idOrInfo.displayMode === 'btnGroup') {
		return {
			displayMode: idOrInfo.displayMode,
			actions: getActionsProps(context, idOrInfo.actions, model),
		};
	}
	return undefined;
}

function ActionBar({ actions, actionIds, ...props }, context) {
	const actionsProps = actions || {};
	if (actionIds) {
		const { left, right } = actionIds;
		if (left) {
			actionsProps.left = left.map(info => getActions(context, info, props.model));
		}
		if (right) {
			actionsProps.right = right.map(info => getActions(context, info, props.model));
		}
	}

	return (
		<Component
			actions={actionsProps}
			renderers={{
				Action,
				ActionFile,
				Actions,
			}}
			{...props}
		/>
	);
}

const actionPropTypes = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.shape({
		displayMode: PropTypes.string.isRequired,
		actions: PropTypes.arrayOf(PropTypes.string),
		items: PropTypes.arrayOf(PropTypes.string),
	}),
]);

Object.keys(Component).forEach((key) => {
	ActionBar[key] = Component[key];
});
ActionBar.displayName = 'CMFContainer(ActionBar)';
ActionBar.propTypes = {
	...Component.propTypes,
	actionIds: PropTypes.shape({
		left: PropTypes.arrayOf(actionPropTypes),
		right: PropTypes.arrayOf(actionPropTypes),
	}),
};
ActionBar.contextTypes = {
	store: PropTypes.object,
	registry: PropTypes.object,
	router: PropTypes.object,
};

export default ActionBar;
