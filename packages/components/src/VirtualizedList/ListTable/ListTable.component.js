import React, { PropTypes } from 'react';
import {
	Table as VirtualizedTable,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import RowSelectionRenderer from '../RowSelection';
import { toColumns } from '../utils/tablerow';

import theme from './ListTable.scss';

/**
 * List renderer that renders a react-virtualized Table
 */
function ListTable(props) {
	const {
		children,
		collection,
		height,
		id,
		isSelected,
		selectionToggle,
		sort,
		sortBy,
		sortDirection,
		width,
	} = props;

	const RowTableRenderer = selectionToggle ?
		RowSelectionRenderer( // eslint-disable-line new-cap
			DefaultTableRowRenderer,
			{
				isSelected,
				getRowData: rowProps => rowProps.rowData,
			}) :
		DefaultTableRowRenderer;

	return (
		<VirtualizedTable
			className={`tc-list-table ${theme['tc-list-table']}`}
			gridClassName={theme.grid}
			headerHeight={35}
			height={height}
			id={id}
			rowClassName={theme.row}
			rowCount={collection.length}
			rowGetter={({ index }) => collection[index]}
			rowHeight={50}
			rowRenderer={RowTableRenderer}
			sort={sort}
			sortBy={sortBy}
			sortDirection={sortDirection}
			width={width}
		>
			{toColumns(id, theme, children)}
		</VirtualizedTable>
	);
}
ListTable.displayName = 'VirtualizedList(ListTable)';
ListTable.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	collection: PropTypes.arrayOf(PropTypes.object),
	height: PropTypes.number,
	id: PropTypes.string,
	isSelected: PropTypes.func,
	selectionToggle: PropTypes.func,
	sort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	width: PropTypes.number,
};

export default ListTable;
