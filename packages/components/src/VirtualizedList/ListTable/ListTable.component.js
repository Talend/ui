import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {
	Table as VirtualizedTable,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';

import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import getRowSelectionRenderer from '../RowSelection';
import { DROPDOWN_CONTAINER_CN } from '../../Actions/ActionDropdown';
import { decorateRowClick, decorateRowDoubleClick } from '../event/rowclick';

import theme from './ListTable.scss';
import rowThemes from './RowThemes';

const getMemoizedRowSelectionRenderer = memoizeOne(getRowSelectionRenderer, isEqual);
const getMemoizedDecorateRowClick = memoizeOne(decorateRowClick);
const getMemoizedDecorateRowDoubleClick = memoizeOne(decorateRowDoubleClick);
const getMemoizedRowClassnameGetter = memoizeOne(
	collection =>
		function rowClassnameGetter({ index }) {
			return classNames(
				...['tc-list-item', rowThemes, collection[index] && collection[index].className],
			);
		},
);
const getMemoizedRowGetter = memoizeOne(
	collection =>
		function rowGetter({ index }) {
			return collection[index];
		},
);

function getRowData(rowProps) {
	return rowProps.rowData;
}

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
		...restProps
	} = props;

	let RowTableRenderer = DefaultTableRowRenderer;
	if (isActive || isSelected) {
		RowTableRenderer = getMemoizedRowSelectionRenderer(RowTableRenderer, {
			isSelected,
			isActive,
			getRowData,
		});
	}

	const onRowClickCallback = getMemoizedDecorateRowClick(onRowClick);
	const onRowDoubleClickCallback = getMemoizedDecorateRowDoubleClick(onRowDoubleClick);

	return (
		<VirtualizedTable
			className={`tc-list-table ${theme['tc-list-table']}`}
			gridClassName={`${theme.grid} ${DROPDOWN_CONTAINER_CN}`}
			headerHeight={35}
			id={id}
			onRowClick={onRowClickCallback}
			onRowDoubleClick={onRowDoubleClickCallback}
			rowClassName={getMemoizedRowClassnameGetter(collection)}
			rowCount={collection.length}
			rowGetter={getMemoizedRowGetter(collection)}
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
};

ListTable.defaultProps = {
	disableHeader: false,
	rowHeight: 50,
};

export default ListTable;
