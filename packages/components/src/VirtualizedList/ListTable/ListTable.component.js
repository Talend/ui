import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Table as VirtualizedTable, Column } from 'react-virtualized';

import theme from './ListTable.scss';

/**
 * Create new Columns from children with component fixed classnames
 */
function toColumns(id, children) {
	return React.Children.toArray(children)
		.map((field, index) => {
			const colProps = {
				...field.props,
				headerClassName: classNames(
					field.props.headerClassName,
					theme.header,
				),
				className: classNames(
					field.props.className,
					theme.cell,
				),
				columnData: {
					...field.props.columnData,
					id,
				},
			};
			return <Column key={index} {...colProps} />;
		});
}

function ListTable(props) {
	const {
		children,
		collection,
		height,
		id,
		sort,
		sortBy,
		sortDirection,
		width,
	} = props;
	return (
		<VirtualizedTable
			className={theme['tc-list-table']}
			gridClassName={theme.grid}
			headerHeight={35}
			height={height}
			id={id}
			rowClassName={theme.row}
			rowCount={collection.length}
			rowGetter={({ index }) => collection[index]}
			rowHeight={50}
			sort={sort}
			sortBy={sortBy}
			sortDirection={sortDirection}
			width={width}
		>
			{toColumns(id, children)}
		</VirtualizedTable>
	);
}
ListTable.displayName = 'VirtualizedList(ListTable)';
ListTable.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	collection: PropTypes.arrayOf(PropTypes.object),
	height: PropTypes.number,
	id: PropTypes.string,
	sort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	width: PropTypes.number,
};

export default ListTable;
