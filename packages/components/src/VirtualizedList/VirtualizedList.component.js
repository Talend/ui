import React from 'react';
import { AutoSizer, Column } from 'react-virtualized';
import RendererSelector from './RendererSelector.component';
import propTypes from './PropTypes';

/**
 * Composable List based on react-virtualized
 */
function VirtualizedList(props) {
	const {
		collection,
		children,
		id,
		isSelected,
		rowHeight,
		selectionToggle,
		sort,
		sortBy,
		sortDirection,
		type,
	} = props;
	return (
		<AutoSizer>
			{({ height, width }) => (
				<RendererSelector
					collection={collection}
					height={height}
					id={id}
					isSelected={isSelected}
					rowHeight={rowHeight}
					selectionToggle={selectionToggle}
					sort={sort}
					sortBy={sortBy}
					sortDirection={sortDirection}
					type={type}
					width={width}
				>
					{children}
				</RendererSelector>
			)}
		</AutoSizer>
	);
}
VirtualizedList.displayName = 'VirtualizedList';
VirtualizedList.propTypes = propTypes;

VirtualizedList.Content = Column;

export default VirtualizedList;
