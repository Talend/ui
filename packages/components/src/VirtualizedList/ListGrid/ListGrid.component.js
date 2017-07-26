import React, { PropTypes } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import getRowSelectionRenderer from '../RowSelection';
import NoRows from '../NoRows';

import theme from './ListGrid.scss';

/**
 * List renderer that accepts a custom row renderer.
 * The row renderer will create a row element for each collection item.
 */
function ListGrid(props) {
	const {
		children,
		id,
		height,
		isActive,
		isSelected,
		onRowClick,
		rowHeight,
		rowRenderer,
		selectionToggle,
		width,
	} = props;

	const enhancedRowRenderer = selectionToggle || onRowClick ?
		getRowSelectionRenderer(
			rowRenderer,
			{
				isActive,
				isSelected,
				getRowData: ({ index }) => this.props.collection[index],
			}
		) : rowRenderer;

	return (
		<VirtualizedList
			className={theme['tc-list-list']}
			collection={props.collection}
			id={id}
			height={height}
			overscanRowCount={10}
			noRowsRenderer={NoRows}
			rowCount={props.collection.length}
			rowHeight={rowHeight}
			rowRenderer={enhancedRowRenderer}
			rowGetter={index => props.collection[index]}
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
	isActive: PropTypes.func,
	isSelected: PropTypes.func,
	onRowClick: PropTypes.func,
	rowHeight: PropTypes.number,
	rowRenderer: PropTypes.func,
	selectionToggle: PropTypes.func,
	width: PropTypes.number,
};


ListGrid.defaultProps = {
	rowHeight: 135,
};

export default ListGrid;
