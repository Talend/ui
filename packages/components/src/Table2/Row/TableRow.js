import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableCell from '../Cell/TableCell';
import theme from './TableRow.scss';

function getRowClassName(classNames, element) {
	return classnames(
		classNames && classNames.row,
		classNames && classNames.rows && classNames.rows[element.id],
	);
}

/**
 * This function is responsible for rendering a piece of data for an element.
 */
function renderRowData(element, column) {
	const key = column.key;
	const CellComponent = column.cellRenderer || TableCell;
	const compKey = `${element.id}-${key}`;
	const classNames = classnames(`td-${key}`, theme['tc-table-row-cell']);
	const dataClassNames = classnames(
		'tc-table-row-data',
		theme['tc-table-row-data'],
		column.cellClassName || `tc-table-row-data-${column.key}`,
	);
	return (
		<td key={`td-${compKey}`} className={classNames}>
			<CellComponent
				key={compKey}
				element={element}
				data={element[key]}
				className={dataClassNames}
				{...column.cellExtraProps}
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
		const { element, classNames, columns } = this.props;
		const rowClassNames = classnames(
			'tc-table-row',
			theme['tc-table-row'],
			getRowClassName(classNames, element),
		);
		return (
			<tr
				key={element.id}
				className={rowClassNames}
				data-id={element.id}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{columns.map(column => renderRowData(element, column))}
			</tr>
		);
	}
}

TableRow.propTypes = {
	element: PropTypes.object.isRequired,
	classNames: PropTypes.shape({
		row: PropTypes.string,
		rows: PropTypes.objectOf(PropTypes.string),
	}),
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			cellClassName: PropTypes.string,
			cellRenderer: PropTypes.func,
			cellExtraProps: PropTypes.object,
		}),
	).isRequired,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
