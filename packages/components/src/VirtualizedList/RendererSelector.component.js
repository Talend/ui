import React, { PropTypes } from 'react';
import ListTable from './ListTable';
import ListGrid from './ListGrid';
import RowLarge from './RowLarge';

const TABLE = 'TABLE';
const LARGE = 'LARGE';

function getRowRenderer(type) {
	switch (type) {
	case LARGE:
		return RowLarge;
	default:
		throw new Error(`Unknown row renderer in Virtualized List : ${type}`);
	}
}

function RendererSelector(props) {
	const {
		children,
		collection,
		height,
		id,
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
			id={id}
			height={height}
			width={width}
			rowRenderer={getRowRenderer(type)}
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
