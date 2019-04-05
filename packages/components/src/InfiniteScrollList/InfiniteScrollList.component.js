import React from 'react';
import PropTypes from 'prop-types';
import {
	InfiniteLoader,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';

import Skeleton from '../Skeleton';
import List from '../List/ListComposition';

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

class InfiniteScrollList extends React.Component {
	constructor(props) {
		super(props);

		// This internal flag can be used to forcefully scroll to the top of the list
		this.scrollToTop = false;

		this.onSort = this.onSort.bind(this);
		this.isRowLoaded = this.isRowLoaded.bind(this);
		this.rowRenderer = this.rowRenderer.bind(this);
	}

	componentDidMount() {
		// Load an initial batch of data
		const startIndex = 0;
		const stopIndex = startIndex + this.props.minimumBatchSize;

		this.loadMoreRows({ startIndex, stopIndex });
	}

	onSort({ sortBy, sortDirection }) {
		this.scrollToTop = true;

		this.props.onSort({ sortBy, sortDirection });
	}

	isRowLoaded({ index }) {
		return this.props.items && this.props.items[index];
	}

	rowRenderer(rowProps) {
		const { columns, index } = rowProps;

		const rowColumns = this.isRowLoaded({ index })
			? rowProps.columns
			: <SkeletonRow columns={columns} />;

		return <DefaultTableRowRenderer {...rowProps} columns={rowColumns} />;
	}

	render() {
		const {
			items,
			rowCount,
			columns,
			threshold,
			minimumBatchSize,
			onSort,
			onLoadMoreRows,
			...restProps
		} = this.props;

		const listProps = {
			rowCount,
			rowRenderers: { table: this.rowRenderer },
			...restProps,
		};

		if (onSort) {
			listProps.sort = this.onSort;
		}

		if (this.scrollToTop) {
			// Scroll to the top of the list
			this.scrollToTop = false;
			listProps.scrollToIndex = 0;
		}

		return (
			<List.Manager collection={items}>
				<InfiniteLoader
					isRowLoaded={this.isRowLoaded}
					loadMoreRows={onLoadMoreRows}
					minimumBatchSize={minimumBatchSize}
					rowCount={rowCount}
					threshold={threshold}
				>
					{({ onRowsRendered, registerChild }) => (
						<List.VList
							{...listProps}
							onRowsRendered={onRowsRendered}
							registerChild={registerChild}
						>
							{columns.map(column => (
								<List.VList.Content label={column.label} dataKey={column.key} key={column.key} />
							))}
						</List.VList>
					)}
				</InfiniteLoader>
			</List.Manager>
		);
	}
}

InfiniteScrollList.defaultProps = {
	threshold: DEFAULT_THRESHOLD,
	minimumBatchSize: DEFAULT_MIN_BATCH_SIZE,
};

if (process.env.NODE_ENV !== 'production') {
	InfiniteScrollList.propTypes = {
		items: PropTypes.array,
		rowCount: PropTypes.number,
		columns: PropTypes.array.isRequired,
		threshold: PropTypes.number,
		minimumBatchSize: PropTypes.number,
		onLoadMoreRows: PropTypes.func,
		onSort: PropTypes.func,
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
