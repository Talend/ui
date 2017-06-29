/** @flow */
import React, { PureComponent, PropTypes } from 'react';
import {
	Masonry,
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
	AutoSizer,
} from 'react-virtualized';
import RowLarge from '../VirtualizedList/RowLarge';
import { toColumns } from '../VirtualizedList/utils/tablerow';
import styles from './Test.scss';
import theme from '../VirtualizedList/ListTile/ListTile.scss';

export default class GridExample extends PureComponent {
	constructor (props) {
		super(props);
		this._columnCount = 0;

		this._cache = new CellMeasurerCache({
			defaultHeight: 250,
			defaultWidth: 400,
			fixedWidth: true,
			fixedHeight: true,
		})

		this._columnHeights = {}

		this.state = {
			columnWidth: 400,
			height: 250,
			gutterSize: 0,
		}

		this._cellRenderer = this._cellRenderer.bind(this)
		this._renderAutoSizer = this._renderAutoSizer.bind(this)
		this._renderMasonry = this._renderMasonry.bind(this)
		this._setMasonryRef = this._setMasonryRef.bind(this)
	}

	render () {
		const {
			columnWidth,
			height,
			gutterSize,
			windowScrollerEnabled,
		} = this.state;

		return this._renderAutoSizer({ height });
	}

	_calculateColumnCount () {
		const {
			columnWidth,
			gutterSize
		} = this.state

		this._columnCount = Math.floor(this._width / (columnWidth + gutterSize))
	}

	_cellRenderer ({ index, key, parent, style }) {
		return (
			<CellMeasurer
				cache={this._cache}
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
		)
	}

	_renderAutoSizer ({ height, scrollTop }) {
		this._height = height;
		this._scrollTop = scrollTop

		return (
			<AutoSizer
				disableHeight
				scrollTop={this._scrollTop}
			>
				{this._renderMasonry}
			</AutoSizer>
		)
	}

	_renderMasonry ({ width }) {
		const children = this.props.children;
		const oldWidth = this._width;
		this._width = width;

		this._calculateColumnCount();
		this._updateCellPositioner(oldWidth);


		const { height } = this.state

		return (
			<Masonry
				collection={this.collection}
				cellCount={this.collection.length}
				cellMeasurerCache={this._cache}
				cellPositioner={this._cellPositioner}
				cellRenderer={this._cellRenderer}
				height={height}
				ref={this._setMasonryRef}
				width={width}
			>
				{toColumns('test', theme, children)}
			</Masonry>
		)
	}

	_updateCellPositioner (oldWidth) {
		if (typeof this._cellPositioner === 'undefined') {
			this._initCellPositioner();
		} else if(this._width !== oldWidth) {
			this._resetCellPositioner();
		}
	}

	_initCellPositioner() {
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

	_resetCellPositioner() {
		const {
			columnWidth,
			gutterSize
		} = this.state

		this._cellPositioner.reset({
			columnCount: this._columnCount,
			columnWidth,
			spacer: gutterSize
		});

		this._masonry.recomputeCellPositions();
	}

	_setMasonryRef (ref) {
		this._masonry = ref
	}
}
