import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableHeader from './Header/TableHeader';
import TableBody from './Body/TableBody';
import theme from './Table.scss';

/**
 * This component displays a table of elements.
 * Elements are provided as array.
 * An element is displayed in a row and is divided in multiple data.
 * The rowDataGetter object provides the data for each element.
 * The columns array provides the column configuration (see PropTypes below).
 * The table header is optional.
 */
export default function Table({
	elements,
	columns,
	classnames,
	rowDataGetter,
	withHeader,
	onScroll,
	onEnterRow,
	onLeaveRow,
}) {
	return (
		<table className={classNames('tc-table', theme['tc-table'], classnames && classnames.table)}>
			{withHeader && <TableHeader columns={columns} classnames={classnames} />}
			<TableBody
				elements={elements}
				columns={columns}
				classnames={classnames}
				rowDataGetter={rowDataGetter}
				onScroll={onScroll}
				onEnterRow={onEnterRow}
				onLeaveRow={onLeaveRow}
			/>
		</table>
	);
}

Table.propTypes = {
	elements: PropTypes.array.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			// used to identify a column
			key: PropTypes.string.isRequired,
			// label displayed in the column header
			label: PropTypes.string,
			// classname of the column header
			headClassName: PropTypes.string,
			/**
			 * Renderer used for the column header.
			 * If not specify, a default renderer is used.
			 */
			headRenderer: PropTypes.func,
			// optional extra props for the column header renderer above
			headExtraProps: PropTypes.object,
			// classname used for all the cell of the column
			cellClassName: PropTypes.string,
			/**
			 * Renderer used for the all the cells of the column.
			 * If not specify, a default renderer is used.
			 */
			cellRenderer: PropTypes.func,
			// optional extra props for the cell renderer above
			cellExtraProps: PropTypes.object,
		}),
	).isRequired,
	classnames: PropTypes.shape({
		table: PropTypes.string,
		header: PropTypes.string,
		body: PropTypes.string,
		rows: PropTypes.arrayOf(PropTypes.string),
	}),
	rowDataGetter: PropTypes.object,
	withHeader: PropTypes.bool,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
