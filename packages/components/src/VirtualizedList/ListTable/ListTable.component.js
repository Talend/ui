import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import {
	Table as VirtualizedTable,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import { getDefaultTranslate } from '../../translate';
import getRowSelectionRenderer from '../RowSelection';
import NoRows from '../NoRows';
import CircularProgress from '../../CircularProgress';
import { toColumns } from '../utils/tablerow';

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
		onRowClick,
		sort,
		sortBy,
		sortDirection,
		width,
		rowHeight,
		inProgress,
		t,
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
	if (onRowClick) {
		onRowClickCallback = ({ event, rowData }) => onRowClick(event, rowData);
	}

	// FIXME [NC]: waiting for Loader component to be merged
	function Loader() {
		return (
			<div aria-atomic="true" aria-busy="true" className={theme['tc-list-progress']}>
				<CircularProgress size={'default'} />
			</div>
		);
	}

	return (
		<VirtualizedTable
			className={`tc-list-table ${theme['tc-list-table']}`}
			gridClassName={theme.grid}
			headerHeight={35}
			height={height}
			id={id}
			onRowClick={onRowClickCallback}
			noRowsRenderer={() => (inProgress ? <Loader /> : <NoRows t={t} />)}
			rowClassName={({ index }) => classNames(...[
				'tc-list-item',
				rowThemes,
				collection[index] && collection[index].className,
			])}
			rowCount={inProgress ? 0 : collection.length}
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
	onRowClick: PropTypes.func,
	rowHeight: PropTypes.number,
	sort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	width: PropTypes.number,
	t: PropTypes.func,
};

ListTable.defaultProps = {
	disableHeader: false,
	rowHeight: 50,
	t: getDefaultTranslate,
};

export default ListTable;
