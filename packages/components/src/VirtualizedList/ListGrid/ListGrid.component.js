import React, { PropTypes } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import getRowSelectionRenderer from '../RowSelection';
import NoRows from '../NoRows';
import { getRowData } from '../utils/gridrow';

import theme from './ListGrid.scss';

function getRowDataFromParent({ parent, index }) {
	return getRowData(parent, index);
}

/**
 * List renderer that accepts a custom row renderer.
 * The row renderer will create a row element for each collection item.
 */
export default function ListGrid(props) {
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

	let enhancedRowRenderer = rowRenderer;
	if (selectionToggle) {
		enhancedRowRenderer = getRowSelectionRenderer(
			rowRenderer,
			{
				isSelected,
				getRowData: getRowDataFromParent,
			}
		);
	}

	return (
		<VirtualizedList
			className={theme['tc-list-list']}
			collection={collection}
			id={id}
			height={height}
			overscanRowCount={10}
			noRowsRenderer={NoRows}
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
