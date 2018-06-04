import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './TableHeader.scss';
import TableHeaderCell from './TableHeaderCell';

function renderHeaderCell(column) {
	const HeaderComponent = column.headRenderer || TableHeaderCell;
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
				label={column.label}
				className={cellClassnames}
				extra={column.headExtraProps}
			/>
		</th>
	);
}

/**
 * This component displays the header of the table.
 */
export default function TableHeader({ columns, classnames }) {
	return (
		<thead
			className={classNames(
				'tc-table-head',
				theme['tc-table-head'],
				classnames && classnames.header,
			)}
		>
			<tr className={theme['tc-table-head-row']}>
				{columns.map(column => renderHeaderCell(column))}
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
		}),
	).isRequired,
	classnames: PropTypes.shape({
		header: PropTypes.string,
	}),
};
