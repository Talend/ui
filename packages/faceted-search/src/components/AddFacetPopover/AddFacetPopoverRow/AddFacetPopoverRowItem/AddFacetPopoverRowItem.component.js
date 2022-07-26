import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import isNaN from 'lodash/isNaN';

import { getTheme, TooltipTrigger } from '@talend/react-components';

import { badgeFacetedPropTypes } from '../../../facetedSearch.propTypes';
import { getTabIndex } from '../../addFacetPopover.utils';
import { AddFacetPopoverRowButton } from '../AddFacetPopoverRowButton';
import cssModule from './AddFacetPopoverRowItem.scss';

const theme = getTheme(cssModule);

const filterByAttribute = badgeDefinition => badge =>
	badge.properties.attribute === badgeDefinition.properties.attribute;

const isButtonDisabled = (badges, badgeDefinition, occurrences) => {
	const badgePerFacet = parseInt(badgeDefinition.metadata.badgePerFacet, 10);

	if (isNaN(badgePerFacet)) {
		return false;
	}

	return occurrences >= badgePerFacet;
};

export const AddFacetPopoverRowItem = ({
	badgeDefinition,
	id,
	label,
	onClick,
	isFocusable,
	badges,
	t,
}) => {
	const occurrences = useMemo(
		() => badges.filter(filterByAttribute(badgeDefinition)).length,
		[badges, badgeDefinition],
	);
	const isDisabled = useMemo(
		() => isButtonDisabled(badges, badgeDefinition, occurrences),
		[badges, badgeDefinition, occurrences],
	);
	const onClickRow = event => {
		onClick(event, badgeDefinition);
	};

	const disabledLabel = t('ADD_FACET_ROW_DISABLED_LABEL', {
		count: occurrences,
		badgeLabel: label,
		defaultValue: 'You can only apply the {{badgeLabel}} filter once',
		defaultValue_plural: 'You can only apply the {{badgeLabel}} filter {{count}} times',
	});

	const row = (
		<div className={theme('tc-add-facet-popover-row')}>
			<AddFacetPopoverRowButton
				id={`${id}-row-button-${label}`}
				onClick={onClickRow}
				tabIndex={getTabIndex(isFocusable)}
				disabled={isDisabled}
			>
				{label}
			</AddFacetPopoverRowButton>
		</div>
	);

	if (isDisabled) {
		return (
			<TooltipTrigger label={disabledLabel} tooltipPlacement="top">
				{row}
			</TooltipTrigger>
		);
	}

	return row;
};

AddFacetPopoverRowItem.propTypes = {
	id: PropTypes.string.isRequired,
	badgeDefinition: badgeFacetedPropTypes.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isFocusable: PropTypes.bool.isRequired,
	badges: PropTypes.array.isRequired,
	t: PropTypes.func.isRequired,
};
