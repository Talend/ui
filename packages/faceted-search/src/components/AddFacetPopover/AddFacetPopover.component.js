import { createRef, useCallback, useRef, useState } from 'react';

import isString from 'lodash/isString';
import times from 'lodash/times';
import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';

import { Form, StackVertical } from '@talend/design-system';

import { badgesFacetedPropTypes } from '../facetedSearch.propTypes';
import { AddFacetPopoverHeader } from './AddFacetPopoverHeader';
import { AddFacetPopoverRowItem, AddFacetPopoverRowItemCategory } from './AddFacetPopoverRow';

import styles from './AddFacetPopover.module.scss';

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

	const onFilter = event => {
		setFilterValue(event?.target?.value || '');
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
		<div id={addFacetId} className={styles['tc-add-facet-popover']}>
			{screens.map((screen, index) =>
				category === screen.category ? (
					<Form key={`screen-${screen.category}`} ref={screensRef.current[index]}>
						<AddFacetPopoverHeader
							id={`${addFacetId}-${category}`}
							category={screen.category}
							onCategoryChange={onCategoryChange}
							onFilter={onFilter}
							filterValue={filterValue}
							t={t}
						/>
						<div
							className={styles['tc-add-facet-popover-items']}
							data-test="add-facet-popover-items"
							data-testid="add-facet-popover-items"
						>
							<StackVertical gap="0">
								{filterValue !== '' &&
									!screen.rows.length &&
									t('ADD_FACET_FILTER_NO_RESULT', 'No result found')}
								{screen.rows.map(rowItem =>
									isString(rowItem) ? (
										<AddFacetPopoverRowItemCategory
											id={`${id}-open-category`}
											key={rowItem}
											label={rowItem}
											onClick={onCategoryChange}
										/>
									) : (
										<AddFacetPopoverRowItem
											badgeDefinition={rowItem}
											id={addFacetId}
											key={rowItem.properties.label}
											label={rowItem.properties.label}
											onClick={onRowClick}
											badges={badges}
											t={t}
										/>
									),
								)}
							</StackVertical>
						</div>
					</Form>
				) : null,
			)}
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
