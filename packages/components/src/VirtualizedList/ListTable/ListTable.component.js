import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {
	Table as VirtualizedTable,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import getRowSelectionRenderer from '../RowSelection';
import { toColumns } from '../utils/tablerow';
import { DROPDOWN_CONTAINER_CN } from '../../Actions/ActionDropdown';

import theme from './ListTable.scss';
import rowThemes from './RowThemes';

/**
 * List renderer that renders a react-virtualized Table
 */
function ListTable(props) {
	const {
		children,
		collection,
		disableHeader,
		height,
		id,
		isActive,
		isSelected,
		noRowsRenderer,
		onRowClick,
		onRowDoubleClick,
		sort,
		sortBy,
		sortDirection,
		width,
		rowHeight,
	} = props;

	let RowTableRenderer = DefaultTableRowRenderer;
	if (isActive || isSelected) {
		RowTableRenderer = getRowSelectionRenderer(DefaultTableRowRenderer, {
			isSelected,
			isActive,
			getRowData: rowProps => rowProps.rowData,
		});
	}

	let onRowClickCallback;
	let onRowDoubleClickCallback;
	if (onRowClick) {
		onRowClickCallback = ({ event, rowData }) => onRowClick(event, rowData);
	}
	if (onRowDoubleClick) {
		onRowDoubleClickCallback = ({ event, rowData }) => onRowDoubleClick(event, rowData);
	}

	return (
		<VirtualizedTable
			className={`tc-list-table ${theme['tc-list-table']}`}
			gridClassName={`${theme.grid} ${DROPDOWN_CONTAINER_CN}`}
			headerHeight={35}
			height={height}
			id={id}
			onRowClick={onRowClickCallback}
			onRowDoubleClick={onRowDoubleClickCallback}
			noRowsRenderer={noRowsRenderer}
			rowClassName={({ index }) =>
				classNames(...['tc-list-item', rowThemes, collection[index] && collection[index].className])
			}
			rowCount={collection.length}
			rowGetter={({ index }) => collection[index]}
			rowHeight={rowHeight}
			rowRenderer={RowTableRenderer}
			sort={sort}
			sortBy={sortBy}
			sortDirection={sortDirection}
			width={width}
			disableHeader={disableHeader}
		>
			{toColumns(id, theme, children)}
		</VirtualizedTable>
	);
}
ListTable.displayName = 'VirtualizedList(ListTable)';
ListTable.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element),
	collection: PropTypes.arrayOf(PropTypes.object),
	disableHeader: PropTypes.bool,
	height: PropTypes.number,
	id: PropTypes.string,
	isActive: PropTypes.func,
	isSelected: PropTypes.func,
	noRowsRenderer: PropTypes.func,
	onRowClick: PropTypes.func,
	onRowDoubleClick: PropTypes.func,
	rowHeight: PropTypes.number,
	sort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	width: PropTypes.number,
};

ListTable.defaultProps = {
	disableHeader: false,
	rowHeight: 50,
};

export default ListTable;
