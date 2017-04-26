import React, { PropTypes } from 'react';
import {
	Table as VirtualizedTable,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import RowTableSelectionRenderer from '../RowTable';
import { insertSelectionConfiguration, toColumns } from '../utils/tablerow';

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
		isSelected,
		selectionToggle,
		sort,
		sortBy,
		sortDirection,
		width,
	} = props;

	const contentsConfiguration = insertSelectionConfiguration({
		children,
		isSelected,
		selectionToggle,
	});

	const RowTableRenderer = selectionToggle ?
		RowTableSelectionRenderer(DefaultTableRowRenderer, props) :
		DefaultTableRowRenderer;

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
			rowRenderer={RowTableRenderer}
			sort={sort}
			sortBy={sortBy}
			sortDirection={sortDirection}
			width={width}
		>
			{toColumns(id, theme, contentsConfiguration)}
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
