import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableHeaderCell from './TableHeaderCell';
import TableSortHeader from './TableSortHeader';
import theme from './TableHeader.scss';

function getHeaderComponent(column, sorters, onSortChange) {
	if (column.headRenderer) {
		return column.headRenderer;
	}
	if (onSortChange && sorters && sorters[column.key]) {
		return TableSortHeader;
	}
	return TableHeaderCell;
}

function renderHeaderCell(column, sorters, onSortChange) {
	const HeaderComponent = getHeaderComponent(column, sorters, onSortChange);
	const thKey = `th-${column.key}`;
	const cellClassnames = classNames(
		'tc-table-head-label',
		theme['tc-table-head-label'],
		column.headClassName,
	);
	return (
		<th key={thKey} className={classNames(thKey, theme['tc-table-head-th'])}>
			<HeaderComponent
				key={column.key}
				column={column}
				className={cellClassnames}
				sorter={sorters && sorters[column.key]}
				onSortChange={onSortChange}
			/>
		</th>
	);
}

/**
 * This component displays the header of the table.
 */
export default function TableHeader({ columns, classnames, sorters, onSortChange }) {
	return (
		<thead
			className={classNames(
				'tc-table-head',
				theme['tc-table-head'],
				classnames && classnames.header,
			)}
		>
			<tr className={theme['tc-table-head-row']}>
				{columns.map(column => renderHeaderCell(column, sorters, onSortChange))}
			</tr>
		</thead>
	);
}

TableHeader.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			label: PropTypes.string,
			headClassName: PropTypes.string,
			headRenderer: PropTypes.func,
			headExtraProps: PropTypes.object,
		}),
	).isRequired,
	classnames: PropTypes.shape({
		header: PropTypes.string,
	}),
	sorters: PropTypes.object,
	onSortChange: PropTypes.func,
};
