import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './FiltersBar.scss';

function getFiltersBarClassName(classnames) {
	if (classnames && classnames.filtersBar) {
		return classnames.filtersBar;
	}
	return null;
}

function renderFilter(filterInfo, onFilterChange) {
	const filter = filterInfo.filter;
	const FilterComponent = filterInfo.renderer;
	return (
		<FilterComponent
			className={classNames('tc-filter', theme['tc-filter'], filterInfo.className)}
			key={filter.getId()}
			filter={filter}
			onFilterChange={onFilterChange}
			extra={filterInfo.extra}
		/>
	);
}

export default function FiltersBar({ filters, onFilterChange, classnames }) {
	return (
		<div className={classNames('tc-table-filters-bar', theme['tc-table-filters-bar'], getFiltersBarClassName(classnames))}>
			{filters.map(filter => renderFilter(filter, onFilterChange))}
		</div>
	);
}

FiltersBar.propTypes = {
	classnames: PropTypes.shape({
		filtersBar: PropTypes.string,
	}),
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			filter: PropTypes.object,
			renderer: PropTypes.func,
			className: PropTypes.string,
			extra: PropTypes.object,
		}),
	),
	onFilterChange: PropTypes.func,
};
