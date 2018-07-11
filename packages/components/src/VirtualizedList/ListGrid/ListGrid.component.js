import PropTypes from 'prop-types';
import React from 'react';
import { List as VirtualizedList } from 'react-virtualized';

import getRowSelectionRenderer from '../RowSelection';

import theme from './ListGrid.scss';

/**
 * List renderer that accepts a custom row renderer.
 * The row renderer will create a row element for each collection item.
 */
function ListGrid(props) {
	const {
		children,
		collection,
		getComponent,
		id,
		height,
		isActive,
		isSelected,
		noRowsRenderer,
		onRowClick,
		onRowDoubleClick,
		rowHeight,
		rowRenderer,
		width,
	} = props;

	let enhancedRowRenderer = rowRenderer;
	if (isActive || isSelected) {
		enhancedRowRenderer = getRowSelectionRenderer(rowRenderer, {
			isActive,
			isSelected,
			getRowData: ({ index }) => collection[index],
		});
	}

	return (
		<VirtualizedList
			className={theme['tc-list-list']}
			collection={collection}
			getComponent={getComponent}
			id={id}
			height={height}
			overscanRowCount={10}
			onRowClick={onRowClick}
			onRowDoubleClick={onRowDoubleClick}
			noRowsRenderer={noRowsRenderer}
			rowCount={collection.length}
			rowHeight={rowHeight}
			rowRenderer={enhancedRowRenderer}
			rowGetter={index => collection[index]}
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
	noRowsRenderer: PropTypes.func,
	onRowClick: PropTypes.func,
	onRowDoubleClick: PropTypes.func,
	rowHeight: PropTypes.number,
	rowRenderer: PropTypes.func,
	width: PropTypes.number,
};

ListGrid.defaultProps = {
	rowHeight: 135,
};

export default ListGrid;
