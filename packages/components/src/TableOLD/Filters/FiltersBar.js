import React from 'react';
import PropTypes from 'prop-types';

function renderFilter(filter, filtersRenderer, onFilterChange) {
	const filterId = filter.getId();
	const FilterComponent = filtersRenderer.getFilterComponent(filterId);
	const extraProps = filtersRenderer.getExtraProps(filterId);
	if (FilterComponent) {
		return (
			<FilterComponent
				className={'tc-filter'}
				key={filterId}
				filter={filter}
				onFilterChange={onFilterChange}
				extra={extraProps}
			/>
		);
	}
	return null;
}

export default function FiltersBar({ filters, filtersRenderer, onFilterChange, className }) {
	return (
		<div className={className}>
			{filters.map(filter => renderFilter(filter, filtersRenderer, onFilterChange))}
		</div>
	);
}

FiltersBar.propTypes = {
	filters: PropTypes.array,
	filtersRenderer: PropTypes.object,
	onFilterChange: PropTypes.func,
	className: PropTypes.string,
};
