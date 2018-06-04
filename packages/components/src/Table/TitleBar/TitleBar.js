import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FiltersBar from '../Filters/FiltersBar';
import theme from './TitleBar.scss';

export function displayFilters(filters) {
	return filters && filters.length > 0;
}

export default function TitleBar({
	title,
	filters,
  onFilterChange,
	classnames,
}) {
	return (
		<div className={classNames('tc-table-title-bar', theme['tc-table-title-bar'], classnames && classnames.titleBar)}>
			{title && (
				<span className={classNames('tc-table-title', theme['tc-table-title'], classnames && classnames.title)}>
					{title}
				</span>
			)}
			{displayFilters(filters) && (
				<FiltersBar
					classnames={classnames}
					filters={filters}
					onFilterChange={onFilterChange}
				/>
			)}
		</div>
	);
}

TitleBar.propTypes = {
	title: PropTypes.string,
	classnames: PropTypes.shape({
		titleBar: PropTypes.string,
		title: PropTypes.string,
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
