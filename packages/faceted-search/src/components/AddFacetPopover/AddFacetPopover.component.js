import React, { useState, useRef, createRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import isNaN from 'lodash/isNaN';
import classNames from 'classnames';
import { getTheme } from '@talend/react-components/lib/theme';
import { Rich } from '@talend/react-components';
import FilterBar from '@talend/react-components/lib/FilterBar';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';
import Icon from '@talend/react-components/lib/Icon';
import isString from 'lodash/isString';
import isNull from 'lodash/isNull';
import times from 'lodash/times';
import constant from 'lodash/constant';
import uniq from 'lodash/uniq';

import cssModule from './AddFacetPopover.scss';
import { badgesFacetedPropTypes, badgeFacetedPropTypes } from '../facetedSearch.propTypes';

const theme = getTheme(cssModule);

const filterByAttribute = badgeDefinition => badge =>
	badge.properties.attribute === badgeDefinition.properties.attribute;

const isButtonDisabled = (badges, badgeDefinition, occurences) => {
	const badgePerFacet = parseInt(badgeDefinition.metadata.badgePerFacet, 10);

	if (isNaN(badgePerFacet)) {
		return false;
	}

	return occurences >= badgePerFacet;
};

const getTabIndex = isFocusable => (isFocusable ? 0 : -1);

const OpenCategoryRow = ({ label, onClick, isFocusable }) => (
	<TooltipTrigger label={label} tooltipPlacement="top">
		<Button
			aria-label={label}
			bsStyle="link"
			className={theme('tc-add-facet-popover-row')}
			id={`$row-button-${label}`}
			label={label}
			onClick={() => onClick(label)}
			role="button"
			tabIndex={getTabIndex(isFocusable)}
		>
			<div className={theme('tc-add-facet-popover-row-text')}>{label}</div>
			<Icon className={theme('tc-add-facet-popover-row-icon')} name="talend-chevron-left" />
		</Button>
	</TooltipTrigger>
);

OpenCategoryRow.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isFocusable: PropTypes.bool.isRequired,
};

const AddFacetRow = ({ badgeDefinition, id, label, onClick, isFocusable, badges, t }) => {
	const occurences = useMemo(() => badges.filter(filterByAttribute(badgeDefinition)).length, [
		badges,
		badgeDefinition,
	]);
	const isDisabled = useMemo(() => isButtonDisabled(badges, badgeDefinition, occurences), [
		badges,
		badgeDefinition,
		occurences,
	]);
	const onClickRow = event => {
		onClick(event, badgeDefinition);
	};

	const disabledLabel = t('ADD_FACET_ROW_DISABLED_LABEL', {
		count: occurences,
		badgeLabel: label,
		defaultValue: 'You can only apply the {{badgeLabel}} filter once',
		defaultValue_plural: 'You can only apply the {{badgeLabel}} filter {{count}} times',
	});

	return (
		<TooltipTrigger label={isDisabled ? disabledLabel : label} tooltipPlacement="top">
			<Button
				aria-label={label}
				bsStyle="link"
				className={theme('tc-add-facet-popover-row')}
				id={`${id}-row-button-${label}`}
				label={label}
				onClick={onClickRow}
				role="button"
				tabIndex={getTabIndex(isFocusable)}
				disabled={isDisabled}
			>
				<div className={theme('tc-add-facet-popover-row-text')}>{label}</div>
			</Button>
		</TooltipTrigger>
	);
};

AddFacetRow.propTypes = {
	id: PropTypes.string.isRequired,
	badgeDefinition: badgeFacetedPropTypes.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isFocusable: PropTypes.bool.isRequired,
	badges: PropTypes.array.isRequired,
	t: PropTypes.func.isRequired,
};

const AddFacetPopoverHeader = ({
	category,
	onCategoryChange,
	id,
	resetFilter,
	onFilter,
	filterValue,
	t,
	isFocusable,
}) => (
	<Rich.Layout.Header className={theme('tc-add-facet-popover-header')} id={`${id}-header`}>
		{!isNull(category) && (
			<div className={theme('tc-add-facet-popover-category')}>
				<Button
					bsStyle="link"
					onClick={() => onCategoryChange(null)}
					role="button"
					className={theme('tc-add-facet-popover-category-btn')}
					tabIndex={getTabIndex(isFocusable)}
				>
					<Icon name="talend-arrow-left" />
				</Button>
				<span className={theme('tc-add-facet-popover-category-title')}>{category}</span>
			</div>
		)}
		<FilterBar
			autoFocus={false}
			className={theme('tc-add-facet-popover-filter')}
			dockable={false}
			docked={false}
			iconAlwaysVisible
			id={`${id}-filter`}
			placeholder={t('ADD_FACET_FILTER_PLACEHOLDER', {
				defaultValue: 'Find a filter',
			})}
			onToggle={resetFilter}
			onFilter={onFilter}
			value={filterValue}
			disabled={!isFocusable}
		/>
	</Rich.Layout.Header>
);

