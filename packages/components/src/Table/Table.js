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
 * The columnKeys array provides the column keys. These keys are used to get the element data.
 * The rowRenderer object provides the components used to display the element data.
 * The headerRenderer object provides the components used to display the table header.
 * If the headerRenderer is null or undefined, no header is displayed.
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
			key: PropTypes.string.isRequired, // column key
			label: PropTypes.string, // label to display
			headClassName: PropTypes.string, // header classname
			headRenderer: PropTypes.func, // header renderer
			headExtraProps: PropTypes.object, // header extra props
			cellClassName: PropTypes.string, // cell classname
			cellRenderer: PropTypes.func, // cell renderer
			cellExtraProps: PropTypes.object, // cell extra props
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
