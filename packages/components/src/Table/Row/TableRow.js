import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import TableCell from '../Cell/TableCell';
import theme from './TableRow.scss';

export function getRowId(rowDataGetter, element, index) {
	if (rowDataGetter && rowDataGetter.getElementId) {
		return rowDataGetter.getElementId(element);
	} else if (element.id && typeof element.id === 'string') {
		return element.id;
	}
	return index;
}

function getRowClassName(classnames, index) {
	return get(classnames, `rows[${index}]`);
}

function getRowData(rowDataGetter, element, columnKey) {
	if (rowDataGetter && rowDataGetter.getRowData) {
		return rowDataGetter.getRowData(element, columnKey);
	}
	return element[columnKey];
}

/**
 * This function is responsible for rendering a piece of data for an element.
 */
function renderRowData(element, index, column, rowDataGetter) {
	const key = column.key;
	const CellComponent = column.cellRenderer || TableCell;
	const compKey = `${getRowId(rowDataGetter, element, index)}-${key}`;
	const classnames = classNames(`td-${key}`, theme['tc-table-row-cell']);
	const dataClassnames = classNames(
		'tc-table-row-data',
		theme['tc-table-row-data'],
		column.cellClassName || `tc-table-row-data-${column.key}`,
	);
	return (
		<td key={`td-${compKey}`} className={classnames}>
			<CellComponent
				key={compKey}
				element={element}
				data={getRowData(rowDataGetter, element, key)}
				className={dataClassnames}
				extra={column.cellExtraProps}
			/>
		</td>
	);
}

/**
 * This component displays the data of an element in a table.
 * A row is divided in columns, each column displaying an element data.
 */
export default class TableRow extends Component {
	constructor(props) {
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}

	handleMouseEnter() {
		if (this.props.onEnterRow) {
			this.props.onEnterRow(this.props.element);
		}
	}

	handleMouseLeave() {
		if (this.props.onLeaveRow) {
			this.props.onLeaveRow(this.props.element);
		}
	}

	render() {
		const { element, index, classnames, columns, rowDataGetter } = this.props;
		const rowKey = getRowId(rowDataGetter, element, index);
		const rowClassnames = classNames(
			'tc-table-row',
			theme['tc-table-row'],
			getRowClassName(classnames, index),
		);
		return (
			<tr
				key={rowKey}
				className={rowClassnames}
				data-id={rowKey}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{columns.map(column => renderRowData(element, index, column, rowDataGetter))}
			</tr>
		);
	}
}

TableRow.propTypes = {
	element: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	classnames: PropTypes.shape({
		rows: PropTypes.arrayOf(PropTypes.string),
	}),
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired, // column key
			cellClassName: PropTypes.string, // cell classname
			cellRenderer: PropTypes.func, // cell renderer
			cellExtraProps: PropTypes.object, // cell extra props
		}),
	).isRequired,
	rowDataGetter: PropTypes.shape({
		/**
		 * Return an unique identifier for the given element.
		 * Each element is displayed in a row.
		 * @param {object} element - An element of the table.
		 */
		getElementId: PropTypes.func,
		/**
		 * Return the data corresponding to the given row and column.
		 * @param {object} row - A row of the table.
		 * @param {string} columnKey - The key identifying a column.
		 */
		getRowData: PropTypes.func,
	}),
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
