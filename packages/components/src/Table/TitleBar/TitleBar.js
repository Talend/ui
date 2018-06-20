import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FiltersBar from '../Filters/FiltersBar';
import theme from './TitleBar.scss';

export function displayFilters(filters) {
	return filters && filters.length > 0;
}

/**
 * This component is responsible for rendering the title bar of the table component.
 * It renders a title and a set of filters.
 */
export default function TitleBar({ title, filters, onFilterChange }) {
	return (
		<div className={classnames('tc-table-title-bar', theme['tc-table-title-bar'])}>
			{title && (
				<span className={classnames('tc-table-title', theme['tc-table-title'])}>{title}</span>
			)}
			{displayFilters(filters) && <FiltersBar filters={filters} onFilterChange={onFilterChange} />}
		</div>
	);
}

TitleBar.propTypes = {
	title: PropTypes.string,
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
