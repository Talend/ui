import React, { PropTypes } from 'react';
import { AutoSizer, Column } from 'react-virtualized';
import RendererSelector from './RendererSelector.component';

/**
 * Composable List based on react-virtualized
 */
function VirtualizedList(props) {
	const {
		collection,
		children,
		id,
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
VirtualizedList.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	collection: PropTypes.arrayOf(PropTypes.object),
	id: PropTypes.string,
	sort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	type: RendererSelector.propTypes.type,
};

VirtualizedList.Content = Column;

export default VirtualizedList;
