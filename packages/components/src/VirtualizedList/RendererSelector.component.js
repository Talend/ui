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
		rowHeight,
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
			rowHeight={rowHeight}
			rowRenderer={getRowRenderer(type)}
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
	id: PropTypes.string,
	height: PropTypes.number,
	rowHeight: PropTypes.number,
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
