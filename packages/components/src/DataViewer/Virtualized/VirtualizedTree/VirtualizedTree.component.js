import React from 'react';
import { AutoSizer, CellMeasurerCache, List } from 'react-virtualized';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TreeCellMeasurer from '../TreeCellMeasurer';
import theme from './VirtualizedTree.scss';

const DEFAULT_HEIGHT = 40;

/**
 * Help to use react-virtualized.
 */
export default class VirtualizedTree extends React.Component {
	static propTypes = {
		cellRenderer: PropTypes.func.isRequired,
		className: PropTypes.string,
		onVerticalScroll: PropTypes.func,
		rowCount: PropTypes.number,
		cellMeasurerClassName: PropTypes.string,
	};

	lazyLoadingCallBack = ({ startIndex, stopIndex }) => {
		if (this.props.onVerticalScroll) {
			this.props.onVerticalScroll(
				{},
				{ firstDisplayedRowIndex: startIndex, lastDisplayedRowIndex: stopIndex },
			);
		}
	};

	renderTreeCellMeasurer = args => (
		<TreeCellMeasurer
			{...args}
			className={this.props.cellMeasurerClassName}
			cellRenderer={this.props.cellRenderer}
		/>
	);

	render() {
		const cache = new CellMeasurerCache({
			fixedWidth: true,
			defaultHeight: DEFAULT_HEIGHT,
		});
		return (
			<div
				className={classNames(
					theme['tc-virtualized-tree'],
					'tc-virtualized-tree',
					this.props.className,
				)}
			>
				<AutoSizer>
					{({ height, width }) => (
						<List
							{...this.props}
							cache={cache}
							deferredMeasurementCache={cache}
							height={height}
							onRowsRendered={this.lazyLoadingCallBack}
							rowCount={this.props.rowCount}
							rowHeight={cache.rowHeight}
							rowRenderer={this.renderTreeCellMeasurer}
							width={width}
						/>
					)}
				</AutoSizer>
			</div>
		);
	}
}
