import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './FiltersBar.scss';

function renderFilter(filterItem, onFilterChange) {
	const filter = filterItem.filter;
	const FilterComponent = filterItem.renderer;
	return (
		<FilterComponent
			className={classnames('tc-filter', theme['tc-filter'], filterItem.className)}
			key={filter.getId()}
			filter={filter}
			onFilterChange={onFilterChange}
			{...filterItem.rendererProps}
		/>
	);
}

/**
 * This component is responsible for rendering a set of filters.
 */
export default function FiltersBar({ filters, onFilterChange, classNames }) {
	return (
		<div
			className={
				classnames(
					'tc-table-filters-bar',
					theme['tc-table-filters-bar'],
					classNames && classNames.filtersBar
				)
			}
		>
			{filters.map(item => renderFilter(item, onFilterChange))}
		</div>
	);
}

FiltersBar.propTypes = {
	classNames: PropTypes.shape({
		filtersBar: PropTypes.string,
	}),
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			filter: PropTypes.object.isRequired,
			renderer: PropTypes.func.isRequired,
			rendererProps: PropTypes.object,
			className: PropTypes.string,
		}),
	),
	onFilterChange: PropTypes.func,
};
