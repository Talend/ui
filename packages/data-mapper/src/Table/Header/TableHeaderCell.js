import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * This component displays a header cell of a table column as a simple label.
 * The label must be a string.
 * It uses a div element for layout purpose (text alignment in a header).
 */
export default function TableHeaderCell({ column, className }) {
	return <div className={classnames('tc-table-header-cell', className)}>{column.label}</div>;
}

TableHeaderCell.propTypes = {
	column: PropTypes.object,
	className: PropTypes.string,
};
