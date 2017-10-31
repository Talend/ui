import PropTypes from 'prop-types';
import React from 'react';

import ActionButton from '../ActionButton';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';

const TYPE_DROPDOWN = 'dropdown';
const TYPE_SPLIT_DROPDOWN = 'splitDropdown';

/**
 * Internal: should not be used outside
 * This function decide which component should be used to display the action
 * based on a displayMode.
 * Component can be override by the renderers
 * @param {object} props should contains displayMode and renderers
 * @return {object|function} the component to be used
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
};

export default Action;
