import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TitleBar, { displayFilters } from './TitleBar/TitleBar';
import TableComp from './TableComp/TableComp';
import theme from './Table.scss';

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
	classNames,
	rowDataGetter,
	withHeader,
	filters,
	onFilterChange,
	onSortChange,
	onScroll,
	onEnterRow,
	onLeaveRow,
	renderingListener,
}) {
	return (
		<div className={classnames('tc-table-root', theme['tc-table-root'], classNames && classNames.root)}>
			{(title || displayFilters(filters)) && (
				<TitleBar
					title={title}
					classNames={classNames}
					filters={filters}
					onFilterChange={onFilterChange}
				/>
			)}
			<TableComp
				elements={elements}
				columns={columns}
				classNames={classNames}
				rowDataGetter={rowDataGetter}
				withHeader={withHeader}
				onSortChange={onSortChange}
				onScroll={onScroll}
				onEnterRow={onEnterRow}
				onLeaveRow={onLeaveRow}
				renderingListener={renderingListener}
			/>
		</div>
	);
}

Table.propTypes = {
	title: PropTypes.string,
	elements: PropTypes.array.isRequired,
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
			sorter: PropTypes.object,
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
	classNames: PropTypes.shape({
		root: PropTypes.string,
		titleBar: PropTypes.string,
		title: PropTypes.string,
		filtersBar: PropTypes.string,
		table: PropTypes.string,
		header: PropTypes.string,
		body: PropTypes.string,
		row: PropTypes.string,
		rows: PropTypes.arrayOf(PropTypes.string),
	}),
	rowDataGetter: PropTypes.object,
	withHeader: PropTypes.bool,
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			filter: PropTypes.object.isRequired,
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
	renderingListener: PropTypes.shape({
		onMounted: PropTypes.func,
		onUpdated: PropTypes.func,
	}),
};
