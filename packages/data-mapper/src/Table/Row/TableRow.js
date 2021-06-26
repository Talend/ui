import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './TableRow.scss';

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
