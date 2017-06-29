import React from 'react';
import {
	Masonry as VirtualizedTile,
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
} from 'react-virtualized';
import { toColumns } from '../utils/tablerow';
import RowLarge from '../RowLarge';
import theme from './ListTile.scss';

let masonry;
let _cache = getCache();
const cellPositioner = (width, cache) => {
	if (masonry && masonry.recomputeCellPositions) masonry.recomputeCellPositions();
	return createMasonryCellPositioner({
		cellMeasurerCache: cache,
		columnCount: Math.floor(width / 400),
		columnWidth: 400,
	});
};

function setElement(element) {
	masonry = element;
};

function getCache() {
	return new CellMeasurerCache({
		fixedWidth: true,
		fixedHeight: true,
		defaultWidth: 400,
		defaultHeight: 200,
	});
}

/*
<RowLarge
	index={index}
	key={key}
	parent={parent}
	style={style}
/>
<div style={style}>{row}</div>
<div style={{width: '400px', height: '200px'}}>{row}</div>
*/
function getCellRenderer(id, collection, children) {
	return function cellRenderer({ index, key, parent, style }) {
		const row = `Row ${collection[index].id} ${collection[index].description}`;
		return (
			<CellMeasurer
				cache={_cache}
				index={index}
				key={key}
				parent={parent}
			>
				<RowLarge
					index={index}
					key={key}
					parent={parent}
					style={style}
				/>
			</CellMeasurer>
		);
	}
}

function ListTile(props) {
	const {
		id,
		width,
		height,
		collection,
		children,
	} = props;

	console.log('create ListTile<');
	console.log(width);
	const _cellPositioner = cellPositioner(width, _cache);

	return (
		<VirtualizedTile
			collection={collection}
			cellCount={collection.length}
			cellMeasurerCache={_cache}
			cellPositioner={_cellPositioner}
			cellRenderer={getCellRenderer(id, collection, children, _cache)}
			height={height}
			width={width}
			ref={element => setElement(element)}
		>
			{toColumns(id, theme, children)}
		</VirtualizedTile>
	);
}

ListTile.propTypes = VirtualizedTile.propTypes;
ListTile.displayName = 'VirtualizedTile(ListTile)';
export default ListTile;
