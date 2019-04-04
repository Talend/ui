import React from 'react';
import PropTypes from 'prop-types';
import {
	InfiniteLoader,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import { Skeleton } from '@talend/react-components';
import List from '@talend/react-components/lib/List/ListComposition';

const DEFAULT_THRESHOLD = 5;
const DEFAULT_MIN_BATCH_SIZE = 20;

class InfiniteScrollList extends React.Component {
	static displayName = 'Container(InfiniteScrollList)';

	constructor(props) {
		super(props);

		// This internal flag can be used to forcefully scroll to the top of the list
		this.scrollToTop = false;

		this.state = {
			// Define sorting parameters (defaults to first column, ascending order)
			sortBy: props.sortBy || props.columns[0].key,
			sortDirection: props.sortDirection || 'ASC',
		};

		this.onSort = this.onSort.bind(this);
		this.isRowLoaded = this.isRowLoaded.bind(this);
		this.loadMoreRows = this.loadMoreRows.bind(this);
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

		this.setState({ sortBy, sortDirection });
		this.props.onSort({ sortBy, sortDirection });
	}

	isRowLoaded({ index }) {
		return this.props.items && this.props.items[index];
	}

	loadMoreRows({ startIndex, stopIndex }) {
		if (!this.props.onLoadMoreRows) {
			return;
		}

		const { sortBy, sortDirection } = this.state;

		const args = { startIndex, stopIndex, sortBy, sortDirection };

		this.props.onLoadMoreRows(args);
	}

	rowRenderer(rowProps) {
		const { columns, index } = rowProps;

		const rowColumns = this.isRowLoaded({ index })
			? rowProps.columns
			: columns.map(column => <div key={column.key} {...column.props}><Skeleton type="text" size="xlarge" /></div>);

		return <DefaultTableRowRenderer {...rowProps} columns={rowColumns} />;
	}

	render() {
		const { items, totalRowCount, columns, threshold, minimumBatchSize, onSort } = this.props;

		const listProps = {
			totalRowCount,
			rowRenderers: { table: this.rowRenderer },
		};

		if (onSort) {
			// Attach sorting behavior to the list
			listProps.sort = this.onSort;
			listProps.sortBy = this.state.sortBy;
			listProps.sortDirection = this.state.sortDirection;
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
					loadMoreRows={this.loadMoreRows}
					minimumBatchSize={minimumBatchSize}
					rowCount={totalRowCount}
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

InfiniteScrollList.propTypes = {
	items: PropTypes.array,
	totalRowCount: PropTypes.number,
	columns: PropTypes.array.isRequired,
	threshold: PropTypes.number,
	minimumBatchSize: PropTypes.number,
	onLoadMoreRows: PropTypes.func,
	onSort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
};

InfiniteScrollList.defaultProps = {
	threshold: DEFAULT_THRESHOLD,
	minimumBatchSize: DEFAULT_MIN_BATCH_SIZE,
};

export default InfiniteScrollList;
