import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getTheme } from '@talend/react-components/lib/theme';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';
import FilterBar from '@talend/react-components/lib/FilterBar';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';

import cssModule from './AddFacetPopover.scss';
import { badgesFacetedPropTypes, badgeFacetedPropTypes } from '../facetedSearch.propTypes';

const theme = getTheme(cssModule);

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

const filterByLabel = label => badgeDefinition =>
	badgeDefinition.properties.label.toLowerCase().includes(label);

const sortByLabel = (badgeDefinitionA, badgeDefinitionB) =>
	badgeDefinitionA.properties.label.localeCompare(badgeDefinitionB.properties.label);

const AddFacetPopover = ({ badgesDefinitions = [], id, initialFilterValue, onClick, t }) => {
	const [filterValue, setFilterValue] = useState(initialFilterValue || '');
	const onFilter = (_, value) => {
		setFilterValue(value);
	};
	const resetFilter = () => setFilterValue('');
	const badgesDefinitionsFaceted = useMemo(
		() =>
			badgesDefinitions.filter(filterByLabel(filterValue.toLowerCase().trim())).sort(sortByLabel),
		[badgesDefinitions, filterValue],
	);
	const addFacetId = `${id}-add-facet-popover`;
	return (
		<div id={addFacetId} className={theme('tc-add-facet-popover')}>
			<RichLayout.Body id={addFacetId}>
				<FilterBar
					autoFocus={false}
					className={theme('tc-add-facet-popover-filter')}
					dockable={false}
					docked={false}
					iconAlwaysVisible
					id={`${addFacetId}-filter`}
					placeholder={t('ADD_FACET_FILTER_PLACEHOLDER', {
						defaultValue: 'Find a filter',
					})}
					onToggle={resetFilter}
					onFilter={onFilter}
					value={filterValue}
				/>
				<div className={theme('tc-add-facet-popover-row-container')}>
					{badgesDefinitionsFaceted.map(badgeDefinition => (
						<AddFacetRow
							badgeDefinition={badgeDefinition}
							id={addFacetId}
							key={badgeDefinition.properties.label}
							label={badgeDefinition.properties.label}
							onClick={onClick}
						/>
					))}
				</div>
			</RichLayout.Body>
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
