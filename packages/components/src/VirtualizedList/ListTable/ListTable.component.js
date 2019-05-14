import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {
	Table as VirtualizedTable,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import isEmpty from 'lodash/isEmpty';

import getRowSelectionRenderer from '../RowSelection';
import { DROPDOWN_CONTAINER_CN } from '../../Actions/ActionDropdown';
import { decorateRowClick, decorateRowDoubleClick } from '../event/rowclick';

import theme from './ListTable.scss';
import rowThemes from './RowThemes';

/**
 * List renderer that renders a react-virtualized Table
 */
function ListTable(props) {
	const {
		collection,
		id,
		isActive,
		isSelected,
		onRowClick,
		onRowDoubleClick,
		rowCount,
		rowRenderer,
		noDataRenderer,
		...restProps
	} = props;

	let RowTableRenderer = rowRenderer || DefaultTableRowRenderer;
	if (isActive || isSelected) {
		RowTableRenderer = getRowSelectionRenderer(RowTableRenderer, {
			isSelected,
			isActive,
			getRowData: rowProps => rowProps.rowData,
		});
	}

	if (noDataRenderer) {
		const NoDataRenderer = noDataRenderer;
		const WrappedRender = RowTableRenderer;

		RowTableRenderer = function finalRowRenderer(rowProps) {
			return isEmpty(rowProps.rowData) ? (
				<DefaultTableRowRenderer {...rowProps} columns={[<NoDataRenderer {...rowProps} />]} />
			) : (
				<WrappedRender {...rowProps} />
			);
		};
	}

	const onRowClickCallback = decorateRowClick(onRowClick);
	const onRowDoubleClickCallback = decorateRowDoubleClick(onRowDoubleClick);

	return (
		<VirtualizedTable
			className={`tc-list-table ${theme['tc-list-table']}`}
			gridClassName={`${theme.grid} ${DROPDOWN_CONTAINER_CN}`}
			headerHeight={40}
			id={id}
			onRowClick={onRowClickCallback}
			onRowDoubleClick={onRowDoubleClickCallback}
			rowClassName={({ index }) =>
				classNames(...['tc-list-item', rowThemes, collection[index] && collection[index].className])
			}
			rowCount={rowCount || collection.length}
			rowGetter={({ index }) => collection[index] || {}}
			rowRenderer={RowTableRenderer}
			{...restProps}
		/>
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
	rowCount: PropTypes.number,
	rowRenderer: PropTypes.func,
	noDataRenderer: PropTypes.node,
};

ListTable.defaultProps = {
	disableHeader: false,
	rowHeight: 50,
};

export default ListTable;
