import React, { PropTypes } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import getRowSelectionRenderer from '../RowSelection';
import NoRows from '../NoRows';

import theme from './ListGrid.scss';

/**
 * List renderer that accepts a custom row renderer.
 * The row renderer will create a row element for each collection item.
 */
class ListGrid extends React.Component {
	render() {
		const {
			children,
			id,
			height,
			isSelected,
			rowHeight,
			rowRenderer,
			selectionToggle,
			width,
		} = this.props;

		let enhancedRowRenderer = rowRenderer;
		if (selectionToggle) {
			enhancedRowRenderer = getRowSelectionRenderer(
				rowRenderer,
				{
					isSelected,
					getRowData: ({ index }) => this.props.collection[index],
				}
			);
		}

		return (
			<VirtualizedList
				className={theme['tc-list-list']}
				collection={this.props.collection}
				id={id}
				height={height}
				overscanRowCount={10}
				noRowsRenderer={NoRows}
				rowCount={this.props.collection.length}
				rowHeight={rowHeight}
				rowRenderer={enhancedRowRenderer}
				rowGetter={index => this.props.collection[index]}
				width={width}
			>
				{children}
			</VirtualizedList>
		);
	}
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
