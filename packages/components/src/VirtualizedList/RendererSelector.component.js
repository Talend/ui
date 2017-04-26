import React, { PropTypes } from 'react';
import { listTypes } from './utils/constants';
import { rowDictionary } from './utils/dictionary';
import ListTable from './ListTable';
import ListGrid from './ListGrid';

const { TABLE, LARGE } = listTypes;

/**
 * Select the ListGrid row renderer to use
 * @param type The row renderer type
 * @returns {RowLarge}
 */
function getRowRenderer(type) {
	const rowRenderer = rowDictionary[type];
	if (!rowRenderer) {
		const rowRendererTypes = [TABLE].concat(Object.keys(rowDictionary));
		throw new Error(`Unknown row renderer in Virtualized List : ${type}. Possible values are [${rowRendererTypes}].`);
	}
	return rowRenderer;
}

/**
 * Component that maps list types to the corresponding component
 */
function RendererSelector(props) {
	const {
		children,
		collection,
		height,
		id,
		isSelected,
		rowHeight,
		selectionToggle,
		sort,
		sortBy,
		sortDirection,
		type,
		width,
	} = props;
	if (type === TABLE) {
		return (
			<ListTable
				collection={collection}
				height={height}
				id={id}
				isSelected={isSelected}
				selectionToggle={selectionToggle}
				sort={sort}
				sortBy={sortBy}
				sortDirection={sortDirection}
				width={width}
			>
				{children}
			</ListTable>
		);
	}
	return (
		<ListGrid
			collection={collection}
			height={height}
			id={id}
			isSelected={isSelected}
			rowHeight={rowHeight}
			rowRenderer={getRowRenderer(type)}
			selectionToggle={selectionToggle}
			width={width}
		>
			{children}
		</ListGrid>
	);
}
RendererSelector.displayName = 'VirtualizedList(RendererSelector)';
RendererSelector.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	collection: PropTypes.arrayOf(PropTypes.object),
	height: PropTypes.number,
	id: PropTypes.string,
	isSelected: PropTypes.func,
	rowHeight: PropTypes.number,
	selectionToggle: PropTypes.func,
	sort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	type: PropTypes.oneOf([TABLE, LARGE]),
	width: PropTypes.number,
};
RendererSelector.defaultProps = {
	type: TABLE,
};

export default RendererSelector;
