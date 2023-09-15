import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps } from 'react-virtualized';

import theme from './Records.module.scss';

type VirtualizedRecordTreeProps = {
	onVerticalScroll: (
		event: any,
		positions: { firstDisplayedRowIndex: number; lastDisplayedRowIndex: number },
	) => void;
	rowCount: number;
	disableHeight?: boolean;
	renderNode: (params: { index: number; measure: () => void }) => JSX.Element;
};

export function VirtualizedRecordTree({
	disableHeight,
	rowCount,
	onVerticalScroll,
	renderNode,
}: VirtualizedRecordTreeProps) {
	const cache = new CellMeasurerCache({
		fixedWidth: true,
		defaultHeight: 40,
	});

	const lazyLoadingCallBack = ({
		startIndex,
		stopIndex,
	}: {
		startIndex: number;
		stopIndex: number;
	}) => {
		onVerticalScroll({}, { firstDisplayedRowIndex: startIndex, lastDisplayedRowIndex: stopIndex });
	};

	const renderTreeCellMeasurer = ({ parent, index, style }: ListRowProps) => (
		<CellMeasurer cache={parent?.props.cache} columnIndex={0} parent={parent} rowIndex={index}>
			{({ measure }) => <div style={{ ...style }}>{renderNode({ index, measure })}</div>}
		</CellMeasurer>

		// <div
		// 	{...props}
		// 	// className={this.props.cellMeasurerClassName}
		// 	// cellRenderer={this.props.cellRenderer}
		// >
		// 	I render
		// </div>
	);

	return (
		<div className={theme['tc-records']}>
			<AutoSizer disableHeight={disableHeight}>
				{({ height, width }) => (
					<List
						cache={cache}
						deferredMeasurementCache={cache}
						height={height}
						onRowsRendered={lazyLoadingCallBack}
						rowCount={rowCount}
						rowHeight={cache.rowHeight}
						rowRenderer={renderTreeCellMeasurer}
						width={width}
					/>
				)}
			</AutoSizer>
		</div>
	);
}
