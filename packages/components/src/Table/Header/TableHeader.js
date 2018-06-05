import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableHeaderCell from './TableHeaderCell';
import TableSortHeader from './TableSortHeader';
import theme from './TableHeader.scss';

function getHeaderComponent(column, onSortChange) {
	if (column.headRenderer) {
		return column.headRenderer;
	}
	if (onSortChange && column.sorter) {
		return TableSortHeader;
	}
	return TableHeaderCell;
}

function renderHeaderCell(column, onSortChange) {
	const HeaderComponent = getHeaderComponent(column, onSortChange);
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
				onSortChange={onSortChange}
			/>
		</th>
	);
}

/**
 * This component displays the header of the table.
 */
export default function TableHeader({ columns, classnames, onSortChange }) {
	return (
		<thead
			className={classNames(
				'tc-table-head',
				theme['tc-table-head'],
				classnames && classnames.header,
			)}
		>
			<tr className={theme['tc-table-head-row']}>
				{columns.map(column => renderHeaderCell(column, onSortChange))}
			</tr>
		</thead>
	);
}

TableHeader.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired, // column key
			label: PropTypes.string, // label to display
			headClassName: PropTypes.string, // header classname
			headRenderer: PropTypes.func, // header renderer
			headExtraProps: PropTypes.object, // header extra props
			sorter: PropTypes.object,
		}),
	).isRequired,
	classnames: PropTypes.shape({
		header: PropTypes.string,
	}),
	onSortChange: PropTypes.func,
};
