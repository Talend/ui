import React from 'react';
import PropTypes from 'prop-types';

import { SizedIcon } from '@talend/design-system';
import { getTheme } from '@talend/react-components';

import { getTabIndex } from '../../addFacetPopover.utils';
import { AddFacetPopoverRowButton } from '../AddFacetPopoverRowButton';
import cssModule from './AddFacetPopoverRowItemCategory.scss';

const theme = getTheme(cssModule);

export const AddFacetPopoverRowItemCategory = ({ label, onClick, isFocusable }) => (
	<div className={theme('tc-add-facet-popover-row')}>
		<AddFacetPopoverRowButton
			id={`$row-button-${label}`}
			onClick={() => onClick(label)}
			tabIndex={getTabIndex(isFocusable)}
			isCategory
		>
			{label}
		</AddFacetPopoverRowButton>
	</div>
);

AddFacetPopoverRowItemCategory.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isFocusable: PropTypes.bool.isRequired,
};
