import React from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader } from 'react-virtualized';

import VList from '../VList';
import { useListContext } from '../context';

const DEFAULT_THRESHOLD = 5;
const DEFAULT_MIN_BATCH_SIZE = 20;

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
};

if (process.env.NODE_ENV !== 'production') {
	InfiniteScrollList.propTypes = {
		loadMoreRows: PropTypes.func.isRequired,
		rowCount: PropTypes.number,
		threshold: PropTypes.number,
		minimumBatchSize: PropTypes.number,
	};
}

export default InfiniteScrollList;
