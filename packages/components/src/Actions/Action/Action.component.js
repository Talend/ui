import PropTypes from 'prop-types';
import React from 'react';

import ActionButton from '../ActionButton';
import ActionSplitDropdown from '../ActionSplitDropdown';
import ActionDropdown from '../ActionDropdown';

const TYPE_DROPDOWN = 'dropdown';
const TYPE_SPLIT_DROPDOWN = 'splitDropdown';

function getActionComponent(displayMode) {
	switch (displayMode) {
		case TYPE_DROPDOWN:
			return ActionDropdown;
		case TYPE_SPLIT_DROPDOWN:
			return ActionSplitDropdown;
		default:
			return ActionButton;
	}
}

function Action(props) {
	const { displayMode, ...params } = props;
	const ActionComponent = getActionComponent(displayMode);

	return <ActionComponent {...params} />;
}

Action.propTypes = {
	displayMode: PropTypes.string,
};

export default Action;
