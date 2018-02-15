import PropTypes from 'prop-types';
import React from 'react';

import ActionButton from '../ActionButton';
import ActionFile from '../ActionFile';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';
import ActionIconToggle from '../ActionIconToggle';

const TYPE_FILE = 'file';
const TYPE_DROPDOWN = 'dropdown';
const TYPE_SPLIT_DROPDOWN = 'splitDropdown';
const TYPE_ICON_TOGGLE = 'iconToggle';

/**
 * @typedef {(Object|Function)} Component
 */

/**
 * @typedef {Object} ActionProps
 * @property {TYPE_DROPDOWN | TYPE_SPLIT_DROPDOWN | TYPE_ICON_TOGGLE | TYPE_FILE} displayMode
 * @property {Object.<String, Component>} renderers
 */

function noOp() {}

export function wrapOnClick(action) {
	const { model, onClick, ...rest } = action;
	const eventHandler = onClick || noOp;

	return event =>
		eventHandler(event, {
			action: { ...rest },
			model,
		});
}

/**
 * Internal: should not be used outside
 * This function decide which component should be used to display the action
 * based on a displayMode.
 * Component can be override by the renderers
 * @param {ActionProps} - props should contains displayMode and renderers
 * @return {Component} the component to be used
 */
export function getActionComponent({ displayMode, renderers = {} }) {
	switch (displayMode) {
		case TYPE_FILE:
			return renderers.ActionFile || ActionFile;
		case TYPE_DROPDOWN:
			return renderers.ActionDropdown || ActionDropdown;
		case TYPE_SPLIT_DROPDOWN:
			return renderers.ActionSplitDropdown || ActionSplitDropdown;
		case TYPE_ICON_TOGGLE:
			return renderers.ActionIconToggle || ActionIconToggle;
		default:
			return renderers.ActionButton || ActionButton;
	}
}

/**
 * This component is a component selector which to discover which kind of
 * action you want to display to the user.
 * The choice is fully based on the props displayMode
 * You can override the component using props renderer
 * @param {ActionProps}
 */
function Action({ displayMode, renderers, ...props }) {
	const ActionComponent = getActionComponent({
		displayMode,
		renderers,
		...props,
	});
	return <ActionComponent {...props} />;
}

Action.displayName = 'Action';

Action.propTypes = {
	displayMode: PropTypes.string,
	renderers: PropTypes.shape({
		ActionButton: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
		ActionFile: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
		ActionSplitDropdown: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
		ActionDropdown: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	}),
};

export default Action;
