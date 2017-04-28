import React, { PropTypes } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import RowSelectionRenderer from '../RowSelection';
import { getRowData } from '../utils/gridrow';

import theme from './ListGrid.scss';

function NoRow() {
	return (
		<div className={'tc-list-no-rows'}>
			No rows
		</div>
	);
}

/**
 * List renderer that accepts a custom row renderer.
 * The row renderer will create a row element for each collection item
 */
function ListGrid(props) {
	const {
		children,
		collection,
		id,
		height,
		isSelected,
		rowHeight,
		rowRenderer,
		selectionToggle,
		width,
	} = props;

	const enhancedRowRenderer = selectionToggle ?
		RowSelectionRenderer(
			rowRenderer,
			{
				isSelected,
				getRowData: ({ parent, index }) => getRowData(parent, index),
			}) :
		rowRenderer;

	return (
		<VirtualizedList
			className={theme['tc-list-list']}
			collection={collection}
			id={id}
			height={height}
			overscanRowCount={10}
			noRowsRenderer={NoRow}
			rowCount={collection.length}
			rowHeight={rowHeight}
			rowRenderer={enhancedRowRenderer}
			width={width}
		>
			{children}
		</VirtualizedList>
	);
}
ListGrid.displayName = 'VirtualizedList(ListGrid)';
ListGrid.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	collection: PropTypes.arrayOf(PropTypes.object),
	height: PropTypes.number,
	id: PropTypes.string,
	isSelected: PropTypes.func,
	rowHeight: PropTypes.number,
	rowRenderer: PropTypes.func,
	selectionToggle: PropTypes.func,
	width: PropTypes.number,
};
ListGrid.defaultProps = {
	rowHeight: 135,
};

export default ListGrid;
