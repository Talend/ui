import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import get from 'lodash/get';
import { getTheme } from '@talend/react-components/lib/theme';
import { Typeahead } from '@talend/react-components/lib/Typeahead';
import { badgesFacetedPropTypes } from '../facetedSearch.propTypes';

import theme from './QuickSearchInput.scss';

const css = getTheme(theme);
const MINIMUM_LENGTH = 2;

export const DEFAULT_QUICKSEARCH_OPERATOR = 'containsIgnoreCase';

const getItemRenderer = t => (item, { value }) => {
	const facet = get(item, ['properties', 'label'], null);
	return (
		facet != null && (
			<div
				className={css('item', {
					[theme.disabled]: item.disabled,
				})}
				title={t('QUICKSEARCH_ITEM_TOOLTIP', {
					defaultValue: 'Search for {{value}} in {{facet}}',
					value,
					facet,
				})}
			>
				<span>{facet}</span>
			</div>
		)
	);
};

const getDefaultFacet = (facets = []) =>
	facets.find(({ metadata }) => metadata.isDefaultForQuickSearch) || facets[0];

export const QuickSearchInput = ({ t, facets, className, onSelect = () => {} }) => {
	const itemRenderer = useMemo(() => getItemRenderer(t), [t]);
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
			onKeyDown={({ which }) => {
				if (which === keycode.codes.enter && value.length >= MINIMUM_LENGTH) {
					onSelect(defaultFacet, value);
					setValue('');
					setOpened(false);
				}
			}}
			onChange={(_, { value: val }) => {
				setValue(val);
				setOpened(val.length >= MINIMUM_LENGTH);
			}}
			onSelect={(_, { itemIndex }) => {
				onSelect(facets[itemIndex], value);
				setValue('');
				setOpened(false);
			}}
			items={
				opened && [
					{
						title: t('QUICKSEARCH_ITEM_TOOLTIP', {
							defaultValue: 'Search in',
						}),
						suggestions: facets,
					},
				]
			}
			value={value}
			role="searchbox"
			className={className}
			renderItem={itemRenderer}
		/>
	);
};

QuickSearchInput.propTypes = {
	facets: badgesFacetedPropTypes,
	className: PropTypes.string,
	onSelect: PropTypes.func,
	t: PropTypes.func,
};
