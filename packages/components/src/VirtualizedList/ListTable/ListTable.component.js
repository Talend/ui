import React, { PropTypes } from 'react';
import { Table as VirtualizedTable } from 'react-virtualized';
import { toColumns } from '../utils/tablerow';

import theme from './ListTable.scss';

/**
 * List renderer that enhances the Field configuration an render a react-virtualized Table
 */
function ListTable(props) {
	const {
		children,
		collection,
		height,
		id,
		sort,
		sortBy,
		sortDirection,
		width,
	} = props;
	return (
		<VirtualizedTable
			className={theme['tc-list-table']}
			gridClassName={theme.grid}
			headerHeight={35}
			height={height}
			id={id}
			rowClassName={theme.row}
			rowCount={collection.length}
			rowGetter={({ index }) => collection[index]}
			rowHeight={50}
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
	sort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	width: PropTypes.number,
};

export default ListTable;
