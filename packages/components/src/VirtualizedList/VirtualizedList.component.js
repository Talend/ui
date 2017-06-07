import React from 'react';
import { AutoSizer, Column } from 'react-virtualized';
import RendererSelector from './RendererSelector.component';
import propTypes from './PropTypes';
import { insertSelectionConfiguration } from './utils/tablerow';

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

	const contentsConfiguration = insertSelectionConfiguration({
		children,
		isSelected,
		selectionToggle,
	});

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
					{contentsConfiguration}
				</RendererSelector>
			)}
		</AutoSizer>
	);
}
VirtualizedList.displayName = 'VirtualizedList';
VirtualizedList.propTypes = propTypes;

VirtualizedList.Content = Column;

export default VirtualizedList;
