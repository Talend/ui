import { useMemo, useState } from 'react';

import get from 'lodash/get';
import PropTypes from 'prop-types';

import Typeahead from '@talend/react-components/lib/Typeahead';

import { badgesFacetedPropTypes } from '../facetedSearch.propTypes';

export const DEFAULT_QUICKSEARCH_OPERATOR = 'containsIgnoreCase';

const getDefaultFacet = (facets = []) =>
	facets.find(({ metadata }) => metadata.isDefaultForQuickSearch) || facets[0];

export const QuickSearchInput = ({
	t,
	facets,
	placeholder,
	className,
	onSelect = () => {},
	facetsFilter,
	inputProps,
	minLength,
}) => {
	const defaultFacet = useMemo(() => getDefaultFacet(facets), [facets]);
	const [opened, setOpened] = useState(false);
	const [value, setValue] = useState('');

	if (!facets.length) {
		return null;
	}

	const filteredFacets = facetsFilter ? facetsFilter(value, facets) : facets;

	return (
		<Typeahead
			placeholder={placeholder || t('QUICKSEARCH_PLACEHOLDER', 'Find in a column...')}
			onFocus={() => setOpened(value.length >= minLength)}
			onBlur={() => {
				setValue('');
				setOpened(false);
			}}
			focusedItemIndex={2}
			onChange={(_, { value: val }) => {
				setValue(val);
				setOpened(val.length >= minLength);
			}}
			onSelect={(_, { itemIndex }) => {
				if (value.length >= minLength) {
					onSelect(filteredFacets[itemIndex] || defaultFacet, value);
					setValue('');
					setOpened(false);
				}
			}}
			icon={{
				name: 'talend-search',
			}}
			items={
				opened
					? [
							{
								hint: true,
								title: t('QUICKSEARCH_ITEM_TOOLTIP', {
									defaultValue: 'Search in',
								}),
								suggestions: filteredFacets.map(a => get(a, ['properties', 'label'], null)),
							},
						]
					: undefined
			}
			value={value}
			role="searchbox"
			className={className}
			inputProps={inputProps}
		/>
	);
};

QuickSearchInput.propTypes = {
	facets: badgesFacetedPropTypes,
	className: PropTypes.string,
	placeholder: PropTypes.string,
	onSelect: PropTypes.func,
	facetsFilter: PropTypes.func,
	t: PropTypes.func,
	inputProps: PropTypes.object,
	minLength: PropTypes.number,
};
