import PropTypes from 'prop-types';
import React from 'react';

import ActionButton from '../ActionButton';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';

const TYPE_DROPDOWN = 'dropdown';
const TYPE_SPLIT_DROPDOWN = 'splitDropdown';

/**
 * @typedef {(Object|Function)} Component
 */

/**
 * @typedef {Object} ActionProps
 * @property {TYPE_DROPDOWN | TYPE_SPLIT_DROPDOWN | false} displayMode
 * @property {Object.<String, Component>} renderers
 */

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
		case TYPE_DROPDOWN:
			return renderers.ActionDropdown || ActionDropdown;
		case TYPE_SPLIT_DROPDOWN:
			return renderers.ActionSplitDropdown || ActionSplitDropdown;
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

Action.propTypes = {
	displayMode: PropTypes.string,
	renderers: PropTypes.shape({
		ActionButton: PropTypes.node,
		ActionSplitDropdown: PropTypes.node,
		ActionDropdown: PropTypes.node,
	}),
};

export default Action;
