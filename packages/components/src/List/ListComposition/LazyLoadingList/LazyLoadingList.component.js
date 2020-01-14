import React from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader } from 'react-virtualized';
import debounce from 'lodash/debounce';

import VList from '../VList';
import { useListContext } from '../context';

const DEFAULT_THRESHOLD = 5;
const DEFAULT_MIN_BATCH_SIZE = 20;
const DEFAULT_DEBOUNCE_DELAY = 0;

function LazyLoadingList(props) {
	const {
		rowCount,
		threshold,
		minimumBatchSize,
		loadMoreRows,
		debounceDelay,
		onRowsRendered: parentOnRowsRendered,
		...rest
	} = props;
	const { collection } = useListContext();

	const isRowLoaded = ({ index }) => collection && collection[index];

	let loadMoreRowsCallback = loadMoreRows;
	if (loadMoreRowsCallback && debounceDelay) {
		loadMoreRowsCallback = debounce(loadMoreRowsCallback, debounceDelay);
	}

	return (
		<InfiniteLoader
			isRowLoaded={isRowLoaded}
			loadMoreRows={loadMoreRowsCallback}
			minimumBatchSize={minimumBatchSize}
			rowCount={rowCount}
			threshold={threshold}
		>
			{({ onRowsRendered, registerChild }) => {
				function combinedOnRowsRendered(...args) {
					if (parentOnRowsRendered) {
						parentOnRowsRendered(...args);
					}
					onRowsRendered(...args);
				}
				return (
					<VList
						registerChild={registerChild}
						onRowsRendered={combinedOnRowsRendered}
						rowCount={rowCount}
						{...rest}
					/>
				);
			}}
		</InfiniteLoader>
	);
}

LazyLoadingList.defaultProps = {
	threshold: DEFAULT_THRESHOLD,
	minimumBatchSize: DEFAULT_MIN_BATCH_SIZE,
	debounceDelay: DEFAULT_DEBOUNCE_DELAY,
};

if (process.env.NODE_ENV !== 'production') {
	LazyLoadingList.propTypes = {
		loadMoreRows: PropTypes.func.isRequired,
		onRowsRendered: PropTypes.func,
		rowCount: PropTypes.number,
		threshold: PropTypes.number,
		minimumBatchSize: PropTypes.number,
		debounceDelay: PropTypes.number,
	};
}

export default LazyLoadingList;
