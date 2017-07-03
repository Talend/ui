import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
	Masonry as VirtualizedTile,
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
} from 'react-virtualized';
import { toColumns } from '../utils/tablerow';
import CellTile from '../CellTile';
import theme from './ListTile.scss';

const SIZE_TILE = 275;

class ListTile extends React.Component {
	constructor(props) {
		super(props);

		this.columnCount = 0;

		this.cache = new CellMeasurerCache({
			defaultHeight: props.tileHeight,
			defaultWidth: props.tileWidth,
			fixedWidth: true,
			fixedHeight: true,
		});

		this.state = {
			columnWidth: props.tileHeight,
			columHeight: props.tileWidth,
			gutterSize: 0,
		};

		this.cellRenderer = this.cellRenderer.bind(this);
		this.setMasonryRef = this.setMasonryRef.bind(this);
	}

	setMasonryRef(ref) {
		this.masonry = ref;
	}

	calculateColumnCount() {
		const {
			columnWidth,
			gutterSize,
		} = this.state;

		this.columnCount = Math.floor(this.width / (columnWidth + gutterSize));
	}

	updateCellPositioner(oldWidth) {
		if (typeof this.cellPositioner === 'undefined') {
			this.initCellPositioner();
		} else if (this.width !== oldWidth) {
			this.resetCellPositioner();
		}
	}

	initCellPositioner() {
		const {
			columnWidth,
			gutterSize,
		} = this.state;

		this.cellPositioner = createMasonryCellPositioner({
			cellMeasurerCache: this.cache,
			columnCount: this.columnCount,
			columnWidth,
			spacer: gutterSize,
		});
	}

	resetCellPositioner() {
		const {
			columnWidth,
			gutterSize,
		} = this.state;

		this.cellPositioner.reset({
			columnCount: this.columnCount,
			columnWidth,
			spacer: gutterSize,
		});

		if (this.masonry) {
			this.masonry.recomputeCellPositions();
		}
	}

	cellRenderer({ index, key, parent, style }) {
		return (
			<CellMeasurer
				cache={this.cache}
				index={index}
				key={key}
				parent={parent}
			>
				<CellTile
					index={index}
					key={key}
					parent={parent}
					style={style}
				/>
			</CellMeasurer>
		);
	}

	render() {
		const {
			collection,
			children,
			width,
			height,
			id,
		} = this.props;
		const oldWidth = this.width;
		this.width = width;

		this.calculateColumnCount();
		this.updateCellPositioner(oldWidth);

		return (
			<VirtualizedTile
				collection={collection}
				cellCount={collection.length}
				cellMeasurerCache={this.cache}
				cellPositioner={this.cellPositioner}
				cellRenderer={this.cellRenderer}
				className={classNames('tc-list-tile')}
				height={height}
				width={width}
				ref={this.setMasonryRef}
			>
				{toColumns(id, theme, children)}
			</VirtualizedTile>
		);
	}
}

ListTile.propTypes = {
	...VirtualizedTile.propTypes,
	tileWidth: PropTypes.number,
	tileHeight: PropTypes.number,
};

ListTile.displayName = 'VirtualizedTile(ListTile)';

ListTile.defaultProps = {
	tileWidth: SIZE_TILE,
	tileHeight: SIZE_TILE,
};
export default ListTile;
