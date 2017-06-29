import React from 'react';
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

class ListTile extends React.Component {
	constructor(props) {
		super(props);
		this._columnCount = 0;

		this._cache = new CellMeasurerCache({
			defaultHeight: 300,
			defaultWidth: 300,
			fixedWidth: true,
			fixedHeight: true,
		});

		this.state = {
			columnWidth: 300,
			columHeight: 300,
			gutterSize: 25,
		};

		this.cellRenderer = this.cellRenderer.bind(this);
		this.setMasonryRef = this.setMasonryRef.bind(this);
	}

	cellRenderer ({ index, key, parent, style }) {
		return (
			<CellMeasurer
				cache={this._cache}
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
		)
	}

	calculateColumnCount() {
		const {
			columnWidth,
			gutterSize
		} = this.state

		this._columnCount = Math.floor(this._width / (columnWidth + gutterSize))
	}

	updateCellPositioner(oldWidth) {
		if (typeof this._cellPositioner === 'undefined') {
			this.initCellPositioner();
		} else if(this._width !== oldWidth) {
			this.resetCellPositioner();
		}
	}

	initCellPositioner() {
		const {
			columnWidth,
			gutterSize
		} = this.state

		this._cellPositioner = createMasonryCellPositioner({
			cellMeasurerCache: this._cache,
			columnCount: this._columnCount,
			columnWidth,
			spacer: gutterSize
		})
	}

	resetCellPositioner() {
		const {
			columnWidth,
			gutterSize
		} = this.state

		this._cellPositioner.reset({
			columnCount: this._columnCount,
			columnWidth,
			spacer: gutterSize
		});

		this._masonry && this._masonry.recomputeCellPositions();
	}

	setMasonryRef (ref) {
		this._masonry = ref
	}

	render() {
		const {
			collection,
			children,
			width,
			height,
			id,
		} = this.props;
		const oldWidth = this._width;
		this._width = width;

		this.calculateColumnCount();
		this.updateCellPositioner(oldWidth);

		return (
			<VirtualizedTile
				collection={collection}
				cellCount={collection.length}
				cellMeasurerCache={this._cache}
				cellPositioner={this._cellPositioner}
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

ListTile.propTypes = VirtualizedTile.propTypes;
ListTile.displayName = 'VirtualizedTile(ListTile)';
export default ListTile;
