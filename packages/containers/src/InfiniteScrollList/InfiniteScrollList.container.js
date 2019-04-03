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

		this.isRowLoaded = this.isRowLoaded.bind(this);
		this.loadMoreRows = this.loadMoreRows.bind(this);
		this.rowRenderer = this.rowRenderer.bind(this);
	}

	componentDidMount() {
		const startIndex = 0;
		const stopIndex = startIndex + this.props.minimumBatchSize;

		this.loadMoreRows({ startIndex, stopIndex });
	}

	isRowLoaded({ index }) {
		return this.props.items && this.props.items[index];
	}

	loadMoreRows({ startIndex, stopIndex }) {
		if (!this.props.onLoadMoreRows) {
			return;
		}

		const args = { startIndex, stopIndex };

		this.props.onLoadMoreRows(args);
	}

	rowRenderer(rowProps) {
		const { columns, index } = rowProps;

		const rowColumns = this.isRowLoaded({ index })
			? rowProps.columns
			: columns.map(column => (
					<div key={column.key} {...column.props}>
						<Skeleton type="text" size="xlarge" />
					</div>
			  ));

		return <DefaultTableRowRenderer {...rowProps} columns={rowColumns} />;
	}

	render() {
		const { items, totalRowCount, columns, threshold, minimumBatchSize } = this.props;

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
							totalRowCount={totalRowCount}
							onRowsRendered={onRowsRendered}
							registerChild={registerChild}
							rowRenderers={{ table: this.rowRenderer }}
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
};

InfiniteScrollList.defaultProps = {
	threshold: DEFAULT_THRESHOLD,
	minimumBatchSize: DEFAULT_MIN_BATCH_SIZE,
};

export default InfiniteScrollList;
