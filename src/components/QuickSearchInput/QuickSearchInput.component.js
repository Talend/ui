import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Typeahead } from '@talend/react-components/lib/Typeahead';
import { badgesFacetedPropTypes } from '../facetedSearch.propTypes';

const MINIMUM_LENGTH = 2;
export const DEFAULT_QUICKSEARCH_OPERATOR = 'containsIgnoreCase';

const getDefaultFacet = (facets = []) =>
	facets.find(({ metadata }) => metadata.isDefaultForQuickSearch) || facets[0];

export const QuickSearchInput = ({ t, facets, className, onSelect = () => {} }) => {
	const defaultFacet = useMemo(() => getDefaultFacet(facets), [facets]);
	const [opened, setOpened] = useState(false);
	const [value, setValue] = useState('');

	if (!facets.length) {
		return null;
	}

	return (
		<Typeahead
			placeholder={t('QUICKSEARCH_PLACEHOLDER', { defaultValue: 'Find in a column...' })}
			onFocus={() => setOpened(value.length >= MINIMUM_LENGTH)}
			onBlur={() => {
				setValue('');
				setOpened(false);
			}}
			focusedItemIndex={2}
			onChange={(_, { value: val }) => {
				setValue(val);
				setOpened(val.length >= MINIMUM_LENGTH);
			}}
			onSelect={(_, { itemIndex }) => {
				if (value.length >= MINIMUM_LENGTH) {
					onSelect(facets[itemIndex] || defaultFacet, value);
					setValue('');
					setOpened(false);
				}
			}}
			icon={{
				name: 'talend-search',
			}}
			items={
				opened && [
					{
						hint: true,
						title: t('QUICKSEARCH_ITEM_TOOLTIP', {
							defaultValue: 'Search in',
						}),
						suggestions: facets.map(a => get(a, ['properties', 'label'], null)),
					},
				]
			}
			value={value}
			role="searchbox"
			className={className}
		/>
	);
};

QuickSearchInput.propTypes = {
	facets: badgesFacetedPropTypes,
	className: PropTypes.string,
	onSelect: PropTypes.func,
	t: PropTypes.func,
};
