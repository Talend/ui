import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './FiltersBar.scss';

function renderFilter(filter, onFilterChange) {
	const FilterComponent = filter.renderer;
	return (
		<FilterComponent
			key={filter.id}
			filter={filter}
			onFilterChange={onFilterChange}
			{...filter.rendererProps}
		/>
	);
}

/**
 * This component is responsible for rendering a set of filters.
 */
export default function FiltersBar({ filters, onFilterChange }) {
	return (
		<form className={classnames('tc-table-filters-bar', theme['tc-table-filters-bar'])}>
			{filters.map(filter => renderFilter(filter, onFilterChange))}
		</form>
	);
}

FiltersBar.propTypes = {
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			active: PropTypes.bool.isRequired,
			params: PropTypes.object,
			match: PropTypes.func.isRequired,
			renderer: PropTypes.func.isRequired,
			rendererProps: PropTypes.object,
		}),
	),
	onFilterChange: PropTypes.func,
};
