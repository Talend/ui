import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import times from 'lodash/times';
import uniq from 'lodash/uniq';

import { getTheme, Rich } from '@talend/react-components';

import cssModule from './AddFacetPopover.scss';
import { badgesFacetedPropTypes } from '../facetedSearch.propTypes';
import { AddFacetPopoverHeader } from './AddFacetPopoverHeader';
import { AddFacetPopoverRowItem, AddFacetPopoverRowItemCategory } from './AddFacetPopoverRow';

const theme = getTheme(cssModule);

const filterByLabel = label => row => {
	const rowLabel = isString(row) ? row : row.properties.label;

	return rowLabel.toLocaleLowerCase().includes(label.toLocaleLowerCase().trim());
};

const filterByNotEmpty = row => {
	const label = isString(row) ? row : row.properties.label;

	return label.trim() !== '';
};

const sortByLabel = (rowA, rowB) => {
	const labelA = isString(rowA) ? rowA : rowA.properties.label;
	const labelB = isString(rowB) ? rowB : rowB.properties.label;

	return labelA.localeCompare(labelB);
};

const getCategories = badgesDefinitions => {
	const categories = badgesDefinitions
		.filter(badgeDefinition => !!badgeDefinition.metadata.category)
		.map(badgeDefinition => badgeDefinition.metadata.category);

	return uniq(categories);
};

const getScreens = (badgesDefinitions, filterValue, comparator = sortByLabel) => {
	const visibleBadges = badgesDefinitions.filter(
		badgeDefinition => badgeDefinition.metadata.isAvailableForFacetList !== false,
	);

	const categories = getCategories(visibleBadges);

	const screens = [
		{
			category: null,
			rows: visibleBadges
				.filter(
					(definition, index, arr) =>
						!definition.metadata.category ||
						// remove category duplicates
						arr.findIndex(prev => prev.metadata.category === definition.metadata.category) ===
							index,
				)
				.map(badgeDefinition => badgeDefinition.metadata.category || badgeDefinition)
				.filter(filterByNotEmpty)
				.filter(filterByLabel(filterValue)),
		},
		...categories.map(categoryName => ({
			category: categoryName,
			rows: badgesDefinitions
				.filter(badgeDefinition => badgeDefinition.metadata.category === categoryName)
				.filter(filterByNotEmpty)
				.filter(filterByLabel(filterValue)),
		})),
	];
	if (comparator) {
		screens.forEach(screen => screen.rows.sort(comparator));
	}
	return screens;
};

export const AddFacetPopover = ({
	badgesDefinitions = [],
	badgesDefinitionsSort,
	badges,
	id,
	initialFilterValue,
	onClick,
	t,
}) => {
	const addFacetId = `${id}-add-facet-popover`;

	const [category, setCategory] = useState(null);
	const [filterValue, setFilterValue] = useState(initialFilterValue || '');
	const getScreensMemo = useCallback(
		() => getScreens(badgesDefinitions, filterValue, badgesDefinitionsSort),
		[badgesDefinitions, filterValue, badgesDefinitionsSort],
	);
	const screens = getScreensMemo();
	const screensRef = useRef(times(screens.length, createRef));

	const onFilter = (_, value) => {
		setFilterValue(value);
	};
	const resetFilter = () => setFilterValue('');

	const onCategoryChange = newCategory => {
		setCategory(newCategory);
		resetFilter();
	};

	const onRowClick = (...args) => {
		setCategory(null);
		onClick(...args);
	};

	return (
		<div id={addFacetId} className={theme('tc-add-facet-popover')}>
			<div id={addFacetId} className={theme('tc-add-facet-popover-container')}>
				{screens.map((screen, index) =>
					category === screen.category ? (
						<div key={`screen-${screen.category}`} ref={screensRef.current[index]}>
							<AddFacetPopoverHeader
								id={`${addFacetId}-${category}`}
								category={screen.category}
								onCategoryChange={onCategoryChange}
								resetFilter={resetFilter}
								onFilter={onFilter}
								filterValue={filterValue}
								isFocusable={screen.category === category}
								t={t}
							/>

							<Rich.Layout.Body id={`${addFacetId}-${category}-body`}>
								<div className={theme('tc-add-facet-popover-row-container')}>
									{filterValue !== '' && !screen.rows.length && (
										<span className={theme('tc-add-facet-popover-filter-empty')}>
											{t('ADD_FACET_FILTER_NO_RESULT', 'No result found')}
										</span>
									)}
									{screen.rows.map(rowItem =>
										isString(rowItem) ? (
											<AddFacetPopoverRowItemCategory
												id={`${id}-open-category`}
												key={rowItem}
												label={rowItem}
												onClick={onCategoryChange}
												isFocusable={screen.category === category}
											/>
										) : (
											<AddFacetPopoverRowItem
												badgeDefinition={rowItem}
												id={addFacetId}
												key={rowItem.properties.label}
												label={rowItem.properties.label}
												onClick={onRowClick}
												isFocusable={screen.category === category}
												badges={badges}
												t={t}
											/>
										),
									)}
								</div>
							</Rich.Layout.Body>
						</div>
					) : null,
				)}
			</div>
		</div>
	);
};

AddFacetPopover.propTypes = {
	id: PropTypes.string.isRequired,
	initialFilterValue: PropTypes.string,
	badgesDefinitions: badgesFacetedPropTypes,
	badgesDefinitionsSort: PropTypes.func,
	badges: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};
