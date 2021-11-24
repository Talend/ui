import PropTypes from 'prop-types';
import React from 'react';

import ActionButton from '../ActionButton';
import ActionFile from '../ActionFile';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';
import ActionIconToggle from '../ActionIconToggle';
import Inject from '../../Inject';

const DISPLAY_MODE_FILE = 'file';
const DISPLAY_MODE_DROPDOWN = 'dropdown';
const DISPLAY_MODE_SPLIT_DROPDOWN = 'splitDropdown';
const DISPLAY_MODE_ICON_TOGGLE = 'iconToggle';

/**
 * @typedef {(Object|Function)} Component
 */

/**
 * Internal: should not be used outside
 * This function decide which component should be used to display the action
 * based on a displayMode.
 * Component can be override by the renderers
 * @param {ActionProps} - props should contains displayMode and renderers
 * @return {Component} the component to be used
 */
function getActionComponent({ displayMode, getComponent }) {
	const Renderers = Inject.getAll(getComponent, {
		ActionFile,
		ActionDropdown,
		ActionSplitDropdown,
		ActionIconToggle,
		ActionButton,
	});

	/* eslint-disable no-use-before-define */
	switch (displayMode) {
		case DISPLAY_MODE_FILE:
			return Renderers.ActionFile;
		case DISPLAY_MODE_DROPDOWN:
			return Renderers.ActionDropdown;
		case DISPLAY_MODE_SPLIT_DROPDOWN:
			return Renderers.ActionSplitDropdown;
		case DISPLAY_MODE_ICON_TOGGLE:
			return Renderers.ActionIconToggle;
		default:
			return Inject.get(getComponent, displayMode, Renderers.ActionButton);
	}
	/* eslint-enable no-use-before-define */
}

/**
 * This component is a component selector which to discover which kind of
 * action you want to display to the user.
 * The choice is fully based on the props displayMode
 * You can override the component using props renderer
 * @param {ActionProps}
 */
function Action({ displayMode, getComponent, ...props }) {
	const ActionComponent = getActionComponent({ displayMode, getComponent });
	return <ActionComponent {...props} />;
}

Action.DISPLAY_MODE_FILE = DISPLAY_MODE_FILE;
Action.DISPLAY_MODE_DROPDOWN = DISPLAY_MODE_DROPDOWN;
Action.DISPLAY_MODE_SPLIT_DROPDOWN = DISPLAY_MODE_SPLIT_DROPDOWN;
Action.DISPLAY_MODE_ICON_TOGGLE = DISPLAY_MODE_ICON_TOGGLE;

Action.displayName = 'Action';

Action.propTypes = {
	displayMode: PropTypes.string,
	getComponent: PropTypes.func,
};

export default Action;
