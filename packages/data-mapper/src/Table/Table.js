import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TitleBar, { displayFilters } from './TitleBar/TitleBar';
import TableHeader from './Header/TableHeader';
import TableBody from './Body/TableBody';
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
	rowsClassName,
	withHeader,
	filters,
	onFilterChange,
	sorters,
	onSortChange,
	onScroll,
	onEnterRow,
	onLeaveRow,
}) {
	return (
		<div className={classnames('tc-table', theme['tc-table'])}>
			{(title || displayFilters(filters)) && (
				<TitleBar key="title-bar" title={title} filters={filters} onFilterChange={onFilterChange} />
			)}
			<table>
				{title && <caption key="caption">{title}</caption>}
				<TableHeader
					key="headers"
					columns={columns}
					sorters={sorters}
					onSortChange={onSortChange}
					withHeader={withHeader}
				/>
				<TableBody
					key="body"
					elements={elements}
					columns={columns}
					rowsClassName={rowsClassName}
					onScroll={onScroll}
					onEnterRow={onEnterRow}
					onLeaveRow={onLeaveRow}
				/>
			</table>
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
			// property key
			key: PropTypes.string.isRequired,
			// column id to link cells to headers
			id: PropTypes.string.isRequired,
			// label displayed in the column header
			label: PropTypes.string,
			/**
			 * Renderer used for the column header.
			 * If not specify, a default renderer is used.
			 */
			headRenderer: PropTypes.func,
			// optional extra props for the column header renderer above
			headExtraProps: PropTypes.object,
			/**
			 * Renderer used for the all the cells of the column.
			 * If not specify, a default renderer is used.
			 */
			cellRenderer: PropTypes.func,
			// optional extra props for the cell renderer above
			cellExtraProps: PropTypes.object,
		}),
	).isRequired,
	rowsClassName: PropTypes.objectOf(PropTypes.string),
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
};
