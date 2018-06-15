import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './FiltersBar.scss';

function renderFilter(filterItem, onFilterChange) {
	const filter = filterItem.filter;
	const FilterComponent = filterItem.renderer;
	return (
		<FilterComponent
			className={classNames('tc-filter', theme['tc-filter'], filterItem.className)}
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
export default function FiltersBar({ filters, onFilterChange, classnames }) {
	return (
		<div
			className={classNames(
				'tc-table-filters-bar',
				theme['tc-table-filters-bar'],
				classnames && classnames.filtersBar,
			)}
		>
			{filters.map(item => renderFilter(item, onFilterChange))}
		</div>
	);
}

FiltersBar.propTypes = {
	classnames: PropTypes.shape({
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
