import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TitleBar, { displayFilters } from './TitleBar/TitleBar';
import TableComp from './TableComp/TableComp';
import theme from './Table.scss';

/**
 * This component displays a table of elements.
 * Elements are provided as array.
 * An element is displayed in a row and is divided in multiple data.
 * The rowDataGetter object provides the data for each element.
 * The columnKeys array provides the column keys. These keys are used to get the element data.
 * The rowRenderer object provides the components used to display the element data.
 * The headerRenderer object provides the components used to display the table header.
 * If the headerRenderer is null or undefined, no header is displayed.
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
		<div className={classNames('tc-table-root', theme['tc-table-root'], classnames && classnames.root)}>
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
	elements: PropTypes.array.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired, // column key
			label: PropTypes.string.isRequired, // label to display
			headClassName: PropTypes.string, // header classname
			headRenderer: PropTypes.func, // header renderer
			headExtraProps: PropTypes.object, // header extra props
			sorter: PropTypes.object,
			cellClassName: PropTypes.string, // cell classname
			cellRenderer: PropTypes.func, // cell renderer
			cellExtraProps: PropTypes.object, // cell extra props
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
		rows: PropTypes.arrayOf(PropTypes.string),
	}),
	rowDataGetter: PropTypes.object,
	withHeader: PropTypes.bool,
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			filter: PropTypes.object.isRequired,
			renderer: PropTypes.func.isRequired,
			className: PropTypes.string,
			extra: PropTypes.object,
		}),
	),
	onFilterChange: PropTypes.func,
	onSortChange: PropTypes.func,
	onScroll: PropTypes.func,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
