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

const OpenCategoryRow = ({ label, onClick }) => (
	<TooltipTrigger label={label} tooltipPlacement="top">
		<Button
			aria-label={label}
			bsStyle="link"
			className={theme('tc-add-facet-popover-row')}
			id={`$row-button-${label}`}
			label={label}
			onClick={() => onClick(label)}
			role="button"
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
};

const AddFacetRow = ({ badgeDefinition, id, label, onClick }) => {
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
};

const AddFacetPopoverHeader = ({ category, setCategory, id, resetFilter, onFilter, filterValue, t }) => (
	<RichLayout.Header
		className={theme('tc-add-facet-popover-header')}
		id={`${id}-header`}
	>
		{!isNull(category) && (
			<div className={theme('tc-add-facet-popover-category')}>
				<Button
					bsStyle="link"
					onClick={() => setCategory(null)}
					role="button"
					className={theme('tc-add-facet-popover-category-btn')}
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
		/>
	</RichLayout.Header>
);

AddFacetPopoverHeader.propTypes = {
	category: PropTypes.string,
	setCategory: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	resetFilter: PropTypes.func.isRequired,
	onFilter: PropTypes.func.isRequired,
	filterValue: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

const filterByLabel = label => badgeDefinition =>
	badgeDefinition.properties.label.toLowerCase().includes(label);

const sortByLabel = (badgeDefinitionA, badgeDefinitionB) =>
	badgeDefinitionA.properties.label.localeCompare(badgeDefinitionB.properties.label);

const AddFacetPopover = ({ badgesDefinitions = [], id, initialFilterValue, onClick, t }) => {
	const addFacetId = `${id}-add-facet-popover`;

	const [category, setCategory] = useState(null);
	const [filterValue, setFilterValue] = useState(initialFilterValue || '');

	const badgesDefinitionsFaceted = useMemo(
		() =>
			badgesDefinitions.filter(filterByLabel(filterValue.toLowerCase().trim())).sort(sortByLabel),
		[badgesDefinitions, filterValue],
	);

	const categories = useMemo(
		() => badgesDefinitionsFaceted
			.filter(badgeDefinition => !!badgeDefinition.metadata.category)
			.map(badgeDefinition => badgeDefinition.metadata.category)
			.filter((categoryName, index, arr) => arr.indexOf(categoryName) === index),
		[badgesDefinitionsFaceted]
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


	const badgesWithoutCategory = badgesDefinitionsFaceted
		.filter(badgeDefinition => !badgeDefinition.metadata.category);

	const screens = [
		{
			category: null,
			rows: [
				...categories,
				...badgesWithoutCategory,
			],
		},
		...categories.map(categoryName => ({
			category: categoryName,
			rows: badgesDefinitionsFaceted
				.filter(badgeDefinition => badgeDefinition.metadata.category === categoryName),
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
				style={{ maxHeight: screensHeight[categoryScreenIndex] }}
			>
				{screens.map((screen, index) => (
					<div
						ref={screensRef.current[index]}
						className={classNames(
							theme('tc-add-facet-popover-screen'),
							{
								[theme('screen-category')]: !isNull(screen.category),
								[theme('screen-move')]: !!category && isNull(screen.category) || category && screen.category === category,
							},
						)}
					>
						<AddFacetPopoverHeader
							id={`${addFacetId}-${category}`}
							category={screen.category}
							setCategory={setCategory}
							resetFilter={resetFilter}
							onFilter={onFilter}
							filterValue={filterValue}
							t={t}
						/>

						<RichLayout.Body id={`${addFacetId}-${category}-body`}>
							<div className={theme('tc-add-facet-popover-row-container')}>
								{filterValue !== '' && !badgesDefinitionsFaceted.length && (
									<span className={theme('tc-add-facet-popover-filter-empty')}>
										{t('ADD_FACET_FILTER_NO_RESULT', {
											defaultValue: 'No result found',
										})}
									</span>
								)}
								{screen.rows.map(rowItem => (isString(rowItem) ?
									(
										<OpenCategoryRow
											id={'open-category-row'}
											key={rowItem}
											label={rowItem}
											onClick={setCategory}
										/>
									) : (
										<AddFacetRow
											badgeDefinition={rowItem}
											id={addFacetId}
											key={rowItem.properties.label}
											label={rowItem.properties.label}
											onClick={onClick}
										/>
									))
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
