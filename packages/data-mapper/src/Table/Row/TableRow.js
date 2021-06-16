import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableCell from '../Cell/TableCell';
import theme from './TableRow.scss';

/**
 * This function is responsible for rendering a piece of data for an element.
 */
function renderRowData(element, column) {
	const key = column.key;
	const CellComponent = column.cellRenderer || TableCell;
	const compKey = `${element.id}-${key}`;
	return (
		<td
			key={`td-${compKey}`}
			className={classnames(`td-${key}`, theme['tc-table-row-cell'])}
			headers={column.id}
		>
			<CellComponent
				key={compKey}
				element={element}
				data={element[key]}
				className={classnames(
					'tc-table-row-data',
					theme['tc-table-row-data'],
					`tc-table-row-data-${column.key}`,
				)}
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
		const { element, rowsClassName, columns } = this.props;
		const rowClassNames = classnames(
			'tc-table-row',
			theme['tc-table-row'],
			rowsClassName && rowsClassName[element.id],
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
	rowsClassName: PropTypes.objectOf(PropTypes.string),
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			cellRenderer: PropTypes.func,
			cellExtraProps: PropTypes.object,
			id: PropTypes.string.isRequired,
		}),
	).isRequired,
	onEnterRow: PropTypes.func,
	onLeaveRow: PropTypes.func,
};
