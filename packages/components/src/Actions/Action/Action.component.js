import PropTypes from 'prop-types';
import React from 'react';

import ActionButton from '../ActionButton';
import ActionFile from '../ActionFile';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';
import ActionIconToggle from '../ActionIconToggle';
import Inject from '../../Inject';

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
export function getActionComponent({ displayMode, getComponent }) {
	const Renderers = Inject.getAll(getComponent, {
		ActionFile,
		ActionDropdown,
		ActionSplitDropdown,
		ActionIconToggle,
		ActionButton,
	});
	switch (displayMode) {
		case TYPE_FILE:
			return Renderers.ActionFile;
		case TYPE_DROPDOWN:
			return Renderers.ActionDropdown;
		case TYPE_SPLIT_DROPDOWN:
			return Renderers.ActionSplitDropdown;
		case TYPE_ICON_TOGGLE:
			return Renderers.ActionIconToggle;
		default:
			if (displayMode) {
				return getComponent(displayMode);
			}
			return Renderers.ActionButton;
	}
}

/**
 * This component is a component selector which to discover which kind of
 * action you want to display to the user.
 * The choice is fully based on the props displayMode
 * You can override the component using props renderer
 * @param {ActionProps}
 */
function Action({ displayMode, getComponent, ...props }) {
	const ActionComponent = getActionComponent({
		displayMode,
		getComponent,
		...props,
	});
	return <ActionComponent {...props} />;
}

Action.displayName = 'Action';

Action.propTypes = {
	displayMode: PropTypes.string,
	getComponent: PropTypes.func,
};

export default Action;
