import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getTheme } from '@talend/react-components/lib/theme';
import RichLayout from '@talend/react-components/lib/RichTooltip/RichLayout';
import Action from '@talend/react-components/lib/Actions/Action';
import FilterBar from '@talend/react-components/lib/FilterBar';

import cssModule from './AddFacetPopover.scss';
import { badgesFacetedPropTypes, badgeFacetedPropTypes } from '../facetedSearch.propTypes';

const theme = getTheme(cssModule);

const AddFacetRow = ({ badgeDefinition, id, label, onClick }) => {
	const onClickRow = event => {
		onClick(event, badgeDefinition);
	};
	return (
		<Action
			className={theme('tc-add-facet-popover-row')}
			id={`${id}-row-button-${label}`}
			onClick={onClickRow}
			label={label}
			link
			role="button"
		/>
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

const AddFacetPopover = ({ badgesDefinitions = [], id, initialFilterValue, onClick, t }) => {
	const [filterValue, setFilterValue] = useState(initialFilterValue || '');
	const onFilter = (_, value) => {
		setFilterValue(value);
	};
	const resetFilter = () => setFilterValue('');
	const badgesDefinitionsFaceted = useMemo(
		() => badgesDefinitions.filter(filterByLabel(filterValue.toLowerCase().trim())),
		[badgesDefinitions, filterValue],
	);
	const addFacetId = `${id}-add-facet-popover`;
	return (
		<div id={addFacetId} className={theme('tc-add-facet-popover')}>
			<RichLayout.Header id={addFacetId}>
				{t('TITLE_HEADER_FACETED_SEARCH', { defaultValue: 'Faceted Search' })}
			</RichLayout.Header>
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
				{badgesDefinitionsFaceted.map(badgeDefinition => (
					<AddFacetRow
						badgeDefinition={badgeDefinition}
						id={addFacetId}
						key={badgeDefinition.properties.label}
						label={badgeDefinition.properties.label}
						onClick={onClick}
					/>
				))}
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
