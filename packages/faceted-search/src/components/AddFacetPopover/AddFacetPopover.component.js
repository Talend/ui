import React, { useState, useMemo, useRef, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import { getTheme } from '@talend/react-components/lib/theme';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';
import FilterBar from '@talend/react-components/lib/FilterBar';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';
import Icon from '@talend/react-components/lib/Icon';
import isString from 'lodash/isString';
import isNull from 'lodash/isNull';
import times from 'lodash/times';

import cssModule from './AddFacetPopover.scss';
import { badgesFacetedPropTypes, badgeFacetedPropTypes } from '../facetedSearch.propTypes';

const theme = getTheme(cssModule);

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
			<div className={theme('tc-add-facet-popover-row-text')}>
				{label}
			</div>
			<Icon
				className={theme('tc-add-facet-popover-row-icon')}
				name="talend-chevron-left"
			/>
		</Button>
	</TooltipTrigger>
);

OpenCategoryRow.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isFocusable: PropTypes.bool.isRequired,
};

const AddFacetRow = ({ badgeDefinition, id, label, onClick, isFocusable }) => {
	const onClickRow = event => {
		onClick(event, badgeDefinition);
	};
	return (
		<TooltipTrigger label={label} tooltipPlacement="top">
			<Button
				aria-label={label}
				bsStyle="link"
				className={theme('tc-add-facet-popover-row')}
				id={`${id}-row-button-${label}`}
				label={label}
				onClick={onClickRow}
				role="button"
				tabIndex={getTabIndex(isFocusable)}
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
};

const AddFacetPopoverHeader = ({ category, onCategoryChange, id, resetFilter, onFilter, filterValue, t, isFocusable }) => (
	<RichLayout.Header className={theme('tc-add-facet-popover-header')} id={`${id}-header`}>
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
				<span className={theme('tc-add-facet-popover-category-title')}>
					{category}
				</span>
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
			disabled={getTabIndex(isFocusable)}
		/>
	</RichLayout.Header>
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

const sortByLabel = (rowA, rowB) => {
	const labelA = isString(rowA) ? rowA : rowA.properties.label;
	const labelB = isString(rowB) ? rowB : rowB.properties.label;

	return labelA.localeCompare(labelB);
};

const AddFacetPopover = ({ badgesDefinitions = [], id, initialFilterValue, onClick, t }) => {
	const addFacetId = `${id}-add-facet-popover`;

	const [category, setCategory] = useState(null);
	const [filterValue, setFilterValue] = useState(initialFilterValue || '')

	const categories = useMemo(
		() =>
			badgesDefinitions
				.filter(badgeDefinition => !!badgeDefinition.metadata.category)
				.map(badgeDefinition => badgeDefinition.metadata.category)
				.filter((categoryName, index, arr) => arr.indexOf(categoryName) === index),
		[badgesDefinitions],
	);

	const screensCount = categories.length + 1;
	const [screensHeight, setScreensHeight] = useState(times(screensCount, () => 0));
	const screensRef = useRef(times(screensCount, createRef));

	useEffect(() => {
		setScreensHeight(times(screensCount, index => screensRef.current[index].current.clientHeight));
	}, []);

	const onFilter = (_, value) => {
		setFilterValue(value);
	};
	const resetFilter = () => setFilterValue('');

	const onCategoryChange = newCategory => {
		setCategory(newCategory);
		resetFilter();
	};

	const badgesWithoutCategory = useMemo(
		() =>
			badgesDefinitions.filter(badgeDefinition => !badgeDefinition.metadata.category),
		[badgesDefinitions],
	);

	const screens = [
		{
			category: null,
			rows: useMemo(
				() =>
					[...categories, ...badgesWithoutCategory]
						.sort(sortByLabel)
						.filter(filterByLabel(filterValue)),
				[badgesDefinitions, filterValue]
			),
		},
		...categories.map(categoryName => ({
			category: categoryName,
			rows: useMemo(
				() => badgesDefinitions
					.filter(badgeDefinition => badgeDefinition.metadata.category === categoryName)
					.filter(filterByLabel(filterValue))
					.sort(sortByLabel),
				[filterValue]
			),
		})),
	];

	const categoryScreenIndex = screens.findIndex(screen => screen.category === category);

	return (
		<div
			id={addFacetId}
			className={theme('tc-add-facet-popover')}
		>
			<div
				id={addFacetId}
				className={theme('tc-add-facet-popover-container')}
				style={{
					height: screensHeight[categoryScreenIndex],
					maxHeight: screensHeight[categoryScreenIndex],
				}}
			>
				{screens.map((screen, index) => (
					<div
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

						<RichLayout.Body id={`${addFacetId}-${category}-body`}>
							<div className={theme('tc-add-facet-popover-row-container')}>
								{filterValue !== '' && !screen.rows.length && (
									<span className={theme('tc-add-facet-popover-filter-empty')}>
										{t('ADD_FACET_FILTER_NO_RESULT', {
											defaultValue: 'No result found',
										})}
									</span>
								)}
								{screen.rows.map(rowItem =>
									(isString(rowItem) ? (
										<OpenCategoryRow
											id={'open-category-row'}
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
										/>
									)),
								)}
							</div>
						</RichLayout.Body>
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
	onClick: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { AddFacetPopover };
