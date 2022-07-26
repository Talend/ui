import React from 'react';
import PropTypes from 'prop-types';

import { getTabIndex } from '../../addFacetPopover.utils';
import { AddFacetPopoverRowButton } from '../AddFacetPopoverRowButton';

export const AddFacetPopoverRowItemCategory = ({ label, onClick, isFocusable }) => (
	<AddFacetPopoverRowButton
		id={`$row-button-${label}`}
		label={label}
		onClick={() => onClick(label)}
		tabIndex={getTabIndex(isFocusable)}
		isCategory
	/>
);

AddFacetPopoverRowItemCategory.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isFocusable: PropTypes.bool.isRequired,
};