AddFacetPopoverHeader.propTypes = {
	category: PropTypes.string,
	onCategoryChange: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	resetFilter: PropTypes.func.isRequired,
	onFilter: PropTypes.func.isRequired,
	filterValue: PropTypes.string.isRequired,
	isFocusable: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired,
};

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

const getScreens = (badgesDefinitions, filterValue) => {
	const categories = getCategories(badgesDefinitions);

	const badgesWithoutCategory = badgesDefinitions.filter(
		badgeDefinition => !badgeDefinition.metadata.category,
	);

	return [
		{
			category: null,
			rows: [...categories, ...badgesWithoutCategory]
				.sort(sortByLabel)
				.filter(filterByNotEmpty)
				.filter(filterByLabel(filterValue)),
		},
		...categories.map(categoryName => ({
			category: categoryName,
			rows: badgesDefinitions
				.filter(badgeDefinition => badgeDefinition.metadata.category === categoryName)
				.filter(filterByNotEmpty)
				.filter(filterByLabel(filterValue))
				.sort(sortByLabel),
		})),
	];
};

const AddFacetPopover = ({
	badgesDefinitions = [],
	badges,
	id,
	initialFilterValue,
	onClick,
	t,
}) => {
	const addFacetId = `${id}-add-facet-popover`;

	const [category, setCategory] = useState(null);
	const [filterValue, setFilterValue] = useState(initialFilterValue || '');
	const getScreensMemo = useCallback(() => getScreens(badgesDefinitions, filterValue), [
		badgesDefinitions,
		filterValue,
	]);
	const screens = getScreensMemo();
	const currentCategoryScreenIndex = screens.findIndex(screen => screen.category === category);

	const [screensHeight, setScreensHeight] = useState(times(screens.length, constant(0)));
	const screensRef = useRef(times(screens.length, createRef));

	useEffect(() => {
		setScreensHeight(
			times(screens.length, index => screensRef.current[index].current.clientHeight),
		);
	}, []);

	const onFilter = (_, value) => {
		setFilterValue(value);
	};
	const resetFilter = () => setFilterValue('');

	const onCategoryChange = newCategory => {
		setCategory(newCategory);
		resetFilter();
	};

	return (
		<div id={addFacetId} className={theme('tc-add-facet-popover')}>
			<div
				id={addFacetId}
				className={theme('tc-add-facet-popover-container')}
				style={{
					height: screensHeight[currentCategoryScreenIndex],
				}}
			>
				{screens.map((screen, index) => (
					<div
						key={`screen-${screen.category}`}
						ref={screensRef.current[index]}
						className={classNames(theme('tc-add-facet-popover-screen'), {
							[theme('screen-category')]: !isNull(screen.category),
							[theme('screen-move')]:
								(!!category && isNull(screen.category)) ||
								(category && screen.category === category),
						})}
					>
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
										{t('ADD_FACET_FILTER_NO_RESULT', {
											defaultValue: 'No result found',
										})}
									</span>
								)}
								{screen.rows.map(rowItem =>
									isString(rowItem) ? (
										<OpenCategoryRow
											id="open-category-row"
											key={rowItem}
											label={rowItem}
											onClick={onCategoryChange}
											isFocusable={screen.category === category}
										/>
									) : (
										<AddFacetRow
											badgeDefinition={rowItem}
											id={addFacetId}
											key={rowItem.properties.label}
											label={rowItem.properties.label}
											onClick={onClick}
											isFocusable={screen.category === category}
											badges={badges}
											t={t}
										/>
									),
								)}
							</div>
						</Rich.Layout.Body>
					</div>
				))}
			</div>
		</div>
	);
};

AddFacetPopover.propTypes = {
	id: PropTypes.string.isRequired,
	initialFilterValue: PropTypes.string,
	badgesDefinitions: badgesFacetedPropTypes,
	badges: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { AddFacetPopover };
