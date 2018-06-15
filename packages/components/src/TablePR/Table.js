import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TitleBar, { displayFilters } from './TitleBar/TitleBar';
import TableComp from './TableComp/TableComp';
import theme from './Table.scss';

export const Order = {
	NONE: 'none',
	ASCENDING: 'ascending',
	DESCENDING: 'descending',
};

/**
 * This component displays a table of elements with an optional title bar.
 * Elements are provided as array.
 * An element is displayed in a row and is divided in multiple data.
 * The rowDataGetter object provides the data for each element.
 * The columns array provides the column configuration (see PropTypes below).
 * The table header is optional.
 * The title bar displays a title and an optional set of filters.
 */
export default function Table({
	title,
	elements,
	columns,
	classnames,
	rowDataGetter,
	withHeader,
	filters,
	onFilterChange,
	onSortChange,
	onScroll,
	onEnterRow,
	onLeaveRow,
}) {
	return (
		<div
			className={classNames('tc-table-root', theme['tc-table-root'], classnames && classnames.root)}
		>
			{(title || displayFilters(filters)) && (
				<TitleBar
					title={title}
					classnames={classnames}
					filters={filters}
					onFilterChange={onFilterChange}
				/>
			)}
			<TableComp
				elements={elements}
				columns={columns}
				classnames={classnames}
				rowDataGetter={rowDataGetter}
				withHeader={withHeader}
				onSortChange={onSortChange}
				onScroll={onScroll}
				onEnterRow={onEnterRow}
				onLeaveRow={onLeaveRow}
			/>
		</div>
	);
}

Table.propTypes = {
	title: PropTypes.string,
	elements: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
		}),
	).isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			// used to identify a column
			key: PropTypes.string.isRequired,
			// label displayed in the column header
			label: PropTypes.string,
			// classname of the column header
			headClassName: PropTypes.string,
			/**
			 * Renderer used for the column header.
			 * If not specify, a default renderer is used.
			 */
			headRenderer: PropTypes.func,
			// optional extra props for the column header renderer above
			headExtraProps: PropTypes.object,
			// Column sorter
			sorter: PropTypes.shape({
				order: PropTypes.oneOf([Order.NONE, Order.ASCENDING, Order.DESCENDING]).isRequired,
				icons: PropTypes.shape({
					none: PropTypes.string,
					ascending: PropTypes.string,
					descending: PropTypes.string,
				}),
			}),
			// classname used for all the cell of the column
			cellClassName: PropTypes.string,
			/**
			 * Renderer used for the all the cells of the column.
			 * If not specify, a default renderer is used.
			 */
			cellRenderer: PropTypes.func,
			// optional extra props for the cell renderer above
			cellExtraProps: PropTypes.object,
		}),
	).isRequired,
	classnames: PropTypes.shape({
		root: PropTypes.string,
		titleBar: PropTypes.string,
		title: PropTypes.string,
		filtersBar: PropTypes.string,
		table: PropTypes.string,
		header: PropTypes.string,
		body: PropTypes.string,
		row: PropTypes.string,
		rows: PropTypes.objectOf(PropTypes.string),
	}),
	withHeader: PropTypes.bool,
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			key: PropTypes.string.isRequired,
			active: PropTypes.bool.isRequired,
			match: PropTypes.func.isRequired,
			renderer: PropTypes.func.isRequired,
			rendererProps: PropTypes.object,
			className: PropTypes.string,
		}),
	),
	onFilterChange: PropTypes.func,
	onSortChange: PropTypes.func,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
