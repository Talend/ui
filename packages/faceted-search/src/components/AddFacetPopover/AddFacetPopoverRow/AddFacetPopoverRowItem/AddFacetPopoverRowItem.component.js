import { useMemo } from 'react';
import PropTypes from 'prop-types';
import isNaN from 'lodash/isNaN';

import { badgeFacetedPropTypes } from '../../../facetedSearch.propTypes';
import { getTabIndex } from '../../addFacetPopover.utils';
import { AddFacetPopoverRowButton } from '../AddFacetPopoverRowButton';

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

	return (
		<AddFacetPopoverRowButton
			id={`${id}-row-button-${label}`}
			label={label}
			onClick={onClickRow}
			tabIndex={getTabIndex(isFocusable)}
			disabledLabel={isDisabled ? disabledLabel : ''}
		/>
	);
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

export const AddFacetPopoverRowItemCategory = ({ id, label, onClick, isFocusable }) => (
	<AddFacetPopoverRowButton
		id={`${id}-row-button-${label}`}
		label={label}
		onClick={() => onClick(label)}
		tabIndex={getTabIndex(isFocusable)}
		isCategory
	/>
);

AddFacetPopoverRowItemCategory.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isFocusable: PropTypes.bool.isRequired,
};
