import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TitleBar, { displayFilters } from './TitleBar/TitleBar';
import TableHeader from './Header/TableHeader';
import TableBody from './Body/TableBody';
import theme from './Table.scss';

const PART = 'table';

/**
 * This component displays a table of elements with an optional title bar.
 * Elements are provided as array.
 * An element is displayed in a row and is divided in multiple data.
 * The columns array provides the column configuration (see PropTypes below).
 * The table header is optional.
 * The title bar displays a title and an optional set of filters.
 */
export default Table extends React.Component {

	constructor(props) {
		super(props);
		this.updateTableNodeRef = this.updateTableNodeRef.bind(this);
	}

	componentDidMount() {
		if (this.props.renderingListener && this.props.renderingListener.onMounted) {
			this.props.renderingListener.onMounted(PART, this.tableNode);
		}
	}

	componentDidUpdate() {
		if (this.props.renderingListener && this.props.renderingListener.onUpdated) {
			this.props.renderingListener.onUpdated(PART, this.tableNode);
		}
	}

	updateTableNodeRef(ref) {
		this.tableNode = ref;
	}

	render() {
		const {
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
			renderingListener,
		} = this.props;
		return (
			<div className={classnames('tc-table', theme['tc-table'])}>
				{(title || displayFilters(filters)) && (
					<TitleBar title={title} filters={filters} onFilterChange={onFilterChange} />
				)}
				<table ref={this.updateTableNodeRef} >
					{withHeader && (
						<TableHeader
							columns={columns}
							sorters={sorters}
							onSortChange={onSortChange}
							renderingListener={renderingListener}
						/>
					)}
					<TableBody
						elements={elements}
						columns={columns}
						rowsClassName={rowsClassName}
						onScroll={onScroll}
						onEnterRow={onEnterRow}
						onLeaveRow={onLeaveRow}
						renderingListener={renderingListener}
					/>
				</table>
			</div>
		);
	}
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
	renderingListener: PropTypes.shape({
		onMounted: PropTypes.func,
		onUpdated: PropTypes.func,
	}),
};
