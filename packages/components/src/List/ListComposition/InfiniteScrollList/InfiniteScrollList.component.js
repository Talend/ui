import React from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader } from 'react-virtualized';

import { listTypes } from '../../../VirtualizedList/utils/constants';
import RowLarge from '../../../VirtualizedList/RowLarge/RowLarge.component';

import Skeleton from '../../../Skeleton';
import VList from '../VList';
import { useListContext } from '../context';

function SkeletonRow({ columns }) {
	return columns.map(column => (
		<div key={column.key} {...column.props}>
			<Skeleton type="text" size="xlarge" />
		</div>
	));
}

const DEFAULT_THRESHOLD = 5;
const DEFAULT_MIN_BATCH_SIZE = 20;
const DEFAULT_NO_DATA_RENDERERS = {
	[listTypes.TABLE]: rowProps => <SkeletonRow columns={rowProps.columns} />,
	[listTypes.LARGE]: data => <RowLarge {...data.data} />,
	[listTypes.COLLAPSIBLE_PANEL]: () => '',
};

function InfiniteScrollList(props) {
	const { rowCount, threshold, minimumBatchSize, loadMoreRows, ...restProps } = props;
	const { collection } = useListContext();

	const isRowLoaded = ({ index }) => collection && collection[index];

	return (
		<InfiniteLoader
			isRowLoaded={isRowLoaded}
			loadMoreRows={loadMoreRows}
			minimumBatchSize={minimumBatchSize}
			rowCount={rowCount}
			threshold={threshold}
		>
			{({ onRowsRendered, registerChild }) => (
				<VList
					registerChild={registerChild}
					onRowsRendered={onRowsRendered}
					rowCount={rowCount}
					{...restProps}
				/>
			)}
		</InfiniteLoader>
	);
}

InfiniteScrollList.defaultProps = {
	threshold: DEFAULT_THRESHOLD,
	minimumBatchSize: DEFAULT_MIN_BATCH_SIZE,
	noDataRenderers: DEFAULT_NO_DATA_RENDERERS,
};

if (process.env.NODE_ENV !== 'production') {
	InfiniteScrollList.propTypes = {
		loadMoreRows: PropTypes.func.isRequired,
		rowCount: PropTypes.number,
		threshold: PropTypes.number,
		minimumBatchSize: PropTypes.number,
		noDataRenderers: PropTypes.objectOf(PropTypes.func),
	};

	SkeletonRow.propTypes = {
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				key: PropTypes.string,
				props: PropTypes.object,
			}),
		),
	};
}

export default InfiniteScrollList;
