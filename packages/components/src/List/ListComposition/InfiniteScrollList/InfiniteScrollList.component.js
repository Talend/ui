import React from 'react';
import PropTypes from 'prop-types';
import {
	InfiniteLoader,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import isEmpty from 'lodash/isEmpty';

import Skeleton from '../../../Skeleton';
import VirtualizedList from '../../../VirtualizedList';
import { useListContext } from '../context';

const DEFAULT_THRESHOLD = 5;
const DEFAULT_MIN_BATCH_SIZE = 20;

function SkeletonRow({ columns }) {
	return (
		<React.Fragment>
			{columns.map(column => (
				<div key={column.key} {...column.props}>
					<Skeleton type="text" size="xlarge" />
				</div>
			))}
		</React.Fragment>
	);
}

const rowRenderers = {
	table: rowProps => {
		const { columns } = rowProps;
		return (
			<DefaultTableRowRenderer
				{...rowProps}
				columns={isEmpty(rowProps.rowData) ? [<SkeletonRow columns={columns} />] : rowProps.columns}
			/>
		);
	},
	// @todo Find a way to handle every rendering case possible
};

function InfiniteScrollList(props) {
	const { rowCount, threshold, minimumBatchSize, loadMoreRows, ...restProps } = props;
	const { displayMode = 'table', collection } = useListContext();

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
				<VirtualizedList
					type={displayMode.toUpperCase()}
					collection={collection}
					rowRenderers={rowRenderers}
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
		loadMoreRows: PropTypes.func.required,
		rowCount: PropTypes.number,
		threshold: PropTypes.number,
		minimumBatchSize: PropTypes.number,
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
