import PropTypes from 'prop-types';
import {
	Table as VirtualizedTable,
	defaultTableRowRenderer as DefaultTableRowRenderer,
} from 'react-virtualized';
import isEmpty from 'lodash/isEmpty';

import getRowSelectionRenderer from '../RowSelection';
import { DROPDOWN_CONTAINER_CN } from '../../Actions/ActionDropdown';
import Skeleton from '../../Skeleton';
import { decorateRowClick, decorateRowDoubleClick } from '../event/rowclick';

import { getTheme } from '../../theme';
import theme from './ListTable.module.scss';
import rowThemes from './RowThemes';

const css = getTheme(theme);

function SkeletonRow({ columns }) {
	return columns.map(column => (
		<div key={column.key} {...column.props}>
			<Skeleton type="text" size="xlarge" />
		</div>
	));
}

function ListTableRowRenderer(props) {
	return isEmpty(props.rowData) ? (
		<DefaultTableRowRenderer {...props} columns={[<SkeletonRow {...props} />]} />
	) : (
		<DefaultTableRowRenderer {...props} />
	);
}

ListTableRowRenderer.propTypes = {
	rowData: PropTypes.object,
};

/**
 * List renderer that renders a react-virtualized Table
 */
function ListTable(props) {
	const {
		collection,
		id,
		isActive,
		isSelected,
		getRowState,
		onRowClick,
		onRowDoubleClick,
		rowCount,
		headerAction,
		headerHeight = 40,
		...restProps
	} = props;

	let RowTableRenderer = ListTableRowRenderer;
	if (isActive || isSelected || getRowState) {
		RowTableRenderer = getRowSelectionRenderer(RowTableRenderer, {
			isSelected,
			isActive,
			getRowState,
			getRowData: rowProps => rowProps.rowData,
		});
	}

	const onRowClickCallback = decorateRowClick(onRowClick);
	const onRowDoubleClickCallback = decorateRowDoubleClick(onRowDoubleClick);
	const headerRowRenderer = ({ className, columns, style }) => (
		<div className={css('tc-list-headerRow', className)} role="row" style={style}>
			{columns}
		</div>
	);
	return (
		<>
			{headerAction && <div className={css('tc-list-table-right-action')}>{headerAction}</div>}
			<VirtualizedTable
				className={css('tc-list-table', { 'right-action': !!headerAction })}
				gridClassName={`${theme.grid} ${DROPDOWN_CONTAINER_CN}`}
				headerHeight={headerHeight}
				id={id}
				onRowClick={onRowClickCallback}
				onRowDoubleClick={onRowDoubleClickCallback}
				rowClassName={({ index }) =>
					css('tc-list-item', rowThemes, { [collection[index]?.className]: collection[index] })
				}
				rowCount={rowCount || collection.length}
				rowGetter={({ index }) => collection[index] || {}}
				rowRenderer={RowTableRenderer}
				headerRowRenderer={headerRowRenderer}
				{...restProps}
			/>
		</>
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
	getRowState: PropTypes.func,
	noRowsRenderer: PropTypes.func,
	onRowClick: PropTypes.func,
	onRowDoubleClick: PropTypes.func,
	rowHeight: PropTypes.number,
	sort: PropTypes.func,
	sortBy: PropTypes.string,
	sortDirection: PropTypes.string,
	width: PropTypes.number,
	rowCount: PropTypes.number,
	headerAction: PropTypes.element,
	headerHeight: PropTypes.number,
};

ListTable.defaultProps = {
	disableHeader: false,
	rowHeight: 50,
};

export default ListTable;
