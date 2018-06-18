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
 * The columns array provides the column configuration (see PropTypes below).
 * The table header is optional.
 * The title bar displays a title and an optional set of filters.
 */
export default function Table({
	title,
	elements,
	columns,
	classNames,
	withHeader,
	filters,
	onFilterChange,
	sorters,
	onSortChange,
	onScroll,
	onEnterRow,
	onLeaveRow,
	renderingListener,
}) {
	return (
		<div
			className={classnames('tc-table-root', theme['tc-table-root'], classNames && classNames.root)}
		>
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
				withHeader={withHeader}
				sorters={sorters}
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
	// array of elements displayed in the table
	elements: PropTypes.arrayOf(
		PropTypes.shape({
			// each element must have at least an unique identifier
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
		rows: PropTypes.objectOf(PropTypes.string),
	}),
	withHeader: PropTypes.bool,
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			// filter unique identifier
			id: PropTypes.string.isRequired,
			// A filter can be activated or deactivated
			active: PropTypes.bool.isRequired,
			// additional parameters
			params: PropTypes.object,
			// This methods indicates if an element is visible or not (i.e. filtered)
			match: PropTypes.func.isRequired,
			// component used to display the filter
			renderer: PropTypes.func.isRequired,
			// additional props for the above renderer
			rendererProps: PropTypes.object,
			// classname used for the above renderer
			className: PropTypes.string,
		}),
	),
	onFilterChange: PropTypes.func,
	sorters: PropTypes.objectOf(
		PropTypes.shape({
			// this defines the direction of the sorting
			direction: PropTypes.string.isRequired,
			// this specifies the icons used for each direction
			icons: PropTypes.object,
		}),
	),
	onSortChange: PropTypes.func,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
	renderingListener: PropTypes.shape({
		onMounted: PropTypes.func,
		onUpdated: PropTypes.func,
	}),
};
